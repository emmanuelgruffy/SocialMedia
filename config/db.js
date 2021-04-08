const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI'); //see how we use the config variable -> importing it into a 'db' const.

const connectDB = async () => {
   try {
    await mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});
    console.log('MongoDB Connected...');
   } catch(err) {
    console.log(err.message);
    //exit process with failure:
    process.exit(1);
   }
}

module.exports = connectDB;