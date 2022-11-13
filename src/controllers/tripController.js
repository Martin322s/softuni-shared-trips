const tripService = require('../services/tripService');

const router = require('express').Router();

router.get('/shared', async (req, res) => {
    const trips = await tripService.getAll();
    res.render('trips/shared-trips', { trips });
});

router.get('/offer', (req, res) => {
    res.render('trips/trip-create');
});

router.post('/offer', async (req, res) => {
    const data = req.body;
    const owner = req.user;

    try {
        if (Object.values(data).some(x => x == '')) {
            throw {
                message: "All fields are required!"
            }
        } else {
            await tripService.createTrip({ ...data, owner });
            res.redirect('/trips/shared');
        }
    } catch (err) {
        res.render('trips/trip-create', { error: err.message, data });
    }
});

router.get('/profile', (req, res) => {
    res.render('trips/profile');
});

router.get('/details/:tripId', async (req, res) => {
    const tripId = req.params.tripId;
    const trip = await tripService.getOne(tripId);
    const isOwner = trip.owner._id == req.user;
    res.render('trips/trip-details', {
        _id: trip._id,
        startPoint: trip.startPoint,
        endPoint: trip.endPoint,
        date: trip.date,
        time: trip.time,
        carImage: trip.carImage,
        carBrand: trip.carBrand,
        seats: trip.seats,
        price: trip.price,
        description: trip.description,
        owner: trip.owner.email,
        creator: isOwner
    });
});

router.get('/details/:tripId/delete', async (req, res) => {
    const tripId = req.params.tripId;
    await tripService.deleteTrip(tripId);
    res.redirect('/trips/shared');
});

router.get('/details/:tripId/edit', async (req, res) => {
    const tripId = req.params.tripId;
    const trip = await tripService.getOne(tripId);
    res.render('trips/trip-edit', {
        startPoint: trip.startPoint,
        endPoint: trip.endPoint,
        date: trip.date,
        time: trip.time,
        carImage: trip.carImage,
        carBrand: trip.carBrand,
        seats: trip.seats,
        price: trip.price,
        description: trip.description
    });
});

router.post('/details/:tripId/edit', async (req, res) => {
    const tripId = req.params.tripId;
    const tripData = req.body;
    await tripService.editTrip(tripId, tripData);
    res.redirect(`/trips/details/${tripId}`);
});

module.exports = router;