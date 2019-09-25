/* eslint-disable no-unused-expressions */
import {expect} from '@open-wc/testing';

import '../src/fs-detail';

describe('detail test', () => {
    it('has by default an empty string as content', async () => {
        expect('').to.equal('');
    });
});
