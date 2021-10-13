const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../model/User');

const register = async (req, res) => {
    let body = req.body;
    const { firstName, lastName, username, email, password } = body

    try {
        const createdUser = new User({
            firstName,
            lastName,
            username,
            email,
            password
        })
        let savedUser = await createdUser.save();
        res.json({ message: "SUCCESS", payload: savedUser });
    } catch(err) {
        res.status(500).json({
            message: "ERROR",
            error: err.message
        })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    
    try {

        let foundUser = await User.findOne({ email: email })

        if (!foundUser) {
            return res.json(500).json({
                message: "ERROR",
                error: "Invalid login credentials"
            })
        } else {
            let comparedPassword = await compare(password, foundUser.password);

            if (!comparedPassword) {
                return res.status(500).json({
                    message: "ERROR",
                    error: "Invalid login credentials"
                })
            } else {
                let loginData = { email: foundUser.email, password: foundUser.password }
                res.json({ message: "SUCCESS", payload: loginData})
            }
        }

    } catch(e) {
        res.status(500).json({
            message: "ERROR",
            error: e.message
        })
    }
}

module.exports = {
    register,
    login
}