const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const jwtVerify = promisify(jwt.verify);
const { SECRET } = require('../../config/constants');

exports.auth = async (req, res, next) => {
    const token = req.cookies['session'];

    if (token) {
        const decodedToken = await jwtVerify(token, SECRET);
        req.user = decodedToken._id;
        req.email = decodedToken.email;
        res.locals.user = decodedToken._id;
        next();
    } else {
        next();
    }
}