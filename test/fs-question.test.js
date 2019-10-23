/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */

import {expect, fixture} from '@open-wc/testing';
import sinon from 'sinon';

import '../src/fs-question';
import {questions, buildingClasses, mockResponse} from './data';

let element;
let fetchStub;

describe('question test', async () => {
    beforeEach(async () => {
        fetchStub = sinon.stub(window, 'fetch')
            .onCall(0).resolves(mockResponse(questions[0]))
            .onCall(1).resolves(mockResponse({
                building_classes: buildingClasses,
                new_question: questions[1],
                success: true,
            }));
        element = await fixture('<fs-question></fs-question>');
    });

    afterEach(() => {
        window.fetch.restore();
    });

    it('gets initial question from backend', async () => {
        expect(element.question).to.be.not.undefined;
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

    it('gets reply from backend, adds back button and keeps counting correctly', () => {
        expect(element.reply).to.be.equal(null);
        const okButton = element.shadowRoot.querySelector('.ok');
        okButton.click();

        expect(element.reply).to.be.not.equal(null);

        const buttons = element.shadowRoot.querySelectorAll('button');

        expect(buttons.length).to.equal(4);
        expect(element.qNumber).to.be.equal(3);
    });

    it('back button works as intended', () => {
        const okButton = element.shadowRoot.querySelector('.ok');
        const buttons = element.shadowRoot.querySelectorAll('button');
        okButton.click();

        expect(element.qNumber).to.be.equal(2);
        expect(buttons.length).to.equal(4);

        fetchStub.resolves(mockResponse(questions[0]));

        const backButton = element.shadowRoot.querySelector('.previous');
        backButton.click();

        expect(element.qNumber).to.be.equal(1);
        expect(buttons.length).to.equal(3);
    });

    it('question changes after answer is provided', () => {
        const question = element.question.attribute_name;
        const noButton = element.shadowRoot.querySelector('.no');
        noButton.click();

        expect(element.question.attribute_name).to.be.not.equal(question);
    });

    it('provides new question with skip', () => {
        const question = element.question.attribute_name;
        const skipButton = element.shadowRoot.querySelector('.skip');
        skipButton.click();

        expect(element.question.attribute_name).to.be.not.equal(question);
    });

    it('Renders attribute_name based question string from reply', () => {
        const q = {
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
