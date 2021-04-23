const providerValidation = (err)=> {

    const errors = { name: '', id: ''}
        
    if(err.message.includes("Providers validation failed")) {
        Object.values(err.errors).forEach( ({ properties }) => {
            errors[properties.path] = properties.message
        })
    }

    return errors

}

module.exports = providerValidation