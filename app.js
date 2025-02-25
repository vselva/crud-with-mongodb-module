// Import required modules
const dotenv = require('dotenv').config(); // Load environment variables
const express = require('express'); // Express framework
const app = express();
const exhbs = require('express-handlebars'); // Handlebars templating engine
const dbo = require('./db'); // Import database connection
const ObjectId = dbo.ObjectId; // MongoDB ObjectId for referencing documents

// ==========================
// Setup Handlebars Template Engine
// ==========================
app.engine('hbs', exhbs.engine({
    layoutsDir: 'views/', // Directory for layout files
    defaultLayout: "main", // Default layout file
    extname: "hbs" // Handlebars file extension
}));
app.set('view engine', 'hbs');
app.set('views', 'views'); 

// ==========================
// Middleware Configuration
// ==========================
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data

// ==========================
// Utility Function - Validate ObjectId
// ==========================
const isValidObjectId = (id) => ObjectId.isValid(id);

// ==========================
// Route: Home (Fetch Books + CRUD Operations)
// ==========================
app.get('/', async (req, res) => {
    try {
        let database = await dbo.getDatabase(); // Get database connection
        const collection = database.collection('books'); // Access 'books' collection
        const cursor = collection.find({}); // Fetch all books
        let books = await cursor.toArray(); // Convert to array

        // Extract query parameters
        const { edit_id, delete_id, status } = req.query;
        var message = req.query.message;
        let edit_book = '';

        // Fetch the book details if 'edit_id' is provided
        if (edit_id && isValidObjectId(edit_id)) {
            edit_book = await collection.findOne({ _id: new ObjectId(edit_id) });
        }

        // Delete book operation
        if (delete_id && isValidObjectId(delete_id)) {
            try {
                const result = await collection.deleteOne({ _id: new ObjectId(delete_id) });

                if (result.deletedCount === 0) {
                    console.log('Error: Delete operation failed.');
                    message = 'Error: Delete operation failed.';
                }

                return res.redirect('/?status=delete'); // Redirect after delete
            } catch (error) {
                console.log('Error deleting a book: ' + error);
                message = 'Error deleting a book: ' + error.message;
            }
        }

        // Status Messages
        const messages = {
            create: '📖 Book added successfully!',
            update: '✍️ Book updated successfully!',
            delete: '🗑️ Book deleted successfully!',
        };

        display_message = messages[status] || message;

        // Render the main Handlebars template with books list
        res.render('main', {
            display_message,
            books,
            edit_id, 
            edit_book
        });

    } catch (error) {
        console.error('Error fetching books:', error);
        res.redirect('/?status=error&message=' + encodeURIComponent(error.message));
    }
});

// ==========================
// Route: Create New Book (POST Request)
// ==========================
app.post('/store_book', async (req, res) => {
    try {
        let database = await dbo.getDatabase();
        const collection = database.collection('books');

        // Create book object
        let book = {
            title: req.body.title, 
            author: req.body.author 
        };

        await collection.insertOne(book); // Insert book into MongoDB
        return res.redirect('/?status=create'); // Redirect with success message

    } catch (err) {
        console.log('Error inserting book: ' + err.message);
        return res.redirect('/?status=error&message=' + encodeURIComponent(err.message));
    }
});

// ==========================
// Route: Update Existing Book (POST Request)
// ==========================
app.post('/update_book/:edit_id', async (req, res) => {
    try {
        let database = await dbo.getDatabase();
        const collection = database.collection('books');
        let editId = req.params.edit_id;

        // Update book details
        let book = {
            title: req.body.title, 
            author: req.body.author 
        };

        await collection.updateOne(
            { _id: new ObjectId(editId) }, // Find book by ID
            { $set: book } // Update title & author
        );

        return res.redirect('/?status=update'); // Redirect with success message

    } catch (err) {
        console.log('Error updating book: ' + err);
        return res.redirect('/?status=error&message=' + encodeURIComponent(err.message));
    }
});

// ==========================
// Start Express Server
// ==========================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
