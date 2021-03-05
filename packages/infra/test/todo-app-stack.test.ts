import * as cdk from '@aws-cdk/core';
import {TodoAppStack} from '../lib/todo-app-stack';
import * as s3 from '@aws-cdk/aws-s3';
import * as cloudFront from '@aws-cdk/aws-cloudfront';
import * as lambda from '@aws-cdk/aws-lambda';

const STACK_ID = 'testing';

function createTodoAppStack() {
    const app = new cdk.App();
    return new TodoAppStack(app, STACK_ID);
}

test('when todo app stack created then s3 bucket is part of stack', () => {
    const stack = createTodoAppStack();

    expect(stack).toHaveResourceLike(s3.CfnBucket.CFN_RESOURCE_TYPE_NAME, {
        BucketName: `${STACK_ID}-bucket`
    });
});

test('when todo app stack created then cloud front is added to stack', () => {
    const stack = createTodoAppStack();

    assertHasSpaErrorResponses(stack);
    assertHasOriginAccessIdentity(stack);
})

test('when todo app stack created then spa is uploaded to s3', () => {
    const stack = createTodoAppStack();

    expect(stack).toHaveResourceLike('Custom::CDKBucketDeployment', {
        DestinationBucketName: {
            Ref: `${STACK_ID}bucket7061CAE3`
        }
    })
})

test('when todo app stack created then lambda function is added to stack', () => {
    const stack = createTodoAppStack();

    expect(stack).toHaveResourceLike(lambda.CfnFunction.CFN_RESOURCE_TYPE_NAME, {
        Handler: 'index.handler'
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
