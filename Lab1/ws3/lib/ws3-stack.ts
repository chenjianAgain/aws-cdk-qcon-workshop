import cdk = require('@aws-cdk/core');
import ec2 = require('@aws-cdk/aws-ec2');
import iam = require('@aws-cdk/aws-iam');

import eks = require('@aws-cdk/aws-eks');
import ecsPatterns = require('@aws-cdk/aws-ecs-patterns')
import { ImagePullPrincipalType } from '@aws-cdk/aws-codebuild';
import { EksOptimizedImage } from '@aws-cdk/aws-eks';
import { InstanceType } from '@aws-cdk/aws-ec2';

export class Ws3Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const app = new cdk.App();
    const env = {
      region: 'us-east-1',
      account: '374801192098'
    };

    const stack = new cdk.Stack(app, 'EksStack', { env });
    const vpc = new ec2.Vpc(stack, 'NewVpc', {
      cidr: '192.168.0.0/16'
    })   

    // create admin
    const clusterAdmin = new iam.Role(stack, 'AdminRole', {
      assumedBy: new iam.AccountRootPrincipal()
    })

    const cluster = new eks.Cluster(stack, 'EksCluster', {
      vpc,
      defaultCapacity: 1,
      mastersRole: clusterAdmin,
      defaultCapacityInstance: new InstanceType('t3.large'),
      outputClusterName: true,
    })
  }
}
