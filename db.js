const mongodb = require('mongodb');
// Import the MongoDB library

const MongoClient = mongodb.MongoClient;
// Get the MongoDB client

const ObjectId = mongodb.ObjectId;

let database;
// Variable to store the database instance

/**
 * Function to connect to MongoDB and
 * return the database instance
 * @returns {Promise<Db>} - Returns a MongoDB database instance
 */
async function getDatabase() {
    try {
        // Connect to MongoDB Server (Make sure MongoDB is running)
        const client = await MongoClient.connect(
            'mongodb://localhost:27017/',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log('✅ Connected to MongoDB successfully');

        // Select the database named 'library'
        database = client.db('library');

        return database;
    } catch (error) {
        console.error('❌ Error connecting to MongoDB:', error);
        throw error; // Throw an error so the caller knows the connection failed
    }
}

// Export the function so it can be used in other files
module.exports = { getDatabase, ObjectId };
