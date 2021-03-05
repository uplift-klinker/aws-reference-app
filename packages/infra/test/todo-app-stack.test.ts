import * as cdk from '@aws-cdk/core';
import {TodoAppStack} from '../lib/todo-app-stack';
import * as s3 from '@aws-cdk/aws-s3';
import * as cloudFront from '@aws-cdk/aws-cloudfront';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apiGateway from '@aws-cdk/aws-apigateway';

const STACK_ID = 'testing';

function createTodoAppStack() {
    const app = new cdk.App();
    return new TodoAppStack(app, STACK_ID);
}

let stack: TodoAppStack;
beforeAll(() => {
    stack = createTodoAppStack();
})

test('when todo app stack created then s3 bucket is part of stack', () => {
    expect(stack).toHaveResourceLike(s3.CfnBucket.CFN_RESOURCE_TYPE_NAME, {
        BucketName: `${STACK_ID}-bucket`
    });
});

test('when todo app stack created then cloud front is added to stack', () => {
    assertHasSpaErrorResponses(stack);
    assertHasOriginAccessIdentity(stack);
})

test('when todo app stack created then spa is uploaded to s3', () => {
    expect(stack).toHaveResourceLike('Custom::CDKBucketDeployment', {
        DestinationBucketName: {
            Ref: `${STACK_ID}bucket7061CAE3`
        }
    })
})

test('when todo app stack created then lambda function is added to stack', () => {
    expect(stack).toHaveResourceLike(lambda.CfnFunction.CFN_RESOURCE_TYPE_NAME, {
        Handler: 'index.handler'
    })
})

test('when todo app stack created then api gateway is added to stack', () => {
    expect(stack).toHaveResourceLike(apiGateway.CfnRestApi.CFN_RESOURCE_TYPE_NAME, {
        Name: `${STACK_ID}-rest-api`
    });
    expect(stack).toHaveResourceLike(apiGateway.CfnDeployment.CFN_RESOURCE_TYPE_NAME);
    expect(stack).toHaveResourceLike(apiGateway.CfnMethod.CFN_RESOURCE_TYPE_NAME, {
        HttpMethod: 'ANY'
    });
})

test('when todo app stack created then rest api is output', () => {
    expect(stack).toHaveOutput({
        outputName: 'todorestapiurl'
    })
})

test('when todo app stack created then cloudfront url is output', () => {
    expect(stack).toHaveOutput({
        outputName: 'todowebappurl'
    })
})

test('when todo app stack created then s3 bucket name is output', () => {
    expect(stack).toHaveOutput({
        outputName: 'todowebappbucketname'
    })
})

function assertHasSpaErrorResponses(stack: TodoAppStack) {
    expect(stack).toHaveResourceLike(cloudFront.CfnDistribution.CFN_RESOURCE_TYPE_NAME, {
        DistributionConfig: {
            CustomErrorResponses: [
                {
                    ErrorCode: 404,
                    ResponseCode: 200,
                    ResponsePagePath: '/index.html'
                },
                {
                    ErrorCode: 403,
                    ResponseCode: 200,
                    ResponsePagePath: '/index.html'
                }
            ]
        }
    });
}

function assertHasOriginAccessIdentity(stack: TodoAppStack) {
    expect(stack).toHaveResourceLike(cloudFront.CfnDistribution.CFN_RESOURCE_TYPE_NAME, {
        DistributionConfig: {
            Origins: [
                {
                    DomainName: {
                      'Fn::GetAtt': [
                          `${STACK_ID}bucket7061CAE3`,
                          'RegionalDomainName'
                      ]
                    },
                    S3OriginConfig: {
                        OriginAccessIdentity: {
                            'Fn::Join': [
                                '',
                                [
                                    'origin-access-identity/cloudfront/',
                                    {
                                        'Ref': `${STACK_ID}distributionOrigin1S3OriginFCCFB5C2`
                                    }
                                ]
                            ]
                        }
                    }
                }
            ]
        }
    })
}
