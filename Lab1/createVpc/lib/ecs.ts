import cdk = require('@aws-cdk/core');
import { InstanceType, Vpc } from '@aws-cdk/aws-ec2';
import { Cluster } from '@aws-cdk/aws-ecs';

export class Ecs extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const app = new cdk.App();
    const env = {
      region: 'us-west-2',
      account: '374801192098'
    };
    const stack = new cdk.Stack(app, 'eks', { env });
    const vpc = Vpc.fromLookup(stack, 'defaultstack/defaultvpc', { isDefault: false })
    
    const cluster = new Cluster(stack, 'cluster', { vpc });
  }
}
