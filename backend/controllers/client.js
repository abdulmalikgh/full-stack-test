const Clients = require('../models/clients')

let { success, error } = require('../response/serverResponse')

const { validationResult } = require('express-validator')

const { resultsValidator } = require('../validators/client')

class ClientController {

    async createClient(req, res) {
    
        try {
            
            const errors = resultsValidator(req)
                if (errors.length > 0) {
                    return res.status(400).json({
                    method: req.method,
                    status: res.statusCode,
                    error: errors
                    })
                }

            const checkClient = await Clients.findOne({email: req.body.email})
    
            if(checkClient) {
                return error(req, res, {

                    success: false,
    
                    message: "User already exist"
    
                }, 409)
            }
           
            const client = await Clients.create(req.body)

            if(client) {

                const clientData = await Clients.findOne({_id: client._id}).select("name email phone providers").populate('providers')
                
                const successData = {

                    success: true,

                    message: 'client created',

                    client: clientData

                }

                success(req, res, successData, 201)

            }

        } catch (err) {
            error(req, res, error = {

                success: false,

                message: err

            })

        }
    }

    async getClient(req, res) {

        try {

            const clients = await Clients.find().select("name email phone providers").populate('providers')

            if( clients ) {

                const successData = {

                    success: true,

                    message: 'Retrieved clients',

                    clients: clients

                }

                success(req, res, successData)

            }
            
        } catch (err) {
            error(req, res, error = {

                success: false,

                message: err

            })

        }
    }

    async deleteClient(req, res) {

        try {

          let client = await Clients.findOneAndDelete({_id: req.params.id})
         

          if(client) {

            success(req, res, {success:true, message: "Client deleted successfully"})

          } 

          if(client === null) {
            error(req, res, error = {

                success: false,

                message: "Invalid ID"

            }, 400)
          }
            
        } catch (err) {

            if(err.path == "_id") {
                return error(req, res, error = {

                    success: false,
    
                    message: "id not found"
    
                }, 404)
            }

            error(req, res, error = {

                success: false,

                message: err

            })
            
        }
    }

    async updateClient(req, res) {

        try {
            
            const errors = resultsValidator(req)
                if (errors.length > 0) {
                    return res.status(400).json({
                    method: req.method,
                    status: res.statusCode,
                    error: errors
                    })
            }

            const updateClient = await Clients.findOneAndUpdate({_id: req.params.id},{
                email:req.body.email,
                name:req.body.name,
                phone:req.body.phone,
                providers:req.body.providers
            })

            if(updateClient) {
                const updatedClient = await Clients.findOne({_id: req.params.id}).select("name email phone providers").populate('providers')
                const successData = {

                    success: true,

                    message: 'Client Updated',

                    client: updatedClient

                }
                success(req, res, successData)
            }
            

        } catch (err) {
            if(err.path === "_id") {
                return error(req, res, error = {

                    success: false,
    
                    message: "id not found"
    
                }, 404)
            }

            error(req, res, error = {

                success: false,

                message: err

            })

        }
    }
}


const Client_Controller = new ClientController()

module.exports = Client_Controller

