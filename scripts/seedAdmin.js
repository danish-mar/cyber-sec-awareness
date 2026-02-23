const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function seedAdmin() {
    try {
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/cybersec';
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB');

        const args = process.argv.slice(2);
        if (args.length < 3) {
            console.log('Usage: node scripts/seedAdmin.js <name> <phone> <password>');
            process.exit(1);
        }

        const [name, phone, password] = args;

        if (!name || phone.length !== 10 || !password) {
            console.error('Error: All fields are required and phone must be 10 digits.');
            process.exit(1);
        }

        const existingUser = await User.findOne({ phone });
        if (existingUser) {
            console.error('Error: User already exists with this phone number.');
            process.exit(1);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const adminUser = new User({
            name,
            phone,
            password: hashedPassword,
            role: 'admin'
        });

        await adminUser.save();
        console.log(`\nSuccess: Admin "${name}" created successfully!\n`);

    } catch (err) {
        console.error('Error seeding admin:', err);
    } finally {
        mongoose.connection.close();
    }
}

seedAdmin();
