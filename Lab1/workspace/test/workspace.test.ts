import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import cdk = require('@aws-cdk/core');
import Workspace = require('../lib/workspace-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Workspace.WorkspaceStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});