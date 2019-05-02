# KGraph Infrastructure
Most of the infrastructure components required for this application is setup using AWS CloudFormation templates. The bash scripts create.sh and delete.sh
bring up and take down the infrastructure respectively. Inorder to run this app, there are 4 main components that need to be set up
- API Server
- Batch Server
- Graph DB
- S3 bucket for ui web hosting

All of the services or processes on the ec2 machines is run as 'kgadmin' user. So this user should be added to all the 
ec2 machines with appropriate access (ssh) keys 

There are 4 CloudFormation templates:   
### vpc.yaml
This CloudFormation template creates a VPC, Subnets, Security Groups and EFS that will be used by the API, Batch and GraphDB servers

### ec2_api_server.yaml
This CloudFormation template provisions all resources required to run the API Server.

### ec2_batch_server.yaml
This CloudFormation template provisions all resources required to run the API Server. The EFS drive required for storing the
processed files is mounted. Required packages like python3 and pip along with some app specific environment variables 
are setup as part of this script. 

### ec2_graphdb.yaml
This script provisions the neo4j graphdb.  The EFS drive required to load the data in to DB is mounted. Some of the required
tweaks to the neo4j conf file is taken care in this script. 
