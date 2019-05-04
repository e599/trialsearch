#!/bin/bash

# script to provision infrastructure resources

# Update this key to your public key to be able to access the kgadmin user directly
PUBLICKEY="ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC7i89gJtg/TtfV8w47hoi7gdpqEwxWt54EdY4h8uPesrgZPMW87Y8sSsuvoAu3JNrQaqpjdwiSWMxhMKWMxURzQKr+jr06TDvtPBlLVPXJe/SU1IHgTR9oL9eGJ57od8Y0XQ99DvVamha7Fr+o7f9KpxQktCS38QY6WKP0oyNHrexpXJo+2l1P0ysRi9FNwkoQdlT0KPt/uHZhoNtmlZcUYVCx+XmnQKQpLvFmmIoeqPK4lOe3GOz+0/oK7V4KZJIYTDVY0MOZa8rh9/+Gjucjz9WTDRDCo7LONQUYXfy34OWuXWTVuN7pcPTH7hS8XjcIv4yTufvoavyhM5+H9Vf7 kgadmin"

# Set env for provisioning an environment (example STAGE OR PROD)
KG_ENV=PROD

#create vpc stack followed by ec2s for api server, batch server and the graphdb
aws cloudformation create-stack --stack-name kgraph-vpc-"$KG_ENV" --template-body file://vpc.yaml --parameters  ParameterKey=ENV,ParameterValue="$KG_ENV"
aws cloudformation wait stack-create-complete --stack-name kgraph-vpc-"$KG_ENV"
aws cloudformation create-stack --stack-name kgraph-ec2-api-server-"$KG_ENV" --template-body file://ec2_api_server.yaml --parameters  ParameterKey=KeyName,ParameterValue=kgadmin ParameterKey=SSHPublicKey,ParameterValue="$PUBLICKEY" ParameterKey=ImageId,ParameterValue=ami-0a313d6098716f372 ParameterKey=ENV,ParameterValue="$KG_ENV"
aws cloudformation create-stack --stack-name kgraph-ec2-batch-server-"$KG_ENV"  --template-body file://ec2_batch_server.yaml --parameters  ParameterKey=KeyName,ParameterValue=kgadmin ParameterKey=SSHPublicKey,ParameterValue="$PUBLICKEY" ParameterKey=ImageId,ParameterValue=ami-02da3a138888ced85 ParameterKey=ENV,ParameterValue="$KG_ENV"
aws cloudformation create-stack --stack-name kgraph-ec2-graphdb-server-"$KG_ENV" --template-body file://ec2_graphdb.yaml --parameters  ParameterKey=KeyName,ParameterValue=kgadmin ParameterKey=SSHPublicKey,ParameterValue="$PUBLICKEY" ParameterKey=ImageId,ParameterValue=ami-0118d82e9da26d491 ParameterKey=ENV,ParameterValue="$KG_ENV"
aws cloudformation create-stack --stack-name kgraph-s3-"$KG_ENV" --template-body file://s3_bucket.yaml --parameters  ParameterKey=BucketName,ParameterValue=trialsearch.net-`echo "$KG_ENV" | tr '[a-zA-Z]' '[A-Za-z]'`
