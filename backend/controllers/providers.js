const Providers = require('../models/providers')

const providerValidation = require('../validators/provider')

let { success, error } = require('../response/serverResponse')

class ProviderController {

    async getProvider(req, res){

        try {
            
            const providers = await Providers.find().select('name id')
          
            if( providers ) {

                const successData = {

                    success: true,

                    providers: providers

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

    async postProvider(req, res) {
        
        try {

            let { id, name } = req.body
           
            let provider = await Providers.findOne({id:id})
            console.log('provider', provider)
            if(provider) {

                error(req, res, {

                    success: false,

                    message: "Provider already exist"

                }, 400)

                return 
            }

            let newProvider = await Providers.create({
                id: id,
                name: name
            })
            
            if(newProvider) {

                const successData = {

                    success: true,

                    provider: newProvider

                }

                success(req, res, successData)

            }

            
        } catch (err) {
            console.log('erro', err)

            let errors = providerValidation(err)
            error(req, res,  {

                success: false,

                errors: errors

            })

        }
        
    }

}

const Provider_Controller = new ProviderController()

module.exports = Provider_Controller