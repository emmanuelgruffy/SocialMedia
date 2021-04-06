const express = require('express');
const connectDB = require('./config/db'); // we are importing the db connection

const app = express();

//connecting the data-base:
connectDB();

const PORT = (process.env.PORT || 5000);

app.listen(PORT, () => console.log('server started on port ' + PORT));

app.get("/", (req, res) => res.send('Api running'));


//see the config folder - that allow us to define config variables, this is enabled due to the npm config installation.

