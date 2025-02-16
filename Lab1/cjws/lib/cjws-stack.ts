import cdk = require('@aws-cdk/core');
import { Construct, Stack } from "@aws-cdk/core";
import ec2 = require('@aws-cdk/aws-ec2');

import ecs = require('@aws-cdk/aws-ecs');
import ecsPatterns = require('@aws-cdk/aws-ecs-patterns')

export class CjwsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const vpc = new ec2.Vpc(this, 'NewVpc', {
      cidr: '172.16.0.0/16',
      natGateways: 1
    })
    const cluster = new ecs.Cluster(this, 'Cluser', {vpc})

    const taskDefinition = new ecs.FargateTaskDefinition(this, 'Task', {
      memoryLimitMiB: 512,
      cpu: 256,
    })

    const web = taskDefinition.addContainer('web', {
      image: ecs.ContainerImage.fromRegistry("amazon/amazon-ecs-sample"),
    }) 

    new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'Service4', {
      cluster,
      taskDefinition
    });

    new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'Service3', {
      cluster,
      taskDefinition
    });

  }
}
