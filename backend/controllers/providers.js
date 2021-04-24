const Providers = require('../models/providers')

const providerValidation = require('../validators/provider')

let { success, error } = require('../response/serverResponse')

class ProviderController {

    async getProviders(req, res){

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

    async getProvider(req, res) {

        try {

          let provider = await Providers.findOne({_id: req.params.id})
         

          if(provider) {

            const successData = {

                success: true,

                message: 'Retrieved provider',

                provider: provider

            }

            success(req, res, successData)

          } 

          if(provider === null) {
            error(req, res, error = {

                success: false,

                message: "id not found"

            }, 404)
          }
            
        } catch (err) {
            if(err.path == "_id") {
                return error(req, res, error = {

                    success: false,
    
                    message: "Invalid ID"
    
                }, 400)
            }

            error(req, res, error = {

                success: false,

                message: err

            })
            
        }
    }

    async deleteProvider(req, res) {

        try {

          let provider = await Providers.findOneAndDelete({_id: req.params.id})
         

          if(provider) {

            success(req, res, {success:true, message: "Provider deleted successfully"})

          } 

          if(provider === null) {
            error(req, res, error = {

                success: false,

                message: "id not found"

            }, 404)
          }
            
        } catch (err) {

            if(err.path == "_id") {
                return error(req, res, error = {

                    success: false,
    
                    message: "Invalid ID"
    
                }, 400)
            }

            error(req, res, error = {

                success: false,

                message: err

            })
            
        }
    }

    async updateProvider(req, res) {
        console.log(req.body)
        try {
            const updateProvider = await Providers.findOneAndUpdate({_id: req.params.id},req.body)

            if(updateProvider) {
                const updatedProvider = await Providers.findOne({_id: req.params.id})
                const successData = {

                    success: true,

                    message: 'Provider Updated',

                    provider: updatedProvider

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


const Provider_Controller = new ProviderController()

module.exports = Provider_Controller