const express = require('express');
const app = express();
require('colors');
require('dotenv').config();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require('cors');
app.use(cors());
app.use("/api", require("./routers/admin.routes"));
app.use(express.static("public/index.html"));



// start server 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgCyan.white);
});
