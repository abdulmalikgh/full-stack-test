const Clients = require('../models/clients')

const { success, error } = require('../response/serverResponse')

class ClientController {

    async createClient(req, res) {
    
        try {
            

            const client = await Clients.create(req.body)

            if(client) {

                const successData = {

                    success: true,

                    client: client

                }

                success(req, res, successData)

            }

        } catch (err) {
            
            error(req, res, error = {

                success: false,

                message: error

            })

        }
    }

    async getClient(req, res) {

        try {

            const clients = await Clients.find()

            if( clients ) {

                const successData = {

                    success: true,

                    clients: clients

                }

                success(req, res, successData)

            }
            
        } catch (err) {

            error(req, res, error = {

                success: false,

                message: error

            })

        }
    }

    async deleteClient() {

    }

    async updateClient() {

    }
}


const Client_Controller = new ClientController()

module.exports = Client_Controller

