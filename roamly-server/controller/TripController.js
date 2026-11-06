const getPhoto = require('../helpers/unsplash')
const generateWeather = require('../helpers/weather')
const { Trip, Activity } = require('../models')

class TripController {
    static async read(req, res, next) {
        try {
            const { userId } = req.loginInfo
            const trips = await Trip.findAll({
                where: {
                    userId
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            })

            res.status(200).json(trips)
        } catch (error) {
            next(error)
        }
    }

    static async detail(req, res, next) {
        try {
            const { id } = req.params
            const trip = await Trip.findByPk(id, {
                include: {
                    model: Activity,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            })

            if (!trip) {
                throw ({ name: 'Not Found' })
            }

            res.status(200).json(trip)
        } catch (error) {
            next(error)
        }
    }

    static async update(req, res, next) {
        try {
            const { id } = req.params
            const trip = await Trip.findByPk(id)

            if (!trip) {
                throw ({ name: 'Not Found' })
            }

            const { destination, title, days, startDate, budget } = req.body

            const trips = { destination, title, days, startDate, budget }

            Object.keys(trips).forEach((t) => {
                if (trips[t] === undefined) {
                    delete trips[t]
                }
            })

            if (Object.keys(trips).length === 0) {
                throw ({ name: 'BadRequest' })
            }

            await trip.update(trips)

            res.status(200).json({
                message: `Success Update Trip ${trip.destination}`,
                data: trip
            })
        } catch (error) {
            next(error)
        }
    }

    static async create(req, res, next) {
        try {
            const { userId } = req.loginInfo
            const { destination, title, days, startDate, budget } = req.body
            const trip = await Trip.create({ userId, destination, title, days, startDate, budget })

            res.status(201).json({
                message: `Success Create Trip ${trip.destination}`,
                data: trip
            })
        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next) {
        try {
            const { id } = req.params
            const trip = await Trip.findByPk(id)

            if (!trip) {
                throw ({ name: 'Not Found' })
            }

            await trip.destroy()

            res.status(200).json({
                message: `Success Delete Trip ${trip.destination}`
            })
        } catch (error) {
            next(error)
        }
    }

    static async weather(req, res, next) {
        try {
            const { id } = req.params
            const trip = await Trip.findByPk(id)

            if (!trip) {
                throw ({ name: 'Not Found' })
            }

            const weatherTrip = await generateWeather(trip.destination)

            const start = trip.startDate
            const endDate = new Date(start)
            endDate.setDate(endDate.getDate() + trip.days - 1)
            const end = endDate.toISOString().slice(0, 10)

            const objDay = {}

            weatherTrip.forEach((item) => {
                const date = item.dt_txt.slice(0, 10)

                if (date < start || date > end) {
                    return
                }

                if (!objDay[date]) {
                    objDay[date] = {
                        date,
                        description: item.weather[0].description,
                        temps: []
                    }
                }
                objDay[date].temps.push(item.main.temp)
            })

            const result = Object.values(objDay).map((d) => {
                return {
                    date: d.date,
                    description: d.description,
                    minTemp: Math.round(Math.min(...d.temps)),
                    maxTemp: Math.round(Math.max(...d.temps))
                }
            })

            res.status(200).json({
                destination: trip.destination,
                result
            })
        } catch (error) {
            next(error)
        }
    }

    static async photo(req, res, next) {
        try {
            const { id } = req.params
            const trip = await Trip.findByPk(id)

            if (!trip) {
                throw ({ name: 'Not Found' })
            }

            const photoTrip = await getPhoto(trip.destination)

            if (!photoTrip) {
                throw ({ name: 'Photo Error' })
            }

            res.status(200).json({
                trip,
                photoTrip
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = TripController