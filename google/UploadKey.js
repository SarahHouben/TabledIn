const { google } = require('googleapis');
const { authToken } = require('./Authorize');
const fs = require('fs');
const path = require('path');

exports.uploadKey = async (id, name) => {
  const auth = await authToken(id);
  const drive = google.drive({ version: 'v3', auth: auth });

  const folderMetadata = {
    name: `${name}`,
    mimeType: 'application/vnd.google-apps.folder',
  };
  const folderReq = {
    resource: folderMetadata,
    fields: 'id',
  };
  const folder = await drive.files.create(folderReq).catch(console.error);

  const fileMetadata = {
    name: 'key.json',
    parents: [folder.data.id],
  };

  const media = {
    mimeType: 'key/json',
    body: fs.createReadStream(
      'google/key.json'
    ),
  };
  const fileReq = {
    resource: fileMetadata,
    media: media,
    fields: 'id',
  };
  const file = await drive.files.create(fileReq).catch(console.error);
  fs.unlink('google/key.json', (err) => {
    if (err) throw err;
    console.log('File deleted!');
}); 
  console.log(file.data.id)
};

// const drive = google.drive({version: 'v3', auth});
//   drive.files.list({
//     pageSize: 10,
//     fields: 'nextPageToken, files(id, name)',
//   }, (err, res) => {
//     if (err) return console.log('The API returned an error: ' + err);
//     const files = res.data.files;
//     if (files.length) {
//       console.log('Files:');
//       files.map((file) => {
//         console.log(`${file.name} (${file.id})`);
//       });
//     } else {
//       console.log('No files found.');
//     }
//   });
//  return file.id;
// };
