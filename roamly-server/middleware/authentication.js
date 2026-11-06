const { verifyToken } = require("../helpers/jwt")
const { User } = require('../models')

const authentication =  async (req, res, next) => {
    try {
        const { authorization } = req.headers

        if (!authorization) {
            throw ({ name: 'unauthorized' })
        }

        const access_token = authorization.split(' ')[1]

        const verify = verifyToken(access_token)
        
        const user = await User.findOne({
            where: {
                email: verify.email
            }
        })

        if(!user) {
            throw({ name: 'unauthorized' })
        }

        req.loginInfo = {
            userId: user.id,
            email: user.email
        }

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authentication