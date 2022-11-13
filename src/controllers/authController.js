const router = require('express').Router();
const { response } = require('express');
const authService = require('../services/authService');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        if (email !== '' && password !== '') {
            const user = await authService.loginUser({ email, password });
            if (typeof user !== 'string') {
                const token = await authService.generateToken(user);
                res.cookie('session', token, { httpOnly: true });
                res.redirect('/');
            } else {
                throw {
                    message: user
                }
            }
        } else {
            throw {
                message: 'Invalid email or password!'
            }
        }
    } catch (err) {
        res.render('auth/login', { error: err.message });
    }
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
            const token = await authService.generateToken(user);
            res.cookie('session', token, { httpOnly: true });
            res.redirect('/');
        }
    } catch (error) {
        res.render('auth/register', { error: error.message });
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('session');
    res.redirect('/');
});

module.exports = router;