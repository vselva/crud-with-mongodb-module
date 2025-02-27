# MongoDB CRUD Application

This is a simple CRUD (Create, Read, Update, Delete) application built using Node.js, Express, MongoDB, and Handlebars for templating.

## Features
- Add new books
- List all books
- Edit existing books
- Delete books

## Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

## Installation
1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd <repository-name>
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Start MongoDB server (if not already running):
    ```sh
    mongod
    ```

## Configuration
Create a `.env` file in the project root and add the following:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/
```

## Running the Application
To start the server, run:
```sh
node app.js
```

Visit `http://localhost:3000` in your browser.

## Project Structure
```
|-- db.js                # Database connection logic
|-- app.js               # Main Express application
|-- views/               # Handlebars templates
    |-- main.hbs         # Main template
|-- package.json         # Dependencies and scripts
|-- README.md            # Project documentation
```

## API Endpoints
| Method | Route             | Description       |
|--------|------------------|-------------------|
| GET    | `/`              | Fetch all books  |
| POST   | `/store_book`    | Add new book     |
| POST   | `/update_book/:edit_id` | Update book by ID |
| GET    | `/?delete_id=ID` | Delete book by ID |

# MongoDB CRUD Operations in one code - mongodb.js

## Overview
This code (mongodb.js) demonstrates basic CRUD (Create, Read, Update, Delete) operations using **MongoDB** and **Node.js**. It connects to a MongoDB database, performs various database operations, and allows user interaction via the terminal.

## How to Run this code

Execute the script using Node.js:
```sh
node mongodb.js
```

## Features
- **Database Connection:** Establishes a connection to MongoDB.
- **Create Operations:** Inserts single and multiple records into a collection.
- **Read Operations:** Retrieves single and multiple documents.
- **Update Operations:** Modifies one or multiple documents.
- **Delete Operations:** Removes single and multiple documents.
- **Drop Collection:** Deletes the entire collection.

## Code Structure
### 1. **Connecting to MongoDB**
The script establishes a connection to a local MongoDB instance and selects the `company` database.

### 2. **Insert Operations**
- Inserts a single document (`insertOne`)
- Inserts multiple documents (`insertMany`)

### 3. **Read Operations**
- Retrieves one document using `findOne`.
- Retrieves multiple documents using `find` with filtering.

### 4. **Update Operations**
- Updates a single document using `updateOne`.
- Updates multiple documents using `updateMany`.

### 5. **Delete Operations**
- Deletes a single document using `deleteOne`.
- Deletes multiple documents using `deleteMany`.
- Drops an entire collection using `drop()`.

## Example Output
```
Connecting to Database...
Connected to MongoDB!
Database has been created! Please check!
...
Inserted one collection. Please check!
...
Read a collection:
{name: 'Narumugai', age: 8, legalStatus: ''}
...
Updated a collection. Please check!
...
Deleted many collections.
...
Dropped the collection.
```

## Troubleshooting
### **1. MongoDB Connection Issues**
If the script fails to connect, ensure MongoDB is running. Start MongoDB with:
```sh
mongod
```

## License
This project is open-source and available under the MIT License.

---

Enjoy coding! 🚀
