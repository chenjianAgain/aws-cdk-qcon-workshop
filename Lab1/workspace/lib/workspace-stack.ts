import cdk = require('@aws-cdk/core');
import ec2 = require('@aws-cdk/aws-ec2');
import ecs = require('@aws-cdk/aws-ecs');
import ecsPatterns = require('@aws-cdk/aws-ecs-patterns');

export class WorkspaceStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    const vpc = new ec2.Vpc(this, 'NewVpc', {
      cidr: '172.16.0.0/16',
      natGateways: 1
    })

    const cluster = new ecs.Cluster(this, 'Cluster', {vpc})

    const cluster3 = new ecs.Cluster(this, 'Cluster3', {vpc})

    const taskDefinition = new ecs.FargateTaskDefinition(this, 'Task', {
      memoryLimitMiB: 512,
      cpu: 256
    })

    const web = taskDefinition.addContainer('web', {
      // image: ecs.ContainerImage.fromRegistry('nginx'),
      image: ecs.ContainerImage.fromAsset('../flask-docker-app'),
      environment: {
        'PLATFORM': 'AWS Fargate--3'
      }
    })

    web.addPortMappings({
      // containerPort: 80
      containerPort: 5000
    })

    new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'Svc', {
      cluster,
      taskDefinition
    })



  }
}