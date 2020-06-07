import { expect as expectCDK, haveResource } from "@aws-cdk/assert";
import * as cdk from "@aws-cdk/core";
import * as CdkWorkshop from "../lib/url-shortener-stack";

test("API Gateway REST APIs created", () => {
  const app = new cdk.App();
  // WHEN
  const stack = new CdkWorkshop.UrlShortenerStack(app, "MyTestStack");
  // THEN
  expectCDK(stack).to(haveResource("AWS::ApiGateway::RestApi"));
});

test("DynamoDB table created", () => {
  const app = new cdk.App();
  // WHEN
  const stack = new CdkWorkshop.UrlShortenerStack(app, "MyTestStack");
  // THEN
  expectCDK(stack).to(haveResource("AWS::DynamoDB::Table"));
});

test("Lambda functions created", () => {
  const app = new cdk.App();
  // WHEN
  const stack = new CdkWorkshop.UrlShortenerStack(app, "MyTestStack");
  // THEN
  expectCDK(stack).to(haveResource("AWS::Lambda::Function"));
});
