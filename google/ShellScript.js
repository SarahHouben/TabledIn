const shell = require('shelljs');

exports.shellScript = (id) => {
  const googleAcc = process.env.GOOGLE_ACCOUNT;
  const path = process.env.PATH;
  const script = `
  gcloud config set account ${googleAcc} ;
  gcloud config set project ${id} ; 
  gcloud services enable iam.googleapis.com dialogflow.googleapis.com drive.googleapis.com; 
  gcloud iam service-accounts create ${id} --display-name ${id} ; 
  gcloud projects add-iam-policy-binding ${id} --member='serviceAccount:${id}@mmadqweqwegcls7777dasdd.iam.gserviceaccount.com' --role='roles/owner' ; 
  gcloud iam service-accounts keys create ${path}/google key.json --iam-account ${id}@${id}.iam.gserviceaccount.com ; echo "DONE!" ;

  gcloud config set account ${id}@${id}.iam.gserviceaccount.com ;
  `;

  //   gcloud projects add-iam-policy-binding ${id} --member='serviceAccount:${id}@mmadqweqwegcls7777dasdd.iam.gserviceaccount.com' --role='roles/owner'
  //   gcloud iam service-accounts keys create ./google/ key@mmadqweqwegcls7777dasdd.json --iam-account mmadqweqwegcls7777dasdd@mmadqweqwegcls7777dasdd.iam.gserviceaccount.com
  // gcloud auth activate-service-account mmadqweqwegcls7777dasdd@mmadqweqwegcls7777dasdd.iam.gserviceaccount.com  --key-file=/.config/gcloud/key@mmadqweqwegcls7777dasdd.json --project=mmadqweqwegcls7777dasdd
  //gcloud iam service-accounts create mmadqweqwegcls7777dasdd --display-name mmadqweqwegcls7777dasdd
  // gcloud iam service-accounts add-iam-policy-binding mmadqweqwegcls7777dasdd@mmadqweqwegcls7777dasdd.iam.gserviceaccount.com --member='serviceAccount:mmadqweqwegcls7777dasdd}@mmadqweqwegcls7777dasdd.iam.gserviceaccount.com' --role='roles/owner
  shell.exec(script, { async: true }, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`.brightRed);
      return;
    }
    console.log(`stdout: ${stdout}`.brightGreen);
    console.error(`stderr: ${stderr}`.brightRed);
  });
};
// shellScript('mmadasdasdasdd')
// gcloud iam service-accounts add-iam-policy-binding tmarko@tmarko.iam.gserviceaccount.com --member='serviceAccount:tmarko@tmarko.iam.gserviceaccount.com' --role='roles/owner'
