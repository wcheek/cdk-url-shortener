# Simple AWS URL Shortener

"Design a URL shortener" is a pretty common example of a system design
interview question for software engineering jobs. So I decided to ask, how hard
is it to actually build one using "infrastructure as code"?

## What's infrastructure as code and why do I care?

Here's the idea. If we were actually going to make a URL shortening service
to be used by millions of people, we would want to have servers, databases,
and CDNs that could easily scale to the number of users, and that could be
deployed in multiple regions. So in other words, we'd want to use a cloud
computing platform - like AWS, Azure, or GCP.

But it turns out assembling cloud services requires a lot of setup and
configuration. The AWS console, for example, has hundreds of menus and options
available. And choices aside, there is a lot of effort required in
manually connecting components together and setting up permissions. Thus,
**infrastructure as code (IaC) lets you define and deploy your cloud
infrastructure just by writing code.** The CDK is Amazon's main tool for doing
this with AWS.

## So how easy is it?

By installing a few command-line tools, setting up an AWS account (the free
tier should be enough), and running `cdk deploy`, you can have all of the AWS
resources and endpoints for a bare bones URL shortening service up in just a few
minutes! Once deployed, this URL shortener lets you:

* create URLs by calling `/create?url=http://www.example.com`, and
* visit URLs by calling `/visit/XXXXX`

The architecture consists of a AWS Gateway component, which proxy any REST API
calls to two different AWS Lambda functions that can read and update from a
DynamoDB table storing the URL mappings.

I haven't added any of the additional backend components you'd want in a full
production service like load balancers or caches, but consider those as an
exercise for the reader. This project was mostly for fun and just to get my feet
wet with cloud deployments. :-)

## Setup and useful commands

I recommend going through the tutorial for CDK on <https://cdkworkshop.com/> -
it introduces the main concepts much better than I could.

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
