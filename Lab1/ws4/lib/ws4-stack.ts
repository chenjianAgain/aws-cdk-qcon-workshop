import cdk = require('@aws-cdk/core');
import { Vpc, InstanceType } from '@aws-cdk/aws-ec2';
import { Cluster, TaskDefinition, Compatibility, ContainerImage } from '@aws-cdk/aws-ecs'
import { ApplicationLoadBalancedFargateService } from '@aws-cdk/aws-ecs-patterns';
import iam  = require('@aws-cdk/aws-iam');
import eks  = require('@aws-cdk/aws-eks');

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
    const vpc = Vpc.fromLookup(stack, 'EksStack/NewVpc', { isDefault: false})   
    
    
    // const cluster = new Cluster(stack, 'Cluster', { vpc });

    // const taskDefinition = new TaskDefinition(stack, 'Task', {
    //   compatibility: Compatibility.FARGATE,
    //   memoryMiB: '512',
    //   cpu: '256'
    // });


    // taskDefinition
    //   .addContainer('flask', {
    //     image: ContainerImage.fromRegistry('pahud/amazon-ecs-flask-sample'),
    //     // image: ContainerImage.fromAsset(path.join(__dirname, '../../python/flask-docker-app/')),
    //     environment: {
    //       'PLATFORM': `AWS Fargate(${stack.region})`
    //     }
    //   })
    //   .addPortMappings({
    //     containerPort: 5000
    //   });

    // const svc = new ApplicationLoadBalancedFargateService(stack, 'FargateService', {
    //   cluster,
    //   taskDefinition
    // });

    // EKS
    // create the admin role
    const clusterAdmin = new iam.Role(stack, 'AdminRole', {
      assumedBy: new iam.AccountRootPrincipal()
    });

    // eks cluster with ondemand default capacity
    const eksCluster = new eks.Cluster(stack, 'eksCluster', {
      vpc: vpc,
      defaultCapacity: 1,
      mastersRole: clusterAdmin,
      outputClusterName: true,
    });

    eksCluster.addCapacity('OnDemand', {
      maxCapacity: 1,
      instanceType: new InstanceType('t3.large'),
      bootstrapOptions: {
        kubeletExtraArgs: '--node-labels myCustomLabel=od'
      },
    })

    eksCluster.addCapacity('SpotGPU', {
      spotPrice: '12.2400',
      maxCapacity: 1,
      instanceType: new InstanceType('t3.large'),
      bootstrapOptions: {
        kubeletExtraArgs: '--node-labels NVIDIAGPU=1'
      },
    })

  }
}
