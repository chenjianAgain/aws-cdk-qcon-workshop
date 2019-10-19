import cdk = require('@aws-cdk/core');
import { InstanceType, Vpc } from '@aws-cdk/aws-ec2';
import { Cluster, TaskDefinition, ContainerImage, Compatibility } from '@aws-cdk/aws-ecs';
import { ApplicationLoadBalancedEc2Service } from '@aws-cdk/aws-ecs-patterns';

export class Eks extends cdk.Stack {
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
    cluster.addCapacity('AsgSpot1', {
      maxCapacity: 1,
      minCapacity: 1,
      desiredCapacity: 1,
      instanceType: new InstanceType('c5.xlarge'),
      spotPrice: '0.2722',
      spotInstanceDraining: true
    });

    cluster.addCapacity('AsgSpot2', {
      maxCapacity: 1,
      minCapacity: 1,
      desiredCapacity: 1,
      instanceType: new InstanceType('c5.large'),
      spotPrice: '0.2333',
      spotInstanceDraining: true
    });

    cluster.addCapacity('AsgOd', {
      maxCapacity: 2,
      minCapacity: 1,
      desiredCapacity: 1,
      instanceType: new InstanceType('t3.large'),
    })

    const taskDefinition = new TaskDefinition(this, 'Task', {
      compatibility: Compatibility.EC2,
      memoryMiB: '512',
      cpu: '256'
    })

    taskDefinition
      .addContainer('flask', {
        image: ContainerImage.fromRegistry('pahud/amazon-ecs-flask-sample'),
        memoryReservationMiB: 512,
        environment: {
          PLATFORM: 'Amazon ECS'
        },
      })
      .addPortMappings({
        containerPort: 5000
      });

    const webSvc = new ApplicationLoadBalancedEc2Service(this, 'webSvc', {
      cluster,
      taskDefinition,
      desiredCount: 3,
    })

    new cdk.CfnOutput(this, 'ALBSvcURL', {
      value: `http://${webSvc.loadBalancer.loadBalancerDnsName}`
    })
  }
}
