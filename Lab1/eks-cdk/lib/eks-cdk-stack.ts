import { App, Construct, Stack, StackProps } from '@aws-cdk/core';
import { Role, AccountRootPrincipal} from '@aws-cdk/aws-iam';
import { ImagePullPrincipalType } from '@aws-cdk/aws-codebuild';
import { Cluster, EksOptimizedImage } from '@aws-cdk/aws-eks';
import { InstanceType, Vpc } from '@aws-cdk/aws-ec2';

export class EksCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const app = new App();
    const env = {
      region: 'us-east-1',
      account: '374801192098'
    };

    // vpc create stack

    
    // eks cfn stack
    const eksStack = new Stack(app, 'EksStack', { env });
    const vpc = Vpc.fromLookup(eksStack, 'EksStack/NewVpc', { isDefault: false});  

    // create admin
    const clusterAdmin = new Role(eksStack, 'AdminRole', {
      assumedBy: new AccountRootPrincipal()
    })

    const cluster = new Cluster(eksStack, 'EksCluster', {
      vpc,
      defaultCapacity: 1,
      mastersRole: clusterAdmin,
      defaultCapacityInstance: new InstanceType('t3.large'),
      outputClusterName: true,
    })
  }
}
