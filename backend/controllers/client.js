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

    async getClient() {

    }

    async deleteClient() {

    }

    async updateClient() {

    }
}


const Client_Controller = new ClientController()

module.exports = Client_Controller

