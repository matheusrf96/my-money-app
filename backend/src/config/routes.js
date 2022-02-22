const express = require('express')

module.exports = (server) => {
    const router = express.Router()
    router.use('/api', router)

    const BillingCycle = require('../api/billingCycle/billingCycleService')
    BillingCycle.register(router, '/billingCycles')
}
