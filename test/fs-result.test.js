/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import {expect, fixture} from '@open-wc/testing';
import sinon from 'sinon';

import '../src/fs-result';
import {classifications} from './mocks/result';
import {sleep, mockResponse} from './util';

let elem;
let testData;

describe('Result element test suite', () => {
    before(async () => {
        sinon.stub(window, 'fetch').resolves(mockResponse(classifications));

        elem = await fixture('<fs-result></fs-result>');
        testData = classifications.map((item, i) => {
            return {
                class_name: item.classificationItemNames[0].name,
                class_id: item.code,
                score: i,
            };
        });
    });

    after(() => {
        window.fetch.restore();
    });

    it('has fetched data', () => {
        expect(elem.data).to.not.equal(null);
    });

    it('updates list based on scores', () => {
        // construct some test data
        const data = [...testData];
        const event = {
            detail: {
                building_classes: data,
            },
        };
        elem.updateScores(event);
        const firstRow = elem.shadowRoot.querySelector('td');

        // 0512 is the last one on the list
        // so it has highest score so it should be the first one displayed
        expect(firstRow.id).to.equal('id0512');
    });

    it('sends complex objects correctly', () => {
        // generate test data
        const data = [...testData];
        // 0512 has fields ex ja inca so we want it on top of list
        data.find((item) => item.class_id === '0512').score = 999;
        const event = {
            detail: {
                building_classes: data,
            },
        };
        elem.updateScores(event);
        const firstRow = elem.shadowRoot.querySelector('td');
        // check we got the correct one
        expect(firstRow.id).to.equal('id0512');

        const eventspy = sinon.spy();
        elem.addEventListener('showDetails', eventspy);
        firstRow.click();

        expect(eventspy.called).to.equal(true);
    });

    it('does not render results if less than 6 questions asked and no probability is higher than 20%', () => {
        // generate test data
        const data = [...testData];
        data.forEach((one) => one.score = 0.19);
        const event = {
            detail: {
                building_classes: data,
                question_number: 5,
            },
        };
        elem.updateScores(event);
        const results = elem.shadowRoot.querySelector('.results');

        expect(results).to.equal(null);
    });

    it('instead renders instructions', () => {
        const instructions = elem.shadowRoot.querySelector('.blue').textContent;

        expect(instructions).to.contain(elem.instructionText[0]);
        expect(instructions).to.contain(elem.instructionText[1]);
    });

    it('renders 10 rows if 6 questions asked', () => {
        // generate test data
        const data = [...testData];
        data.forEach((one) => one.score = 0.19);
        const event = {
            detail: {
                building_classes: data,
                question_number: 6,
            },
        };
        elem.updateScores(event);
        const rows = elem.shadowRoot.querySelectorAll('tr');

        expect(rows.length).to.be.equal(10);
    });

    it('renders 10 rows if there is probability higher than 20%', () => {
        // generate test data
        const data = [...testData];
        data.forEach((one) => one.score = 0.19);
        data[0].score = 0.2;
        const event = {
            detail: {
                building_classes: data,
                question_number: 5,
            },
        };
        elem.updateScores(event);
        const rows = elem.shadowRoot.querySelectorAll('tr');

        expect(rows.length).to.be.equal(10);
    });

    it('sends detail event on click', () => {
        const eventspy = sinon.spy();
        elem.addEventListener('showDetails', eventspy);

        const firstRow = elem.shadowRoot.querySelector('td');
        firstRow.click();

        expect(firstRow).to.have.class('selected');
        expect(eventspy.called).to.equal(true);
    });
});

describe('Language tests', () => {
    describe('.language', () => {
        let el;
        let fetchStub;

        before(async () => {
            fetchStub = sinon.stub(window, 'fetch').resolves(mockResponse(classifications));
            el = await fixture('<fs-result language="en"></fs-result>');
        });

        after(() => {
            window.fetch.restore();
        });

        it('is bound to the `language` attribute', async () => {
            expect(el.getAttribute('language')).to.eq('en');
            expect(el.language).to.eq('en');
        });

        it('is used when fetching classifications', async () => {
            const url = 'https://data.stat.fi/api/classifications/v1/classifications/rakennus_1_20180712/classificationItems?content=data&meta=max&lang=';

            expect(fetchStub.calledWith(url + 'en')).to.equal(true);
            el = await fixture('<fs-result language="sv"></fs-result>');

            expect(fetchStub.calledWith(url + 'sv')).to.equal(true);
        });
    });

    describe('changes header text language correctly', async () => {
        beforeEach(async () => {
            sinon.stub(window, 'fetch').resolves(mockResponse(classifications));
        });

        afterEach(() => {
            window.fetch.restore();
        });

        it('to English', async () => {
            const el = await fixture('<fs-result language="en"></fs-result>');

            await sleep(100);
            const event = {
                detail: {
                    building_classes: testData,
                    question_number: 6,
                },
            };
            el.updateScores(event);

            expect(el.shadowRoot.querySelector('.blue').textContent).to.contain('Results');
        });

        it('to Swedish', async () => {
            const el = await fixture('<fs-result language="sv"></fs-result>');

            await sleep(100);
            const event = {
                detail: {
                    building_classes: testData,
                    question_number: 6,
                },
            };
            el.updateScores(event);

            expect(el.shadowRoot.querySelector('.blue').textContent).to.contain('Resultat');
        });
    });
});


