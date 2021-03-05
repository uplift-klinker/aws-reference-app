#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { TodoAppStack } from '../lib/todo-app-stack';
import {STACK_NAME} from "../lib/stack-name";

const app = new cdk.App();
new TodoAppStack(app, STACK_NAME, {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION
    }
});
