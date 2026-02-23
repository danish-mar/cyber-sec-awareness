require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const { MongoStore } = require('connect-mongo');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/cybersec';
mongoose.connect(mongoUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Middleware
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || 'tiranga-secret-key',
    resave: false,
    saveUninitialized: false,
    // store: MongoStore.create({ mongoUrl: mongoUri }), 
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hours
}));

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('layout', 'layout');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Language Middleware
const translations = {
    en: {
        welcome: "Welcome to CyberSafe India",
        home: "Home",
        awareness: "Awareness",
        report: "Report",
        resources: "Resources",
        dashboard: "Dashboard",
        login: "Login",
        signup: "Signup",
        logout: "Logout",
        hero_title: "Empowering Every Indian Online",
        hero_sub: "A dedicated public utility for cyber security awareness, focusing on the protection and education of women and children.",
        report_incident: "Report Incident",
        safety_guides: "Safety Guides",
        modules_title: "Core Awareness Modules",
        women_safety: "Women's Safety",
        child_safety: "Child Safety",
        official_resources: "Official Resources",
        lang_switch: "HINDI"
    },
    hi: {
        welcome: "साइबर-सेफ इंडिया में आपका स्वागत है",
        home: "मुख्य पृष्ठ",
        awareness: "जागरूकता",
        report: "रिपोर्ट करें",
        resources: "संसाधन",
        dashboard: "डैशबोर्ड",
        login: "लॉगिन",
        signup: "साइनअप",
        logout: "लॉगआउट",
        hero_title: "हर भारतीय को ऑनलाइन सशक्त बनाना",
        hero_sub: "साइबर सुरक्षा जागरूकता के लिए एक सार्वजनिक उपयोगिता, जो महिलाओं और बच्चों की सुरक्षा और शिक्षा पर केंद्रित है।",
        report_incident: "घटना की रिपोर्ट करें",
        safety_guides: "सुरक्षा गाइड",
        modules_title: "मुख्य जागरूकता मॉड्यूल",
        women_safety: "महिला सुरक्षा",
        child_safety: "बाल सुरक्षा",
        official_resources: "आधिकारिक संसाधन",
        lang_switch: "ENGLISH"
    }
};

app.use((req, res, next) => {
    // Language selection
    if (req.query.lang) {
        res.cookie('lang', req.query.lang);
        req.session.lang = req.query.lang;
    }
    const lang = req.session.lang || req.cookies.lang || 'en';
    res.locals.lang = lang;
    res.locals.t = translations[lang] || translations.en;

    // Auth context
    res.locals.user = req.session.user || null;
    next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/', require('./routes/auth'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
