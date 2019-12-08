/* eslint-disable no-unused-expressions */
import {expect, fixture} from '@open-wc/testing';
import sinon from 'sinon';
import {sleep, mockResponse} from './util';

import '../src/fs-detail';
import {simpleClassification, complexClassification} from './mocks/detail';

let element;
let fetchStub;

describe('Detail element tests', () => {
    before(async () => {
        element = await fixture('<fs-detail></fs-detail>');
        await sleep(100);
    });

    it('default classification is null', () => {
        expect(element.classification).to.equal(null);
    });

    it('is hidden initially', () => {
        expect(element.hidden).to.equal(true);
    });

    it('renders correctly when it contains data', () => {
        element.updateDetail(simpleClassification);

        const nameh3 = element.shadowRoot.querySelector('h3');
        const includes = element.shadowRoot.querySelector('.includes');

        expect(element.hidden).to.equal(false);
        expect(nameh3).to.contain.html('0110 Omakotitalot');
        expect(includes).to.equal(null);
    });

    it('renders all fields correctly', () => {
        element.updateDetail(complexClassification);
        const sr = element.shadowRoot;

        expect(sr.querySelector('.note')).to.contain.html('Pientalot, joissa on yksi asuinhuoneisto.');
        expect(sr.querySelector('.includes')).to.contain.html('pientalot');
        expect(sr.querySelector('.excludes')).to.contain.html('kerrostalot');
        expect(sr.querySelector('.includesAlso')).to.contain.html('luhtitalot');
        expect(sr.querySelector('.keywords')).to.contain.html('townhouse-talo');
        expect(sr.querySelector('.feedback')).to.contain.html('Oliko tämä hakemanne luokka?');
    });

    it('no button doesn\'t call fetch', () => {
        const fetchSpy = sinon.spy(window, 'fetch');
        const noButton = element.shadowRoot.querySelector('.no');
        noButton.click();

        expect(fetchSpy.called).to.equal(false);
    });

    after(() => {
        window.fetch.restore();
    });
});

describe('Feedback test run', () => {
    before(async () => {
        fetchStub = sinon.stub(window, 'fetch').resolves(mockResponse);
        element = await fixture('<fs-detail></fs-detail>');
    });

    it('attaches event listeners to buttons', () => {
        element.updateDetail(complexClassification);
        const okButton = element.shadowRoot.querySelector('.ok');
        const okSpy = sinon.spy(okButton, 'addEventListener');

        const noButton = element.shadowRoot.querySelector('.no');
        const noSpy = sinon.spy(noButton, 'addEventListener');

        element.addEventListeners();

        expect(okSpy.calledWith('click')).to.equal(true);
        expect(noSpy.calledWith('click')).to.equal(true);
    });

    it('Doesn\'t fully hide the buttons if no is clicked', () => {
        const noButton = element.shadowRoot.querySelector('.no');
        noButton.click();

        expect(element.shadowRoot.querySelector('.feedback')).to.contain.html('Kiitos palautteestanne!');

        element.render();

        expect(element.shadowRoot.querySelectorAll('button').length).to.equal(2);
        expect(element.answered).to.equal(false);
    });

    it('sends POST request on yes-click and sends endSession-event', () => {
        expect(fetchStub.called).to.equal(false);


        const eventspy = sinon.spy();
        element.addEventListener('endSession', eventspy);

        const okButton = element.shadowRoot.querySelector('.ok');
        okButton.click();

        expect(fetchStub.called).to.equal(true);
        expect(eventspy.called).to.equal(true);

        const c = complexClassification.detail;

        const expectedArgs = {
            response: 'yes',
            class_id: c.code,
            class_name: c.name,
        };

        expect(fetchStub.args[0][1].body).to.equal(JSON.stringify(expectedArgs));
    });

    it('doesn\'t render buttons after feedback given', () => {
        const buttons = element.shadowRoot.querySelectorAll('button');

        expect(buttons.length).to.equal(0);
    });

    it('has feedback text instead of buttons', () => {
        expect(element.shadowRoot.querySelector('.feedback')).to.contain.html('Kiitos palautteestanne!');
    });

    it('doesn\'t draw anything on re-render', () => {
        element.render();
        const fb = element.shadowRoot.querySelector('.feedback');

        expect(element.answered).to.equal(true);
        expect(fb).to.equal(null);
    });

    after(() => {
        window.fetch.restore();
    });
});

describe('Language tests', () => {
    describe('.language', () => {
        it('is bound to the `language` attribute', async () => {
            const el = await fixture('<fs-detail language="sv"></fs-detail>');

            expect(el.language).to.eq('sv');
        });
    });

    describe('changes button and text language correctly', async () => {
        it('to English', async () => {
            element = await fixture('<fs-detail language="en"></fs-detail>');

            await sleep(100);

            element.updateDetail(complexClassification);
            const sr = element.shadowRoot;

            const okButton = sr.querySelector('.ok');

            expect(okButton.textContent).to.eq('Yes');
            expect(sr.querySelector('.no').textContent).to.eq('No');
            expect(sr.querySelector('.feedback')).to.contain.html('Is this the building class you are looking for?');
            expect(sr.querySelector('.white')).to.contain.html('Excludes');
            expect(sr.querySelector('.white')).to.contain.html('Includes');
            expect(sr.querySelector('.white')).to.contain.html('Also includes');
            expect(sr.querySelector('.white')).to.contain.html('Keywords');

            okButton.click();

            expect(element.shadowRoot.querySelector('.feedback')).to.contain.html('Thank you for your feedback!');
        });

        it('to Swedish', async () => {
            element = await fixture('<fs-detail language="sv"></fs-detail>');

            await sleep(100);

            element.updateDetail(complexClassification);
            const sr = element.shadowRoot;

            const okButton = sr.querySelector('.ok');

            expect(okButton.textContent).to.eq('Ja');
            expect(sr.querySelector('.no').textContent).to.eq('Nej');
            expect(sr.querySelector('.feedback')).to.contain.html('Är detta byggnadsklassen ni var ute efter?');
            expect(sr.querySelector('.white')).to.contain.html('Innehåller ej');
            expect(sr.querySelector('.white')).to.contain.html('Innehåller');
            expect(sr.querySelector('.white')).to.contain.html('Innehåller också');
            expect(sr.querySelector('.white')).to.contain.html('Nyckelord');

            okButton.click();

            expect(element.shadowRoot.querySelector('.feedback')).to.contain.html('Tack för responsen!');
        });
    });
});
