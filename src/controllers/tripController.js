const router = require('express').Router();

router.get('/shared', (req, res) => {
    res.render('trips/shared-trips');
});

router.get('/offer', (req, res) => {
    res.render('trips/trip-create');
});

router.get('/profile', (req, res) => {
    res.render('trips/profile');
});

module.exports = router;