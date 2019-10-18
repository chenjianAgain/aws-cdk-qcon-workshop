#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { Ws2Stack } from '../lib/ws2-stack';

const app = new cdk.App();
new Ws2Stack(app, 'Ws2Stack');
