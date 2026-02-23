const express = require('express');
const router = express.Router();
const Report = require('../models/Report');
const User = require('../models/User');

// Home Page
router.get('/', (req, res) => {
    res.render('index', { title: res.locals.t.welcome });
});

// Post Report
router.post('/report', async (req, res) => {
    try {
        const { name, issue } = req.body;
        const reportData = {
            name: name || 'Anonymous',
            issue,
            status: 'Pending'
        };

        if (req.session.user) {
            reportData.userId = req.session.user.id;
        }

        const newReport = new Report(reportData);
        await newReport.save();
        res.status(201).json({ message: 'Report submitted successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error submitting report.' });
    }
});

// Dashboard
router.get('/dashboard', async (req, res) => {
    if (!req.session.user) return res.redirect('/auth');
    if (req.session.user.role === 'admin') return res.redirect('/admin');

    try {
        const reports = await Report.find({ userId: req.session.user.id }).sort({ date: -1 });
        res.render('dashboard', {
            title: `Dashboard | ${req.session.user.name}`,
            reports
        });
    } catch (err) {
        res.status(500).send('Error loading dashboard');
    }
});

// Admin Panel
router.get(['/admin', '/admin/'], async (req, res) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
        return res.redirect('/auth');
    }

    try {
        const reports = await Report.find().populate('userId').sort({ date: -1 });

        // Analytics aggregation
        const statusCounts = { Pending: 0, Investigating: 0, Resolved: 0, Dismissed: 0 };
        const dailyCounts = {};

        // Get last 7 days keys
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            dailyCounts[d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })] = 0;
        }

        reports.forEach(r => {
            // Count status
            const s = r.status || 'Pending';
            if (statusCounts.hasOwnProperty(s)) statusCounts[s]++;

            // Count daily (if within last 7 days)
            const dateStr = new Date(r.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
            if (dailyCounts.hasOwnProperty(dateStr)) dailyCounts[dateStr]++;
        });

        res.render('admin', {
            title: 'Admin Master Control | CyberSafe',
            reports,
            analytics: {
                statusCounts,
                dailyCounts: {
                    labels: Object.keys(dailyCounts),
                    data: Object.values(dailyCounts)
                }
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading admin panel');
    }
});

// Update Report Status (Admin only)
router.post('/admin/report/:id/status', async (req, res) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    try {
        const { status } = req.body;
        await Report.findByIdAndUpdate(req.params.id, { status });
        res.json({ message: 'Status updated successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating status' });
    }
});

module.exports = router;
