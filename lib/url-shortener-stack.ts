import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import { RestApi, LambdaIntegration } from "@aws-cdk/aws-apigateway";

export class UrlShortenerStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // defines a DynamoDB table
    const table = new dynamodb.Table(this, "UrlTable", {
      partitionKey: {
        name: "websiteUrl",
        type: dynamodb.AttributeType.STRING,
      },
    });
    table.addGlobalSecondaryIndex({
      indexName: "shortenedUrlIndex",
      partitionKey: {
        name: "shortenedUrl",
        type: dynamodb.AttributeType.STRING,
      },
    });

    // defines an AWS Lambda instance
    const createUrlHandler = new lambda.Function(this, "CreateUrlHandler", {
      runtime: lambda.Runtime.NODEJS_12_X, // execution environment
      code: lambda.Code.fromAsset("create-url-lambda"), // directory to load code
      handler: "index.handler", // file is "index", function is "handler"
      environment: {
        URL_TABLE_NAME: table.tableName,
      },
    });

    const cfnFuncUrlCreateURLLambda = new cdk.CfnResource(
      this,
      "lambdaFuncUrlCreate",
      {
        type: "AWS::Lambda::Url",
        properties: {
          Cors: { AllowOrigins: ["*"] },
          TargetFunctionArn: createUrlHandler.functionArn,
        },
      }
    );
    new cdk.CfnResource(this, "funcURLPermissionCreate", {
      type: "AWS::Lambda::Permission",
      properties: {
        FunctionName: createUrlHandler.functionName,
        Principal: "*",
        Action: "lambda:InvokeFunctionUrl",
        FunctionUrlAuthType: "NONE",
      },
    });
    new cdk.CfnOutput(this, "createURLLambda", {
      value: cfnFuncUrlCreateURLLambda.getAtt("FunctionUrl").toString(),
    });

    // defines another AWS Lambda instance
    const visitUrlHandler = new lambda.Function(this, "VisitUrlHandler", {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset("visit-url-lambda"),
      handler: "index.handler",
      environment: {
        URL_TABLE_NAME: table.tableName,
      },
    });

    const cfnFuncUrlVisitURLHandler = new cdk.CfnResource(
      this,
      "lambdaFuncUrlVisit",
      {
        type: "AWS::Lambda::Url",
        properties: {
          Cors: { AllowOrigins: ["*"] },
          TargetFunctionArn: createUrlHandler.functionArn,
        },
      }
    );
    new cdk.CfnResource(this, "funcURLPermissionVisit", {
      type: "AWS::Lambda::Permission",
      properties: {
        FunctionName: visitUrlHandler.functionName,
        Principal: "*",
        Action: "lambda:InvokeFunctionUrl",
        FunctionUrlAuthType: "NONE",
      },
    });
    new cdk.CfnOutput(this, "createURLLambdaVisit", {
      value: cfnFuncUrlVisitURLHandler.getAtt("FunctionUrl").toString(),
    });
    // Define API Gateway RESt API resources backed by lambda functions
    //const rootApi = new RestApi(this, "url-shortener-api");
    //const createApi = rootApi.root.addResource("create");
    //createApi.addMethod("GET", new LambdaIntegration(createUrlHandler));

    //const visitApi = rootApi.root.addResource("visit");
    //const visitItemApi = visitApi.addResource("{shortenedUrl}");
    //visitItemApi.addMethod("GET", new LambdaIntegration(visitUrlHandler));

    // Grant DynamoDB permissions to the lambda functions
    table.grantReadWriteData(createUrlHandler);
    table.grantReadData(visitUrlHandler);
  }
}
