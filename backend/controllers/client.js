const Clients = require('../models/clients')

let { success, error } = require('../response/serverResponse')

class ClientController {

    async createClient(req, res) {
    
        try {
            

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
            console.log(err)
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

                message: "Invalid client ID"

            }, 400)
          }
            
        } catch (err) {
          
            error(req, res, error = {

                success: false,

                message: err

            })
            
        }
    }

    async updateClient(req, res) {

        try {

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

            error(req, res, error = {

                success: false,

                message: err

            })

        }
    }
}


const Client_Controller = new ClientController()

module.exports = Client_Controller

