#!/usr/bin/env node
import * as cdk from "@aws-cdk/core";
import { UrlShortenerStack } from "../lib/url-shortener-stack";

const app = new cdk.App();
let UrlShortener = new UrlShortenerStack(app, "UrlShortenerStack");
cdk.Tags.of(UrlShortener).add("project", "chatbot-dev", {
  applyToLaunchedInstances: true,
});
//Tags.of(stack).add(
//key="project", value="chatbot-dev", apply_to_launched_instances=True
//)
