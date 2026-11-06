const generateActivity = require('../helpers/gemini')
const { Activity, Trip } = require('../models')

class ActivityController {
    static async update(req, res, next) {
        try {
            const { tripId, activityId } = req.params
            const activity = await Activity.findOne({
                where: {
                    id: activityId,
                    tripId:tripId
                }
            })

            if (!activity) {
                throw ({ name: 'Not Found' })
            }

            const { title, day, note } = req.body

            const activities = { title, day, note }

            Object.keys(activities).forEach((a) => {
                if (activities[a] === undefined) {
                    delete activities[a]
                }
            })

            if (Object.keys(activities).length === 0) {
                throw ({ name: 'BadRequest' })
            }

            await activity.update(activities)

            res.status(200).json({
                message: `Success Update Activity ${activity.title}`,
                data: activity
            })
        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next) {
        try {
            const { tripId, activityId } = req.params
            const activity = await Activity.findOne({
                where: {
                    id: activityId,
                    tripId: tripId
                }
            })

            if (!activity) {
                throw ({ name: 'Not Found' })
            }

            await activity.destroy()

            res.status(200).json({
                message: `Success Delete Activity (${activity.title})`
            })
        } catch (error) {
            next(error)
        }
    }

    static async generate(req, res, next) {
        try {
            const { tripId } = req.params
            const trip = await Trip.findByPk(tripId)

            if (!trip) {
                throw ({ name: 'Not Found' })
            }

            const data = await generateActivity ({
                destination: trip.destination,
                days: trip.days,
                budget: trip.budget,
                style: req.body?.style
            }) 

            const filter = data.filter((item) => {
                return item.title && item.day >= 1 && item.day <= trip.days
            })

            const resData = filter.map((el) => {
                return {
                    tripId: trip.id,
                    title: el.title,
                    day: el.day,
                    note: el.note
                }
            })

            if (resData.length === 0) {
                throw ({ name: 'Generate Error' })
            }

            await Activity.destroy({
                where: {
                    tripId: trip.id
                }
            })

            const activities = await Activity.bulkCreate(resData)

            res.status(201).json({
                message: 'Success Generate Activity',
                activities
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ActivityController