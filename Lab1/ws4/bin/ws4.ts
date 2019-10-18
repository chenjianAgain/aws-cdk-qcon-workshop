#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { Ws4Stack } from '../lib/ws4-stack';

const app = new cdk.App();
new Ws4Stack(app, 'Ws4Stack');
