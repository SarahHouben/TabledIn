#!/bin/sh
id=$1
googleAcc=$2
path=$3

gcloud config set account ${googleAcc}
gcloud config set project ${id}  
gcloud services enable iam.googleapis.com dialogflow.googleapis.com drive.googleapis.com 
gcloud iam service-accounts create ${id} --display-name ${id}
gcloud projects add-iam-policy-binding ${id} --member="serviceAccount:${id}@${id}.iam.gserviceaccount.com" --role="roles/owner"
#sve ok do ove tacke
gcloud iam service-accounts keys create --iam-account ${id}@${id}.iam.gserviceaccount.com ./google/key.json
# gcloud iam service-accounts keys create --iam-account markommm-1323@markommm-1323.iam.gserviceaccount.com ./google/key.json

