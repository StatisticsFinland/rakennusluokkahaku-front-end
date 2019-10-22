/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */

import {expect, fixture, html} from '@open-wc/testing';
import sinon from 'sinon';

import '../src/fs-question';
import {questions, buildingClasses} from './data';

let element;
let postAnswerStub;
let getPreviousStub;

describe('question test', async () => {
    before(async () => {
        // inject function for testing
        const fetchQuestionStub = () => questions.shift();
        element = await fixture(html`<fs-question .fetchQuestion=${fetchQuestionStub}></fs-question>`);

        postAnswerStub = sinon.stub(element, 'postAnswer');
        getPreviousStub = sinon.stub(element, 'getPrevious');
    });

    it('gets initial question from backend', async () => {
        expect(element.question).to.be.not.equal(null);
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
        postAnswerStub.returns({
            building_classes: buildingClasses,
            new_question: questions[1],
            success: true,
        });

        expect(element.reply).to.be.equal(null);
        const okButton = element.shadowRoot.querySelector('.ok');
        await okButton.click();

        expect(element.reply).to.be.not.equal(null);

        const buttons = element.shadowRoot.querySelectorAll('button');

        expect(buttons.length).to.equal(4);
        expect(element.qNumber).to.be.equal(3);
    });

    it('back button works as intended', async () => {
        getPreviousStub.returns({
            new_question: questions.shift(),
        });
        const backButton = element.shadowRoot.querySelector('.previous');
        await backButton.click();

        expect(element.qNumber).to.be.equal(2);

        await backButton.click();

        expect(element.qNumber).to.be.equal(1);

        const buttons = element.shadowRoot.querySelectorAll('button');

        expect(buttons.length).to.equal(3);
    });

    it('question changes after answer is provided', async () => {
        postAnswerStub.returns({
            building_classes: buildingClasses,
            new_question: questions.shift(),
            success: true,
        });
        const question = element.question.attribute_name;
        const noButton = element.shadowRoot.querySelector('.no');
        await noButton.click();

        expect(element.question.attribute_name).to.be.not.equal(question);
    });

    it('provides new question with skip', async () => {
        postAnswerStub.returns({
            building_classes: buildingClasses,
            new_question: questions.shift(),
            success: true,
        });
        const question = element.question.attribute_name;
        const skipButton = element.shadowRoot.querySelector('.skip');
        await skipButton.click();

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
