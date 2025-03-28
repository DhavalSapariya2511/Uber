const userModel = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../models/blackListTokenModel.js');
const captainModel = require('../models/captainModel.js');


module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const isBlacklisted = await blackListTokenModel.findOne({ token: token });
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized: Token blacklisted' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        // if (!user) {
        //     return res.status(401).json({ message: 'Unauthorized: User not found' });
        // }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: User not found' });
    }
    
}

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    const isBlacklisted = await blackListTokenModel.findOne({ token: token });
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized: Token blacklisted' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);
        req.captain = captain;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Captain not found' });
    }
}