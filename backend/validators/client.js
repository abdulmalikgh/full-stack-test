const { check, validationResult } = require('express-validator')

module.exports.clientValidation = (err) => {
    return [
        check('name').notEmpty().withMessage("Client name is required"),
        check('email').notEmpty().withMessage("Client email is required").isEmail().withMessage("Enter a valid email"),
        check('phone').notEmpty().withMessage("Client phone is required"),
        check('providers').notEmpty().withMessage("Providers are required")
    ]
}

module.exports.resultsValidator = (req) => {
    const messages = []
    if (!validationResult(req).isEmpty()) {
      const errors = validationResult(req).array()
      for (const i of errors) {
        messages.push(i)
      }
    }
    return messages
  }
