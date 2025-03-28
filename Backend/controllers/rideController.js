const rideService = require('../services/rideService.js');
const { validationResult } = require('express-validator');
const mapService = require('../services/mapsService.js');
const { sendMessageToSocketId } = require('../socket.js');
const rideModel = require('../models/rideModel.js');
const { mountpath } = require('../app.js');

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination, vehicleType } = req.body;

    try {
        const ride = await rideService.createRide({ user: req.user._id, pickup, destination, vehicleType });
        
        const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
        const captainsInRadius = await mapService.getCaptainInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 5);

        // Get complete ride data with all fields
        const rideWithUser = await rideModel.findOne({ _id: ride._id })
            .populate('user')
            .select('+otp +distance');  // Explicitly select distance field

        console.log('Complete ride data:', rideWithUser);

        captainsInRadius.forEach(captain => {
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            });
        });

        return res.status(201).json(rideWithUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;
    try {
        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json(fare);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.confirmRide({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        });

        return res.status(200).json(ride);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;
    try {
        const ride = await rideService.startRide({ rideId, otp, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        });

        return res.status(200).json(ride);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;
    try {
        const ride = await rideService.endRide({
            rideId, captain: req.captain
        });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        });

        return res.status(200).json(ride);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}