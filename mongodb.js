// Import the MongoDB module to interact with MongoDB databases
const mongodb = require('mongodb');

// Initialize MongoClient - This is a class from the MongoDB module
// It is used to establish a connection to the MongoDB server
const MongoClient = mongodb.MongoClient;

// Import the readline module to handle user input via the command line
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to prompt user input
// This function wraps `rl.question` in a Promise, making it easier to use with async/await
const askQuestion = (query) => {
    return new Promise(resolve => rl.question(query, resolve));
};

// Async function to perform basic CRUD (Create, Read, Update, Delete) operations on MongoDB
async function crudMongoDB() {
    console.log('Connecting to Database...');
    let client, database, collection;

    try {
        // Establish connection to MongoDB using MongoClient
        // The connection URL follows the format: 'mongodb://<hostname>:<port>/'
        // 'localhost' refers to the local machine, and '27017' is the default MongoDB port
        client = await MongoClient.connect('mongodb://localhost:27017/');
        console.log('Connected to MongoDB!');
        
        // Select Database - Here, we are choosing the 'company' database
        database = client.db('company');

        // Select Collection - 'employees' is the collection (similar to a table in relational databases)
        collection = database.collection('employees');
    } catch (error) {
        console.error('Error in Connecting Database:', error.message);
        process.exit(1); // Exit the process if there is a connection failure
    }
    
    console.log('Database connection successful!');
    await askQuestion("Press Enter to continue...");

    // INSERT ONE DOCUMENT
    console.log('Inserting One Document...');
    try {
        // Insert a single document into the 'employees' collection
        // MongoDB automatically assigns a unique `_id` field if not provided
        const employee = { name: 'Selva', age: 24, legalStatus: '' };
        await collection.insertOne(employee);
        console.log('Inserted one document.');
    } catch (error) {
        console.error('Error inserting document:', error.message);
    }
    await askQuestion('Press Enter to continue...');

    // INSERT MULTIPLE DOCUMENTS
    console.log('Inserting Multiple Documents...');
    try {
        // Insert multiple documents in a single operation
        // The insertMany method takes an array of objects
        const employees = [
            { name: 'Narumugai', age: 8, legalStatus: '' },
            { name: 'Diana', age: 18, legalStatus: '' }
        ];
        await collection.insertMany(employees);
        console.log('Inserted multiple documents.');
    } catch (error) {
        console.error('Error inserting multiple documents:', error.message);
    }
    await askQuestion('Press Enter to continue...');

    // READ ONE DOCUMENT
    console.log('Reading a Document...');
    try {
        // Find one document that matches the query (e.g., where name is 'Narumugai')
        // The findOne method returns a single document or null if no match is found
        const employee = await collection.findOne({ name: 'Narumugai' });
        console.log('Document found:', employee);
    } catch (error) {
        console.error('Error reading document:', error.message);
    }
    await askQuestion('Press Enter to continue...');

    // READ MULTIPLE DOCUMENTS
    console.log('Reading Multiple Documents...');
    try {
        // Find all documents where age is 18 or greater
        // The find method returns a cursor, which we convert to an array using `toArray()`
        const majors = await collection.find({ age: { $gte: 18 } }).toArray();
        console.log('Documents found:', majors);
    } catch (error) {
        console.error('Error reading multiple documents:', error.message);
    }
    await askQuestion('Press Enter to continue...');

    // UPDATE ONE DOCUMENT
    console.log('Updating One Document...');
    try {
        // Update a single document where the name is 'Selva'
        // The updateOne method takes two arguments: a filter and an update operation
        await collection.updateOne(
            { name: 'Selva' }, // Filter: Select document where name is 'Selva'
            { $set: { name: 'Selvakumar', age: 25 } } // Update: Set new name and age
        );
        console.log('Updated one document.');
    } catch (error) {
        console.error('Error updating document:', error.message);
    }
    await askQuestion('Press Enter to continue...');

    // UPDATE MULTIPLE DOCUMENTS
    console.log('Updating Multiple Documents...');
    try {
        // Update multiple documents where age is 18 or greater
        // The updateMany method applies changes to all matching documents
        await collection.updateMany(
            { age: { $gte: 18 } }, // Filter: Find documents where age is 18 or older
            { $set: { legalStatus: 'Major' } } // Update: Set legalStatus to 'Major'
        );

        // Update multiple documents where age is less than 18
        await collection.updateMany(
            { age: { $lt: 18 } }, // Filter: Find documents where age is under 18
            { $set: { legalStatus: 'Minor' } } // Update: Set legalStatus to 'Minor'
        );
        console.log('Updated multiple documents.');
    } catch (error) {
        console.error('Error updating multiple documents:', error.message);
    }
    await askQuestion('Press Enter to continue...');

    // DELETE ONE DOCUMENT
    console.log('Deleting One Document...');
    try {
        // Delete a single document where the name is 'Selvakumar'
        await collection.deleteOne({ name: 'Selvakumar' });
        console.log('Deleted one document.');
    } catch (error) {
        console.error('Error deleting document:', error.message);
    }
    await askQuestion('Press Enter to continue...');

    // DELETE MULTIPLE DOCUMENTS
    console.log('Deleting Multiple Documents...');
    try {
        // Delete all documents where age is 18 or greater
        await collection.deleteMany({ age: { $gte: 18 } });
        console.log('Deleted multiple documents.');
    } catch (error) {
        console.error('Error deleting multiple documents:', error.message);
    }
    await askQuestion('Press Enter to continue...');

    // DROP COLLECTION
    console.log('Dropping the Collection...');
    try {
        // Drops the entire 'employees' collection from the database
        // This permanently removes all documents in the collection
        await collection.drop();
        console.log('Collection dropped successfully.');
    } catch (error) {
        console.error('Error dropping collection:', error.message);
    }
    await askQuestion('Press Enter to continue...');

    // CLOSE MONGODB CONNECTION
    // Closing the MongoDB connection is important to free up resources
    client.close();
    rl.close();
    console.log('Database connection closed.');
}

// Call the function to execute MongoDB CRUD operations
crudMongoDB();
