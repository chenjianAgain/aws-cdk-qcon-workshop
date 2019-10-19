#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { CreateVpcStack } from '../lib/create_vpc-stack';
import { Eks } from '../lib/eks';
import { Ecs } from '../lib/ecs';

const app = new cdk.App();
const createvpc = new CreateVpcStack(app, 'CreateVpcStack');
const eks = new Eks(app, 'abc');
const ecs = new Ecs(app, 'ecs');

