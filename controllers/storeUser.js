const User = require('../database/models/User')

module.exports = (req, res) => {
    User.create(req.body, (error, user) => {
        if (error) {
            res.redirect('/auth/register')
        }
        return res.redirect('/')
    })
}