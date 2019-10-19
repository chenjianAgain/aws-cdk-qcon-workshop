import cdk = require('@aws-cdk/core');
import { InstanceType, Vpc } from '@aws-cdk/aws-ec2';

export class CreateVpcStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const app = new cdk.App();
    const env = {
      region: 'us-west-2',
      account: '374801192098'
    };
    const stack = new cdk.Stack(app, 'defaultstack', { env });
    const vpc = new Vpc(stack, 'defaultvpc', { 
      cidr: '172.17.0.0/16',
      natGateways: 1
    })
  }
}
