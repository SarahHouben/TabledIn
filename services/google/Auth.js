const { JWT } = require('google-auth-library');
const { fs } = require('fs');

exports.authToken = (id) => {
  const keys = fs.createReadStream(`../${id}@key.json`);
  const client = new JWT({
    email: keys.client_email,
    key: keys.private_key,
    scopes: [
      'https://www.googleapis.com/auth/cloud-platform',
      'https://www.googleapis.com/auth/drive',
    ],
  });

  return client;
};

