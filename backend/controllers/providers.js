const Providers = require('../models/providers')

const {success, error } = require('../response/serverResponse')

class ProviderController {

    async getProvider(){

        try {
            
            const providers = Providers.find({})

            if( providers ) {

                const successData = {

                    success: true,

                    providers: providers
                    
                }

                success(req, res, successData)
            }

        } catch (error) {
           
            error(req, res, error = {

                success: false,

                message: error

            })

        }

    }

    async postProvider(req, res) {
        
        try {

            const {id, name } = req.body

            const provider = await Providers.findOne({id:id})

            if(provider) {

                error(req, res, error = {

                    success: false,

                    message: "Provider already exist"

                })

                return 
            }

            const provider = Providers.create({
                id: id,
                name:name
            })
            if(provider) {

                const successData = {

                    success: true,

                    providers: providers

                }

                success(req, res, successData)

            }

            
        } catch (error) {
            
            error(req, res, error = {

                success: false,

                message: error

            })

        }
        
    }

}

const Provider_Controller = new ProviderController()

module.exports = Provider_Controller