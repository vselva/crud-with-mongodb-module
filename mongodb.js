// Basic CRUD Operations with MongoDB
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to prompt user input
const askQuestion = (query) => {
    return new Promise(resolve => rl.question(query, resolve));
};

async function crudMongoDB() {
    console.log('Connecting to Database...');
    let client, database, collection;

    try {
        // Establish connection to MongoDB
        client = await MongoClient.connect('mongodb://localhost:27017/');
        console.log('Connected to MongoDB!');
        
        // Select Database and Collection
        database = client.db('company');
        collection = database.collection('employees');
    } catch (error) {
        console.error('Error in Connecting Database:', error.message);
        process.exit(1);
    }
    
    console.log('Database connection successful!');
    await askQuestion("Press Enter to continue...");

    // Insert One Document
    console.log('Inserting One Document...');
    try {
        const employee = { name: 'Selva', age: 24, legalStatus: '' };
        await collection.insertOne(employee);
        console.log('Inserted one document.');
    } catch (error) {
        console.error('Error inserting document:', error.message);
    }
    await askQuestion('Press Enter to continue...');

    // Insert Multiple Documents
    console.log('Inserting Multiple Documents...');
    try {
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

    // Read One Document
    console.log('Reading a Document...');
    try {
        const employee = await collection.findOne({ name: 'Narumugai' });
        console.log('Document found:', employee);
    } catch (error) {
        console.error('Error reading document:', error.message);
    }
    await askQuestion('Press Enter to continue...');

    // Read Multiple Documents
    console.log('Reading Multiple Documents...');
    try {
        const majors = await collection.find({ age: { $gte: 18 } }).toArray();
        console.log('Documents found:', majors);
    } catch (error) {
        console.error('Error reading multiple documents:', error.message);
    }
    await askQuestion('Press Enter to continue...');

    // Update One Document
    console.log('Updating One Document...');
    try {
        await collection.updateOne(
            { name: 'Selva' },
            { $set: { name: 'Selvakumar', age: 25 } }
        );
        console.log('Updated one document.');
    } catch (error) {
        console.error('Error updating document:', error.message);
    }
    await askQuestion('Press Enter to continue...');

    // Update Multiple Documents
    console.log('Updating Multiple Documents...');
    try {
        await collection.updateMany(
            { age: { $gte: 18 } },
            { $set: { legalStatus: 'Major' } }
        );
        await collection.updateMany(
            { age: { $lt: 18 } },
            { $set: { legalStatus: 'Minor' } }
        );
        console.log('Updated multiple documents.');
    } catch (error) {
        console.error('Error updating multiple documents:', error.message);
    }
    await askQuestion('Press Enter to continue...');

    // Delete One Document
    console.log('Deleting One Document...');
    try {
        await collection.deleteOne({ name: 'Selvakumar' });
        console.log('Deleted one document.');
    } catch (error) {
        console.error('Error deleting document:', error.message);
    }
    await askQuestion('Press Enter to continue...');

    // Delete Multiple Documents
    console.log('Deleting Multiple Documents...');
    try {
        await collection.deleteMany({ age: { $gte: 18 } });
        console.log('Deleted multiple documents.');
    } catch (error) {
        console.error('Error deleting multiple documents:', error.message);
    }
    await askQuestion('Press Enter to continue...');

    // Drop Collection
    console.log('Dropping the Collection...');
    try {
        await collection.drop();
        console.log('Collection dropped successfully.');
    } catch (error) {
        console.error('Error dropping collection:', error.message);
    }
    await askQuestion('Press Enter to continue...');

    // Close MongoDB Connection
    client.close();
    rl.close();
    console.log('Database connection closed.');
}

crudMongoDB();
