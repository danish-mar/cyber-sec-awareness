const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Auth Page
router.get('/auth', (req, res) => {
    if (req.session.user) return res.redirect('/dashboard');
    res.render('auth', { title: 'Security Access | CyberSafe India' });
});

// Signup Logic
router.post('/auth/signup', async (req, res) => {
    try {
        const { phone, password, name } = req.body;

        let user = await User.findOne({ phone });
        if (user) {
            return res.status(400).json({ message: 'Mobile number already registered.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({
            phone,
            password: hashedPassword,
            name
        });

        await user.save();
        res.status(201).json({ message: 'Registration successful!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error during registration.' });
    }
});

// Login Logic
router.post('/auth/login', async (req, res) => {
    try {
        const { phone, password } = req.body;

        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // Set session
        req.session.user = {
            id: user._id,
            phone: user.phone,
            name: user.name,
            role: user.role
        };

        console.log('Login attempt successful:', req.session.user);
        res.status(200).json({ message: 'Access granted!', user: req.session.user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error during login.' });
    }
});

// Logout
router.get('/auth/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
