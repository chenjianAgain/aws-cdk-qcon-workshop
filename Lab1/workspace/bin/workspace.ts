#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { WorkspaceStack } from '../lib/workspace-stack';

const app = new cdk.App();
new WorkspaceStack(app, 'WorkspaceStack');
