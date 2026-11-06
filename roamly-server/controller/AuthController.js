const { comparePass } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const { User } = require('../models')

class AuthController {
    static async login(req, res, next) {
        try {
            const { password, email } = req.body

            if (!email || !password) {
                throw ({ name: "Bad Request"})
            }

            const user = await User.findOne({
                where: {
                    email
                }
            })

            if (!user) {
                throw ({ name: 'Login Error' })
            }

            if(!comparePass(password, user.password)) {
                throw ({ name: 'Login Error' })
            }

            const  payload = {
                id: user.id,
                email: user.email
            }

            const access_token = signToken(payload)

            res.status(200).json({
                access_token
            })            
        } catch (error) {
            next(error)
        }
    }

    static async loginGoogle(req, res, next) {
        try {
            const {OAuth2Client} = require('google-auth-library');
            const client = new OAuth2Client();
            const { token } = req.headers

            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID
            });

            const gPayload = ticket.getPayload();

            if (!gPayload.email_verified) {
                throw ({ name: 'Login Error' })
            }

            const [user, created] = await User.findOrCreate({
                where: {
                    email: gPayload.email
                },
                defaults: {
                    username: gPayload.email,
                    email: gPayload.email,
                    password: 'google_password'
                },
            });

            const  payload = {
                id: user.id,
                email: user.email
            }

            const access_token = signToken(payload)

            res.status(200).json({
                access_token
            })            
        } catch (error) {
            next(error)
        }
    }

    static async regis(req, res, next) {
        try {
            const { username, email, password } = req.body
            const user = await User.create({ username, email, password })

            delete user.dataValues.password
            delete user.dataValues.createdAt
            delete user.dataValues.updatedAt

            res.status(201).json(user)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = AuthController