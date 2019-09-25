/* eslint-disable no-unused-expressions */
import {expect, fixture} from '@open-wc/testing';

import '../src/fs-detail';

describe('detail test', () => {
    it('has by default an empty string as content', async () => {
        const el = await fixture('<fs-detail></fs-detail');

        expect(el.classification).to.equal(null);
    });
});
