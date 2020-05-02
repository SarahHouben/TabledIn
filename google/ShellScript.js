// const shell = require('shelljs');
const { execFile, exec } = require('child_process');
exports.shellScript = (id) => {
  const googleAcc = process.env.GOOGLE_ACCOUNT;
  const path = process.env.PATH;

  execFile(
    'bash',
    ['scripts/gcloud.sh', id, googleAcc, path],
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`.brightRed);
        return;
      }
      console.log(`stdout: ${stdout}`.brightGreen);
      console.error(`stderr: ${stderr}`.brightRed);
    }
  );

  const command = `gcloud iam service-accounts keys create --iam-account ${id}@${id}.iam.gserviceaccount.com ./google/key.json`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`.brightRed);
      return;
    }
    console.log(`stdout: ${stdout}`.brightGreen);
    console.error(`stderr: ${stderr}`.brightRed);
  });
  // shellScript('mmadasdasdasdd')
  // gcloud iam service-accounts add-iam-policy-binding tmarko@tmarko.iam.gserviceaccount.com --member='serviceAccount:tmarko@tmarko.iam.gserviceaccount.com' --role='roles/owner'
};
