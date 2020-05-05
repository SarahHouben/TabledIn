const { google } = require('googleapis');
const { authToken } = require('./Auth');

exports.createAgent = async (id, name) => {
  const token = await authToken(id);
  const dialogflow = google.dialogflow({
    version: 'v2',
    auth: token,
  });

  const request = {
    parent: `projects/${id}`,
    requestBody: {
      displayName: name,
      defaultTimezone: 'Europe/Madrid',
      timeZone: 'Europe/Madrid',
      agentName: name,
      defaultLanguageCode: 'en',
      enableLogging: true,
    },
  };

  const result = await dialogflow.projects
    .setAgent(request)
    .catch(console.error);
    

  console.log(result.data);
};
