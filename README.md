﻿# Library_Management_System-_MongoDB
# Book Management API

A simple Node.js and Express.js application for managing a collection of books using MongoDB. This API allows you to perform CRUD operations (Create, Read, Update, Delete) on a `books` collection.

## Features

- **Create**: Add new books to the collection.
- **Read**: Retrieve a list of all books.
- **Update**: Modify details of an existing book.
- **Delete**: Remove a book from the collection.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Middleware**: `express.json` for handling JSON requests
- **HTTP Server**: `http` module of Node.js

---

## Installation

### Prerequisites
- Node.js and npm installed
- MongoDB installed and running locally

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/book-management-api.git
   cd book-management-api
Install Dependencies:

```bash
npm install
```
Set Up MongoDB: Ensure your MongoDB server is running on localhost:27017.

Start the Server:
```bash
node index.js
```
The server will run on http://localhost:3000.

API Endpoints
1. Create a New Book
Endpoint: POST /books
Request Body:
```bash
{
  "title": "Book Title",
  "author": "Author Name",
  "publishedYear": 2023
}
```
Response:
201 Created:
```bash
{
  "message": "Book added",
  "bookId": "unique-book-id"
}
```
2. Get All Books
Endpoint: GET /books
Response:
200 OK:
```bash
[
  {
    "_id": "unique-book-id",
    "title": "Book Title",
    "author": "Author Name",
    "publishedYear": 2023
  }
]
```
3. Update a Book
Endpoint: PUT /books/:id
Request Body:
```bash
{
  "title": "Updated Title",
  "author": "Updated Author"
}
```
Response:
200 OK:
```bash
{
  "message": "Book updated"
}
```
404 Not Found:
```bash
{
  "error": "Book not found"
}
```
4. Delete a Book
Endpoint: DELETE /books/:id
Response:
200 OK:
```bash
{
  "message": "Book deleted"
}
```
404 Not Found:
```bash
{
  "error": "Book not found"
}
```
File Structure
```bash
├── index.js        # Main server file
├── package.json    # Dependencies and scripts
└── README.md       # Project documentation
```
