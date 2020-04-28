const { exec } = require('child_process');

exports.shellScript = (id) => {
  const script = `gcloud config set project ${id} ; 
  gcloud services enable iam.googleapis.com dialogflow.googleapis.com ; 
  gcloud iam service-accounts create ${id} --display-name ${id} ; echo "DONE!"`;

 return exec(script, (error, stdout, stderr) => {
      if (error) {
            console.error(`exec error: ${error}` .brightRed);
            return;
          }
          console.log(`stdout: ${stdout}` .brightGreen);
          console.error(`stderr: ${stderr}` .brightGreen);
  });
};
// shellScript('mmadqweqwegcls7777dasdd')