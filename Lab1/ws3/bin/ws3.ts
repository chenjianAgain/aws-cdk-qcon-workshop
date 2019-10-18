#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { Ws3Stack } from '../lib/ws3-stack';

const app = new cdk.App();
new Ws3Stack(app, 'Ws3Stack');
