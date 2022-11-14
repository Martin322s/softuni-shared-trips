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
    const data = {startPoint, endPoint, date, time, carImage, carBrand, seats, price, description } = req.body;
    const owner = req.user;

    try {
        if (Object.values(data).some(x => x == '')) {
            throw {
                message: "All fields are required!"
            }
        } else {
            const trip = await tripService.createTrip({ seats: Number(seats) , owner,  ...data });
            const author = await tripService.getAuthor(owner);
            await tripService.addOffer(trip, author._id);
            res.redirect('/trips/shared');
        }
    } catch (err) {
        res.render('trips/trip-create', { error: err.message, data });
    }
});

router.get('/profile', async (req, res) => {
    const user = await tripService.getAuthor(req.user);
    const trips = await tripService.myOffers(req.user);
    const myOffers = trips.map(x => { return { startPoint: x.startPoint, endPoint: x.endPoint, date: x.date, time: x.time } });
    res.render('trips/profile', {
        email: user.email,
        count: user.tripsHistory.length,
        haveTrips: user.tripsHistory.length > 0,
        isMale: user.gender == "male",
        trips: myOffers
    });
});

router.get('/details/:tripId', async (req, res) => {
    const tripId = req.params.tripId;
    const trip = await tripService.getOne(tripId);
    const isOwner = trip.owner._id == req.user;
    const mapped = trip.buddies.map(x => x.toString());
    const isJoined = mapped.includes(req.user);
    const buddiesCount = trip.buddies.length;
    const buddies = await tripService.getAllPassagers(tripId);
    const emails = buddies.buddies.map(x => x.email).join(', ');
    console.log(emails);
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
        creator: isOwner,
        aviableSeats: trip.seats > 0,
        isJoined: isJoined,
        buddiesCount: buddiesCount > 0,
        emails: emails
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

router.get('/details/:tripId/join', async (req, res) => {
    const tripId = req.params.tripId;
    const trip = await tripService.getOne(tripId);
    await tripService.joinTrip(tripId, req.user);
    const seats = Number(trip.seats) - 1;
    await tripService.editSeats(tripId, seats);
    res.redirect(`/trips/details/${tripId}`);
});

module.exports = router;