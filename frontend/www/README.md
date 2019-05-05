# e599-KGraph

# Setting up the UI for Production

## Prerequisites

Make sure that you have yarn installed. Instructions can be found [here](https://yarnpkg.com/lang/en/docs/install/)

## Setup the Repo and build the app

1. Clone the repository using either https:

   `git clone https://code.harvard.edu/nis109/e599-KGraph.git`

   or ssh:

   `git clone https://code.harvard.edu/nis109/e599-KGraph.git`

1. change into the frontend directory and install the dependencies

   `cd frontend/ && yarn`

1. Configure the backend endpoint.

   There is a variable in `api/config.ts` called `BASE_URL`. Update it to point to
   your API endpoint

1. Build the app for production by running

   `yarn build:prod`

   This will create a production build in the `/static` directory

## Deploying to S3

1. Install the AWS CLI

   `pip install awscli --upgrade --user`

1. Configure your AWS cli

   `aws configure`

1. Create your bucket. **Your bucket name must be unique**

   `aws s3api create-bucket --bucket trialsearch.net --region us-east-1`

1. Enable S3 bucket static website hosting

   `aws s3 website s3://trialsearch.net/ --index-document index.html --error-document 404/index.html`

1. (Optional) Enable S3 bucket versioning

   `aws s3api put-bucket-versioning --bucket trialsearch.net --versioning-configuration Status=Enabled`

1. Create an S3 Policy to upload to S3 bucket

   `aws s3api put-bucket-policy --bucket trialsearch.net --policy file://policy.json`

1. Deploy the app to S3

   `aws s3 cp static s3://trialsearch.net --recursive`
