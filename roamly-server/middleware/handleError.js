const ErrorHandle = (error, req, res, next) => {
    let message = "Internal Server Error"
    let status = 500

    if (error.name === 'SequelizeValidationError') {
        message = error.errors[0].message
        status = 400
    }

    if (error.name === 'SequelizeDatabaseError') {
        message = 'Invalid Input'
        status = 400
    }

    if (error.name === 'SequelizeUniqueConstraintError') {
        message = error.errors[0].message
        status = 400
    }

    if (error.name === 'JsonWebTokenError' || error.name === 'unauthorized') {
        message = 'Please Login First'
        status = 401
    }

    if (error.name === 'Login Error') {
        message = 'Invalid email/password'
        status = 401
    }

    if (error.name === 'Bad Request') {
        message = 'Email/Password is required!'
        status = 400
    }

    if (error.name === 'Not Found') {
        message = 'Data Not Found'
        status = 404
    }

    if (error.name === 'Forbidden') {
        message = "You Don't Have Any Access"
        status = 403
    }

    if (error.name === 'BadRequest') {
        message = 'Nothing to Update'
        status = 400
    }

    if (error.name === 'Generate Error') {
        message = 'Failed to Generate'
        status = 400
    }

    if (error.response?.status === 404) {
        message = 'Weather location not Found'
        status = 404
    }

    if (error.name === 'Photo Error') {
        message = 'Failed to get Photo'
        status = 400
    }
    



    res.status(status).json({
        message
    })
}

module.exports = ErrorHandle