import cdk = require('@aws-cdk/core');
import { Vpc } from '@aws-cdk/aws-ec2';
import { Cluster, TaskDefinition, Compatibility, ContainerImage } from '@aws-cdk/aws-ecs'
import { ApplicationLoadBalancedFargateService } from '@aws-cdk/aws-ecs-patterns';

export class Ws4Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const app = new cdk.App();
    const env = {
      region: 'us-east-1',
      account: '374801192098'
    };

    const stack = new cdk.Stack(app, 'FargateAlbSvc', { env });
    const vpc = new Vpc(stack, 'NewVpc', {
      cidr: '192.168.0.0/16'
    })    
    const cluster = new Cluster(stack, 'Cluster', { vpc });

    const taskDefinition = new TaskDefinition(stack, 'Task', {
      compatibility: Compatibility.FARGATE,
      memoryMiB: '512',
      cpu: '256'
    });


    taskDefinition
      .addContainer('flask', {
        image: ContainerImage.fromRegistry('pahud/amazon-ecs-flask-sample'),
        // image: ContainerImage.fromAsset(path.join(__dirname, '../../python/flask-docker-app/')),
        environment: {
          'PLATFORM': `AWS Fargate(${stack.region})`
        }
      })
      .addPortMappings({
        containerPort: 5000
      });

    const svc = new ApplicationLoadBalancedFargateService(stack, 'FargateService', {
      cluster,
      taskDefinition
    });
  }
}
