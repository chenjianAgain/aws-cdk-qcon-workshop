#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { CjwsStack } from '../lib/cjws-stack';

const app = new cdk.App();
new CjwsStack(app, 'CjwsStack');
