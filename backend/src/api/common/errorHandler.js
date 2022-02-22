const _ = require('lodash')

const parseErrors = (nodeRestfulErrors) => {
    const errors = []
    _.forIn(nodeRestfulErrors, err => errors.push(err.message))

    return errors
}

module.exports = (req, res, next) => {
    const bundle = res.locals.bundle

    if (bundle.errors) {
        const errors = parseErrors(bundle.errors)
        res.status(500).json({ errors })
    }
    else {
        next()
    }
}
