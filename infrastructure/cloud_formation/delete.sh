#!/bin/bash

aws cloudformation delete-stack --stack-name kgraph-vpc
aws cloudformation delete-stack --stack-name kgraph-ec2-api-server
aws cloudformation delete-stack --stack-name kgraph-ec2-graphdb-server
aws cloudformation delete-stack --stack-name kgraph-ec2-batch-server
