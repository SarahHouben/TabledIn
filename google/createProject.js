const { google } = require('googleapis');
const cloudresourcemanager = google.cloudresourcemanager('v1');



exports.createProject = async (name,id) => {
  const authClient = await authorize();
  const request = {
    resource: {
      name: name,
      projectId: id,
      parent: {
        id: "380985456355",
        type: "folder"
      }
    },

    auth: authClient,
  };



  try {
    const response = (await cloudresourcemanager.projects.create(request)).data;
    // TODO: Change code below to process the `response` object:
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(err);
  }
}


async function authorize() {
  const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/cloud-platform']
  });
  return await auth.getClient();
}