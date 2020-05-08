require('dotenv').config();
const mongoose = require('mongoose');
const config = require('./config');

const uri = config.mongo.uri;
const env = config.env;
const connectDB = async () => {
  const conn = await mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  console.log(
    `MongoDB connected to ${env} DB: ${conn.connection.host}`.cyan.underline
      .bold
  );
};

module.exports = connectDB;
