const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const jwtSign = promisify(jwt.sign);
const User = require('../models/User');
const { SECRET, SALT_ROUNDS } = require('../../config/constants');

exports.registerUser = async ({ email, password, gender }) => {
    const userReg = await User.findOne({ email });
    if (userReg) {
        throw {
            message: 'Email already registered!'
        }
    } else {
        try {
            if (email !== '' || password !== '' || gender !== '') {
                const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
                const user = await User.create({ email, password: hashedPassword, gender });
                return user;
            } else {
                throw {
                    message: 'Ivalid user data provided!'
                }
            }
        } catch (err) {
            return err.message;
        }
    }
}

exports.genderateToken = async (user) => {
    const token = jwtSign({ _id: user._id, email: user.email }, SECRET, { expiresIn: '2d' });
    return token;
}