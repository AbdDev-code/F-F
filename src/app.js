const express = require('express');
const app = express();
const connectDB = require('./config/db');
require('colors');
require('dotenv').config();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require('cors');
app.use(cors());
app.use("/api", require("./routers/admin.routes"));


// Connect to MongoDB
connectDB();


// start server 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgCyan.white);
});
