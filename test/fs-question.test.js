/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */

import {expect, fixture} from '@open-wc/testing';
import sinon from 'sinon';

import '../src/fs-question';
import {questions, buildingClasses, mockResponse} from './data';

let element;
let fetchSimpleStub;

describe('question test', async () => {
    beforeEach(async () => {
        fetchSimpleStub = sinon.stub(window, 'fetch')
            .onCall(0).resolves(mockResponse(questions[0]))
            .onCall(1).resolves(mockResponse({
                type: 'simple',
                building_classes: buildingClasses,
                new_question: questions[1],
                success: true,
            }));
        element = await fixture('<fs-question></fs-question>');
        // Give the component some time
        // to fetch from the stub before running any test
        await sleep(100);
    });

    afterEach(() => {
        window.fetch.restore();
    });

    it('gets initial question from backend', async () => {
        expect(element.question).to.have.keys(['attribute_id', 'attribute_name', 'attribute_question', 'type']);
    });

    it('starts counting correctly', async () => {
        expect(element.qNumber).to.be.equal(1);
    });

    it('has three answer buttons', () => {
        const buttons = element.shadowRoot.querySelectorAll('button');

        expect(buttons.length).to.equal(3);
    });

    it('event listener added to buttons', () => {
        const okButton = element.shadowRoot.querySelector('.ok');
        const okSpy = sinon.spy(okButton, 'addEventListener');

        const noButton = element.shadowRoot.querySelector('.no');
        const noSpy = sinon.spy(noButton, 'addEventListener');

        const skipButton = element.shadowRoot.querySelector('.skip');
        const skipSpy = sinon.spy(skipButton, 'addEventListener');
        element.addEventListeners();

        expect(okSpy.calledWith('click')).to.equal(true);
        expect(noSpy.calledWith('click')).to.equal(true);
        expect(skipSpy.calledWith('click')).to.equal(true);
    });

    it('it should dispatch event', () => {
        const eventspy = sinon.spy();
        element.addEventListener('updateScores', eventspy);
        element.reply = {
            new_question: [],
            building_classes: [],
        };

        element.updateClasses();

        expect(eventspy.called).to.equal(true);
        element.reply = null;
    });

    it('gets reply from backend, adds back button and keeps counting correctly', async () => {
        let buttons = element.shadowRoot.querySelectorAll('button');

        expect(element.reply).to.be.equal(null);
        expect(buttons.length).to.equal(3);
        expect(element.qNumber).to.be.equal(1);

        const okButton = element.shadowRoot.querySelector('.ok');
        okButton.click();
        await sleep(200);

        buttons = element.shadowRoot.querySelectorAll('button');

        expect(element.reply).to.be.not.equal(null);
        expect(buttons.length).to.equal(4);
        expect(element.qNumber).to.be.equal(2);
    });

    it('back button works as intended', async () => {
        await sleep(100);
        const okButton = element.shadowRoot.querySelector('.ok');
        okButton.click();
        await sleep(100);

        fetchSimpleStub.resolves(mockResponse(questions[0]));

        const backButton = element.shadowRoot.querySelector('.previous');
        backButton.click();
        await sleep(100);

        const buttons = element.shadowRoot.querySelectorAll('button');

        expect(element.qNumber).to.be.equal(1);
        expect(buttons.length).to.equal(3);
    });

    it('question changes after answer is provided', async () => {
        await sleep(100);
        const question = element.question.attribute_name;
        const noButton = element.shadowRoot.querySelector('.no');
        noButton.click();
        await sleep(100);

        expect(element.question.attribute_name).to.be.not.equal(question);
    });

    it('provides new question with skip', async () => {
        await sleep(100);
        const question = element.question.attribute_name;
        const skipButton = element.shadowRoot.querySelector('.skip');
        skipButton.click();
        await sleep(100);

        expect(element.question.attribute_name).to.be.not.equal(question);
    });

    it('Renders attribute_name based question string from reply', () => {
        const q = {
            type: 'simple',
            attribute_name: 'Kirjasto',
            attribute_id: '0240',
        };
        element.question = q;
        element.render();

        const questionText = element.shadowRoot.querySelector('.question');

        expect(questionText).to.contain.html('Onko rakennuksessa Kirjasto?');
        expect(questionText).to.not.contain.html('Erillinen kysymys?');
    });

    it('Renders the optional question string from reply', () => {
        const q = {
            type: 'simple',
            attribute_name: 'Sauna',
            attribute_id: '0110',
            attribute_question: 'Erillinen kysymys?',
        };
        element.question = q;
        element.render();

        const questionText = element.shadowRoot.querySelector('.question');

        expect(questionText).to.contain.html('Erillinen kysymys?');
        expect(questionText).to.not.contain.html('Sauna');
    });
});

const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
