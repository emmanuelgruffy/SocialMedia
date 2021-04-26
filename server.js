const express = require('express');
const path = require('path');
//see the config folder - that allow us to define config variables, this is enabled due to the npm config installation.
const connectDB = require('./config/db'); // we are importing the db connection

const app = express();

//connecting the data-base:
connectDB();

//Init Middleware - bodyparser is now part of express:
app.use(express.json( {extended: false} ));

//Define Routes: (i.e use the routes inside the api folder)
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = (process.env.PORT || 5000);

app.listen(PORT, () => console.log('server started on port ' + PORT));






