const config = {};

config.mongo = {};
config.cloudinary = {};

if (process.env.NODE_ENV === 'development') {
  config.mongo.uri = process.env.MONGO_URI_DEVELOPMENT;
} else if (process.env.NODE_ENV === 'production') {
  config.mongo.uri = process.env.MONGO_URI_PRODUCTION;
} else if (process.env.NODE_ENV === 'test') {
  config.mongo.uri = process.env.MONGO_URI_TEST;
}
config.port = process.env.PORT;
config.env = process.env.NODE_ENV;
config.cloudinary.cloud_name = process.env.CLOUDINARY_NAME;
config.cloudinary.api_key = process.env.CLOUDINARY_KEY;
config.cloudinary.api_secret = process.env.CLOUDINARY_SECRET;

module.exports = config;
