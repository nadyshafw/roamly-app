const bcrypt = require('bcryptjs')

const hashPass = (pass) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(pass, salt);
}

const comparePass = (pass, hash) => {
    return bcrypt.compareSync(pass, hash);
}

module.exports = { hashPass, comparePass }