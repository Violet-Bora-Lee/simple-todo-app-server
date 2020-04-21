const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect DB
connectDB();

// Initialize Middleware
app.use(express.json( { extended: false }));

// Define Routes
app.use('/api/todos', require('./routes/todos'));

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
