---
layout: post
title: "Going Serverless: host node for free"
description: A frugal way to host node apps on Amazon AWS
date: 2017-06-28
category: words
tags: [development, node.js, javascript, serverless]
---

While looking around for a frugal way to host a node app I came across Serverless architecture. Here follows a *massive simplification* of Serverless architecture from the perspective of a front-end developer. Essentially Serverless involves splitting out:

1. **Server-side JS into individual functions** (e.g. `get-user`), these are then run on a cloud service such as [AWS Lambda](https://aws.amazon.com/lambda/details/). When run on Lambda, these functions exist as stateless containers, and are called on demand by the front-end (e.g. via a GET endpoint of `/user/{id}`).
2. **Front-end HTML, JS and CSS etc** to be uploaded to a static host, such as [AWS S3](https://aws.amazon.com/s3/)

For data storage a cloud solution such as [AWS DynamoDB](https://aws.amazon.com/dynamodb/) or [MongoDB Atlas](https://www.mongodb.com/cloud) can be used.

### Benefits

1. **It's cheap**. As your functions on Lambda are called on demand, you are only using AWS's computing power for a minute amount of time - compared to having an EC2 instance on all the time. Currently the Lambda free-tier is 1 million requests a month!
2. Scaling an app is much cheaper as a result of benefit #1
3. Suited for easily plugging-in BaaS (back-end as a service - e.g. [Firebase](https://firebase.google.com/)) options for reduced development time.

### Drawbacks

1. It's a bit of a pain to split out functions and deploy / test them separately on Lambda (see below for example)
2. Reliant on 3rd-party services - security, API upgrade issues etc.

### A simple Serverless app
To test it out, let's build a simple app that will store info about Australian states in a database and return current data from said database. Deploying Serverless apps is made infinity easier by the [Serverless](https://serverless.com) npm package, which we will be using. The source for this example can be found at [https://github.com/jonjhiggins/serverless-test](https://github.com/jonjhiggins/serverless-test).

#### Setup AWS and connect to it
1. Install [Serverless](https://serverless.com) `npm i serverless -g`
2. Register and log-in to [AWS](https://aws.amazon.com)
3. Create an IAM user called `serverless-admin` with `AdministratorAccess` permissions ([more info](https://serverless.com/framework/docs/providers/aws/guide/credentials/))
4. Create an AWS profile on your machine to connect to your AWS instance `serverless config credentials --provider aws --key AKIAIOSFODNN7EXAMPLE --secret wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` ([more info](https://serverless.com/framework/docs/providers/aws/guide/credentials/))

#### Build the project

1. `mkdir serverless-test && cd $_ `
3. Create file `serverless.yml` - this contains all the configuration the Serverless npm package needs to deploy to AWS.
4. Add the following content to `serverless.yml`:

```yaml
service: serverless-test

frameworkVersion: ">=1.1.0 <2.0.0"

provider:
  name: aws
  runtime: nodejs4.3
  environment:
    DYNAMODB_TABLE: ${self:service}-${opt:stage, self:provider.stage}
  iamRoleStatements:
    - Effect: Allow
      Action:
        - dynamodb:Scan
        - dynamodb:PutItem
      Resource: "arn:aws:dynamodb:${opt:region, self:provider.region}:*:table/${self:provider.environment.DYNAMODB_TABLE}"

functions:
  create:
    handler: states/create.create
    events:
      - http:
          path: states
          method: post
          cors: true

  list:
    handler: states/list.list
    events:
      - http:
          path: states
          method: get
          cors: true

resources:
  Resources:
    ServerlessTestTable:
      Type: 'AWS::DynamoDB::Table'
      DeletionPolicy: Retain
      Properties:
        AttributeDefinitions:
          -
            AttributeName: id
            AttributeType: S
        KeySchema:
          -
            AttributeName: id
            KeyType: HASH
        ProvisionedThroughput:
          ReadCapacityUnits: 1
          WriteCapacityUnits: 1
        TableName: ${self:provider.environment.DYNAMODB_TABLE}
```

This configuration make look complicated, but there's not too much too it:

- In `provider` we're hooking up to the DynamoDB table that  will be our database, `iamRoleStatements` allow specific actions on the table that we'll reference in our Lambda functions.
- In `functions` we list out the Lambda functions, `handler` references their path in the project (e.g. 'states/create.js' has a function "create"). In `events` we create the HTTP endpoint (e.g. '/states').
- In `resources` we create or reference DynamoDB table "ServerlessTestTable" which will store our data.

5. Create `states/create.js` and `states/list.js`. These will contain the functions that create and list states respectively.
6. Add the following content to `states/create.js`:

```js
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const uuid = Math.floor(Math.random() * 100000000).toString();
  const data = JSON.parse(event.body);
  if (typeof data.state !== 'string' || typeof data.slogan !== 'string' || typeof data.capital !== 'string') {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t create a new Australian state.'));
    return;
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuid,
      state: data.state,
      slogan: data.slogan,
      capital: data.capital,
    },
  };

  // write the state to the database
  dynamoDb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t create a new Australian state.'));
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};
```

6. Add the following content to `states/list.js`:

```js
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const params = {
  TableName: process.env.DYNAMODB_TABLE,
};

module.exports.list = (event, context, callback) => {
  // fetch all states from the database
  dynamoDb.scan(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t fetch the Australian states.'));
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
    callback(null, response);
  });
};
```

7. Deploy using `serverless deploy`, make a note of the endpoint URLs at the end
8. Add a state with a cURL request (replacing XXXXXXX with the ID within the endpoint URLs from previous step): `curl -X POST https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/states --data '{ "state": "South Australia", "slogan": "The Wine State", "capital": "Adelaide" }'`
9. View the states in the database with a cURL request: `curl -X GET https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/states`

### Going further

That simple example was adapted an the example project on [Serverless examples](https://github.com/serverless/examples/tree/master/aws-node-rest-api-with-dynamodb), there's loads more examples in the parent repo. In particular, the offline examples are useful for running Serverless locally for debugging. There's no front-end for this example, but that could be created and hosted on S3.
