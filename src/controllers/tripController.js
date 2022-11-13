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

module.exports = router;