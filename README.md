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

## License
This project is licensed under the MIT License.

