const router = require('express').Router();
const authService = require('../services/authService');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const { email, password, rePass, gender } = req.body;
    try {
        if (password == '' || rePass == '' && (password || rePass)) {
            throw {
                message: 'Passwords missmatch detected!'
            }
        } else {
            const user = await authService.registerUser({ email, password, gender });
            const token = await authService.genderateToken(user);
            res.cookie('session', token, { httpOnly: true });
            res.redirect('/');
        }
    } catch (error) {
        res.render('auth/register', { error: error.message });
    }
});

router.get('/logout', (req, res) => {
    res.render('auth/login');
});

module.exports = router;