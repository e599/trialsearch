#!/bin/bash

# script to delete infrastructure resources
# Set env for deleting an environment (example STAGE OR PROD)
KG_ENV=TEST

# delete api, batch and graph db stacks and finally the vpc stack
aws cloudformation delete-stack --stack-name kgraph-ec2-api-server-"$KG_ENV"
aws cloudformation delete-stack --stack-name kgraph-ec2-graphdb-server-"$KG_ENV"
aws cloudformation delete-stack --stack-name kgraph-ec2-batch-server-"$KG_ENV"
aws cloudformation wait stack-delete-complete --stack-name kgraph-ec2-api-server-"$KG_ENV"
aws cloudformation wait stack-delete-complete --stack-name kgraph-ec2-graphdb-server-"$KG_ENV"
aws cloudformation wait stack-delete-complete --stack-name kgraph-ec2-batch-server-"$KG_ENV"
aws cloudformation delete-stack --stack-name kgraph-vpc-"$KG_ENV"
