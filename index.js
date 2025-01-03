const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 3000;

// MongoDB Connection URI and Database Information
const uri = "mongodb://localhost:27017"; // Replace with your MongoDB URI
const dbName = "users";
const collectionName = "books";

// Middleware to parse JSON requests
app.use(express.json());

// MongoDB Client
const client = new MongoClient(uri);

// Connect to MongoDB
async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

// Routes

// Create a new book
app.post("/books", async (req, res) => {
    try {
        const book = req.body;
        const collection = client.db(dbName).collection(collectionName);
        const result = await collection.insertOne(book);
        res.status(201).send({ message: "Book added", bookId: result.insertedId });
    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).send({ error: "Failed to add book" });
    }
});

// Read all books
app.get("/books", async (req, res) => {
    try {
        const collection = client.db(dbName).collection(collectionName);
        const books = await collection.find().toArray();
        res.status(200).send(books);
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).send({ error: "Failed to fetch books" });
    }
});

// Update a book by ID
app.put("/books/:id", async (req, res) => {
    try {
        const bookId = req.params.id;
        const updatedBook = req.body;
        const collection = client.db(dbName).collection(collectionName);

        const result = await collection.updateOne(
            { _id: new MongoClient.ObjectId(bookId) },
            { $set: updatedBook }
        );

        if (result.matchedCount === 0) {
            return res.status(404).send({ error: "Book not found" });
        }

        res.status(200).send({ message: "Book updated" });
    } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).send({ error: "Failed to update book" });
    }
});

// Delete a book by ID
app.delete("/books/:id", async (req, res) => {
    try {
        const bookId = req.params.id;
        const collection = client.db(dbName).collection(collectionName);

        const result = await collection.deleteOne({ _id: new MongoClient.ObjectId(bookId) });

        if (result.deletedCount === 0) {
            return res.status(404).send({ error: "Book not found" });
        }

        res.status(200).send({ message: "Book deleted" });
    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).send({ error: "Failed to delete book" });
    }
});

// Start the server
app.listen(PORT, async () => {
    await connectToDatabase(); // Ensure database connection is established
    console.log(`Server running on http://localhost:${PORT}`);
});
