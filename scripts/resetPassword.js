const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function resetPassword() {
    try {
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/cybersec';
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB');

        const args = process.argv.slice(2);
        if (args.length < 2) {
            console.log('Usage: node scripts/resetPassword.js <phone> <new_password>');
            process.exit(1);
        }

        const [phone, password] = args;

        if (phone.length !== 10 || !password) {
            console.error('Error: phone must be 10 digits and password is required.');
            process.exit(1);
        }

        const existingUser = await User.findOne({ phone, role: 'admin' });
        if (!existingUser) {
            console.error('Error: Admin user not found with this phone number.');
            process.exit(1);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        existingUser.password = hashedPassword;

        await existingUser.save();
        console.log(`\nSuccess: Password for Admin "${existingUser.name}" reset successfully!\n`);

    } catch (err) {
        console.error('Error resetting password:', err);
    } finally {
        mongoose.connection.close();
        process.exit(0);
    }
}

resetPassword();
