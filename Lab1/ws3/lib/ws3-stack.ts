import cdk = require('@aws-cdk/core');
import ec2 = require('@aws-cdk/aws-ec2');

import ecs = require('@aws-cdk/aws-ecs');
import ecsPatterns = require('@aws-cdk/aws-ecs-patterns')

export class Ws3Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const vpc = new ec2.Vpc(this, 'NewVpc', {
      cidr: '192.168.0.0/16',
      natGateways: 1
    })
    const cluster = new ecs.Cluster(this, 'Cluser', {vpc})

    const taskDefinition = new ecs.Ec2TaskDefinition(this, 'Task', {
    })

    const web = taskDefinition.addContainer('web', {
      image: ecs.ContainerImage.fromRegistry("amazon/amazon-ecs-sample"),
    }) 

    new ecsPatterns.ApplicationLoadBalancedEc2Service(this, 'Service4', {
      cluster,
      taskDefinition
    });
  }
}
