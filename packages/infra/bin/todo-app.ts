#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { TodoAppStack } from '../lib/todo-app-stack';

const app = new cdk.App();
new TodoAppStack(app, 'todo-app', {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION
    }
});
