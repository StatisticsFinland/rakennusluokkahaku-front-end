/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */

import {expect, fixture} from '@open-wc/testing';
import sinon from 'sinon';

import '../src/fs-question';

let element;

describe('question test', async () => {
    before(async () => {
        element = await fixture('<fs-question></fs-question');
    });

    it('gets initial question from backend', async () => {
        expect(element.question).to.be.equal(null);
        await sleep(1000);

        expect(element.question).to.be.not.equal(null);
    });

    it('has two answer buttons', async () => {
        const buttons = element.shadowRoot.querySelectorAll('button');

        expect(buttons.length).to.equal(2);
    });

    it('event listener added to button', async () => {
        const okButton = element.shadowRoot.querySelector('.ok');
        const buttonClickSpy = sinon.spy(okButton, 'addEventListener');
        element.addEventListeners();

        expect(buttonClickSpy.calledWith('click')).to.equal(true);
    });

    it('it should dispatch event', async () => {
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

    it('gets reply from backend', async () => {
        expect(element.reply).to.be.equal(null);
        const okButton = element.shadowRoot.querySelector('.ok');
        okButton.click();
        await sleep(1500);

        expect(element.reply).to.be.not.equal(null);
    });

    it('question changes after answer is provided', async () => {
        const question = element.question.attribute_name;
        const noButton = element.shadowRoot.querySelector('.no');
        noButton.click();
        await sleep(1500);

        expect(element.question.attribute_name).to.be.not.equal(question);
    });

    it('can update question', async () => {
        element.question = 'foo';

        expect(element.question).to.equal('foo');
    });
});

const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
