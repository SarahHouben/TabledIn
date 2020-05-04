require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  const uriProd = process.env.MONGO_URI_PRODUCTION;
  const uriDev = process.env.MONGO_URI_DEVELOPMENT;

  if (process.env.NODE_ENV === 'production') {
    const conn = await mongoose.connect(uriProd, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log(
      `MongoDB connected to production DB: ${conn.connection.host}`.cyan.underline.bold
    );
  }
  if (process.env.NODE_ENV === 'development') {
    const conn = await mongoose.connect(uriDev, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log(
      `MongoDB connected to development DB: ${conn.connection.host} ` .cyan.underline.bold 
    );
  }
};

module.exports = connectDB;
