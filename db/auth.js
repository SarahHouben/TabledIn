const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.findUserDB = async (data) => {
  const { username } = data;

  try {
    const user = await User.findOne({ username });
    return user;
  } catch (err) {
    console.error(err);
  }
};

exports.createUserDB = async (newData) => {
  const { username, password, email } = newData;
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt);

  const data = { username, password: hash, email };
  try {
    const user = await User.create(data);
    return user;
  } catch (err) {
    console.error(err);
  }
};
