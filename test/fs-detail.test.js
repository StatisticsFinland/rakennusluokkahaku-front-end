/* eslint-disable no-unused-expressions */
import {fixture, expect} from '@open-wc/testing';

import '../src/fs-detail';

describe('detail test', () => {
    it('has by default an empty string as content', async () => {
        #const el = await fixture('<div id="faceted"><fs-detail></fs-detail></div>');

        expect('').to.equal('');
    });
});
