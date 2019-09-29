/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import {expect, fixture} from '@open-wc/testing';
import sinon from 'sinon';

import '../src/fs-list';

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

let elem;

describe('List element test suite', () => {
    before(async () => {
        elem = await fixture('<fs-list></fs-list>');
    });

    it('is hidden until there are results to show', () => {
        expect(elem.hidden).to.be.equal(true);
    });

    it('finds data from api', async () => {
        expect(elem.data).to.be.equal(null);
        await sleep(1000);

        expect(elem.data).to.be.not.equal(null);
    });

    it('renders 10 list items after fetch', () => {
        const lis = elem.shadowRoot.querySelectorAll('li');
        expect(lis.length).to.be.equal(10);
    });


    
    it('sends detail event on click', async () => {
        const eventspy = sinon.spy();
        elem.addEventListener('showDetails', eventspy);

        const li = elem.shadowRoot.querySelector('li');
        li.click()
        expect(eventspy.called).to.equal(true);
    });
    
});
