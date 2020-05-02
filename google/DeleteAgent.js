const { google } = require('googleapis');
const { authToken } = require('./Auth');


exports.deleteAgent = async (id) => {
  const token = await authToken(id);
  const dialogflow = google.dialogflow({
    version: 'v2beta1',
    auth: token,
  });




  const request = {
    parent: `projects/${id}`
  };

 

  const result = await dialogflow.projects
    .getAgent(request)
    .catch(console.error);

 

  console.log(result.data);
};
