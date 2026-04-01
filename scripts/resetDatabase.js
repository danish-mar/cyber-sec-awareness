const mongoose = require('mongoose');
require('dotenv').config();

async function resetDatabase() {
    try {
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/cybersec';
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB');

        // Drop the entire database
        await mongoose.connection.db.dropDatabase();
        
        console.log('\nSuccess: Entire database has been reset / wiped clean!\n');

    } catch (err) {
        console.error('Error resetting database:', err);
    } finally {
        mongoose.connection.close();
        process.exit(0);
    }
}

resetDatabase();
