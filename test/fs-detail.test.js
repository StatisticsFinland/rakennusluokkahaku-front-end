/* eslint-disable no-unused-expressions */
import {expect, fixture} from '@open-wc/testing';

import '../src/fs-detail';

let el;

describe('Detail element tests', () => {
    before(async () => {
        el = await fixture('<fs-detail></fs-detail>');
    });

    it('default classification is null', async () => {
        expect(el.classification).to.equal(null);
    });

    it('renders correctly', async () => {
        expect(el).shadowDom.to.equal(`
        <style>
        div {
            border: 1px solid #c5c5c5;
            width: 30%;
        }
        </style>
        `);
    });

    it('renders correctly when it contains data', async () => {
        const thingy = {
            code: '1234',
            classificationItemNames: [
                {name: 'things'},
            ],
            explanatoryNotes: [
                {
                    generalNote: [
                        'Pientalot, joissa on yksi asuinhuoneisto.',
                    ],
                },
            ],
        };
        const data = {
            detail: thingy,
        };
        el.updateDetail(data);

        expect(el).shadowDom.to.equal(`
        <style>
        div {
            border: 1px solid #c5c5c5;
            width: 30%;
        }
        </style>
        <div>
          <h3>
            1234 things
          </h3>
          <ul>
            <li>
              Pientalot, joissa on yksi asuinhuoneisto.
            </li>
          </ul>
        </div>
        `);
    });
});
