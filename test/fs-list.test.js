/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import {expect, fixture, defineCE} from '@open-wc/testing';
import sinon from 'sinon';

import FsList from '../src/fs-list';
import {classifications} from './data';

let elem;
let apiData;

describe('List element test suite', () => {
    before(async () => {
        // override fetchData
        const component = defineCE(class extends FsList {
            async fetchData() {
                return classifications;
            }
        });

        elem = await fixture(`<${component}></${component}>`);
        apiData = elem.data;
    });

    it('has fetched data', () => {
        expect(elem.data).to.not.equal(null);
    });

    it('renders 10 list items after fetch', () => {
        const lis = elem.shadowRoot.querySelectorAll('li');

        expect(lis.length).to.be.equal(10);
    });


    it('sends detail event on click', () => {
        const eventspy = sinon.spy();
        elem.addEventListener('showDetails', eventspy);

        const li = elem.shadowRoot.querySelector('li');
        li.click();

        expect(li).to.have.class('selected');
        expect(eventspy.called).to.equal(true);
    });

    it('updates list based on scores', () => {
        // construct some test data
        let data = apiData.filter((item) => item.level === 3 && item.code !== '1919');
        data = data.map((item, i) => {
            return {
                class_name: item.classificationItemNames[0].name,
                class_id: item.code,
                score: i,
            };
        });
        // add a duplicate
        data.push({class_id: '0512', class_name: 'asd', score: 0});
        const event = {
            detail: data,
        };
        elem.updateScores(event);
        const li = elem.shadowRoot.querySelector('li');

        // 0512 is the last one on the list
        // so it has highest score so it should be the first one displayed
        expect(li.id).to.equal('id0512');
    });

    it('sends complex objects correctly', () => {
        // generate test data
        let data = apiData.filter((item) => item.level === 3 && item.code !== '1919');
        data = data.map((item, i) => {
            return {
                class_name: item.classificationItemNames[0].name,
                class_id: item.code,
                score: i,
            };
        });
        // 0512 has fields ex ja inca so we want it on top of list
        data.find((item) => item.class_id === '0512').score = 999;
        const event = {
            detail: data,
        };
        elem.updateScores(event);
        const li = elem.shadowRoot.querySelector('li');
        // check we got the correct one
        expect(li.id).to.equal('id0512');

        const eventspy = sinon.spy();
        elem.addEventListener('showDetails', eventspy);
        li.click();

        expect(eventspy.called).to.equal(true);
    });
});
