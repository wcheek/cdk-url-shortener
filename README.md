# Simple AWS URL Shortener

"Design a URL shortener" is a frequently mentioned example of a system
design interview question for software engineering jobs. So I decided to ask,
how hard is it to actually build one?

Turns out with AWS CDK, it's pretty easy, since you can define all of the
infrastructure as code - a strategy known as IaC. That is, if you just set up
an AWS account (free tier should be enough) and run `cdk deploy`, you can have
all of the AWS resources and endpoints up and running (and automatically
scaling, since it's AWS). Once deployed, this URL shortener lets you:

* create URLs by calling `/create?url=http://www.example.com`
* visit URLs by calling `/visit/XXXXX`

The architecture consists of a AWS Gateway component, which proxy any REST API
calls to two different AWS Lambda functions that can read and update from a
DynamoDB table storing the URL mappings.

I haven't added any of the complex backend pieces you might want in a complete
service, like load balancers or caches, but those are left as an exercise for
the reader. It should go without saying, but don't actually use this in
production! :-)

## Setup and useful commands

I recommend going through the tutorial for CDK on <https://cdkworkshop.com/> -
it introduces the concepts much better than I could.

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
