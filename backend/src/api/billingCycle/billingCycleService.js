const BillingCycle = require('./billingCycle')

BillingCycle.methods(['get', 'post', 'put', 'delete'])
BillingCycle.updateOptions({ new: true, runValidators: true })

BillingCycle.route('get', (req, res, next) => {
    BillingCycle.find({}, (err, docs) => {
        if (err) {
            res.status(500).json({ errors: [err] })
        } else {
            res.json(docs)
        }
    })
})

BillingCycle.route('count', (req, res, next) => {
    BillingCycle.count((err, val) => {
        if (err) {
            res.status(500).json({ errors: [err] })
        }
        else {
            res.json({ value: val })
        }
    })
})

BillingCycle.route('summary', (req, res, next) => {
    BillingCycle.aggregate([{
        $project: { credit: { $sum: "$credits.value" }, debt: { $sum: "$debts.value" }},
    }, {
        $group: { _id: null, credit: { $sum: "$credit" }, debt: { $sum: "$debt" }},
    }, {
        $project: { _id: 0, credit: 1, debt: 1 },
    }], (err, result) => {
        if (err) {
            res.status(500).json({ errors: [err] })
        }
        else {
            res.json(result[0] || { credit: 0, debt: 0 })
        }
    })
})

module.exports = BillingCycle
