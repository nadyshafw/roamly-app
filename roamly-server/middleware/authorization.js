const { Trip } = require('../models')

const authorization = async (req, res, next) => {
    try {
        const { userId } = req.loginInfo
        const { id, tripId } = req.params
        const trips = await Trip.findByPk(id || tripId)

        if (!trips) {
            throw ({ name: 'Not Found' })
        }

        if (trips.userId !== userId) {
            throw ({ name: 'Forbidden' })
        }

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authorization