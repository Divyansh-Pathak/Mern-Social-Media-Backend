require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

connectDB();

app.use(userRoutes);



const PORT = process.env.PORT || 5000 ;

app.listen(PORT , () => console.log(`Server is running on ${PORT} `));