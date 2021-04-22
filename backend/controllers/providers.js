const Providers = require('../models/providers')

const { success, error } = require('../response/serverResponse')

class ProviderController {

    async getProvider(req, res){

        try {
            
            const providers = await Providers.find().select('name')
          
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

            const newProvider = await Providers.create({
                id: id,
                name: name
            })
            
            console.log('providers', newProvider)
            if(newProvider) {

                const successData = {

                    success: true,

                    provider: newProvider

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