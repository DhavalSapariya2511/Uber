const mapsService = require('../services/mapsService');
const { validationResult } = require('express-validator');

module.exports.getCoordinate = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const address = req.query.address;
        const coordinates = await mapsService.getAddressCoordinate(address);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(404).json({ message: 'Coordinates not found' });
    }
}

module.exports.getDistanceTime = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { origin, destination } = req.query;
        const distanceTime = await mapsService.getDistanceTime(origin, destination);
        res.status(200).json(distanceTime);
    }
    catch (error) {
        res.status(404).json({ message: 'Distance and time not found' });
    }
}

module.exports.getSuggestions = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { input } = req.query;
        const suggestions = await mapsService.getSuggestions(input);

        res.status(200).json(suggestions);
    }
    catch (error) {
        res.status(404).json({ message: 'Suggestions not found' });
    }
}