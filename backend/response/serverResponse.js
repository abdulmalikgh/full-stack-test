module.exports.success = (req, res, data, code=200) => {
    return res.status(code).json(data)
}

module.exports.error = (req, res, error, code=500) => {
    return res.status(code).json({
        error: error
    })
}
