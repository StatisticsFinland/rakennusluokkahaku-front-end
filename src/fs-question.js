const baseUrl = 'http://rakennusluokkahaku.westeurope.cloudapp.azure.com/';

class FsQuestion extends HTMLElement {
    constructor() {
        super();
        this.question = null;
        this.reply = null;
        this.language = 'fi';
        this.qNumber = 1;
        const parentDiv = document.getElementById('faceted');
        if (parentDiv) {
            parentDiv.addEventListener('endSession', this.endSession.bind(this));
        }
    }
    // Called after constructor
    async connectedCallback() {
        const data = await this.fetchQuestion();
        this.question = data;
        this.setLanguage();
        this.render();
    }
    // Base html template
    get template() {
        return `
        <div class="comp">
          <p class="question">
            ${this.qNumber}. ${this.questionString}
            ${this.question.attribute_tooltip ? this.tooltipTemplate(this.question.attribute_tooltip) : ''}
          </p>
          ${this.question.type === 'multi' ? this.multiTemplate : this.simpleTemplate}
        </div>
        `;
    }
    // Template for single questions
    get simpleTemplate() {
        return `
            <div class="button-container">
                <button class="ok" tabindex=0>${this.yesText}</button>
                <button class="no" tabindex=0>${this.noText}</button>
                <button class="skip" tabindex=0>${this.skipText}</button>
                ${this.qNumber !== 1 ? `<button class="previous" tabindex=0>${this.previousText}</button>` : ''}
            </div>
        `;
    }
    // Template for multiple questions
    get multiTemplate() {
        // Check if there is any tooltips
        const tooltips = this.question.attributes.find((attr) => attr.attribute_tooltip) !== undefined;
        const tableRows = this.question.attributes.map((attr) => {
            const radioName = `radio${attr.attribute_id}`;
            return `
            <tr id="attr${attr.attribute_id}">
                <td>${attr.attribute_name}</td>
                ${!tooltips ? '' : attr.attribute_tooltip ? '<td>' + this.tooltipTemplate(attr.attribute_tooltip) + '</td>' : '<td></td>'}
                <td>
                    <label class="container">
                        <input type="radio" id="${radioName}y" name="${radioName}" value="yes">
                        <span class="checkmark"></span>
                    </label>
                </td>
                <td>
                    <label class="container">
                        <input type="radio" id="${radioName}s" name="${radioName}" value="skip" checked>
                        <span class="checkmark"></span>
                    </label></td>
                <td>
                    <label class="container">
                        <input type="radio" id="${radioName}n" name="${radioName}" value="no">
                        <span class="checkmark"></span>
                    </label>
                </td>
            </tr>
            `;
        }).join('');
        return `
        <table class="multi-table" align="center">
          <thead>
            <tr>
                <th><!-- empty header above attributes--></th>
                ${!tooltips ? '' : '<th><!-- empty header above tooltips--></th>'}
                <th>${this.yesText}</th>
                <th>${this.skipText}</th>
                <th>${this.noText}</th>
            </tr>
          </thead>
          <tbody>
          ${tableRows}
          </tbody>
        </table>
        <div class="button-container">
            <button class="next" tabindex=0>${this.nextText}</button>
            ${this.qNumber !== 1 ? `<button class="previous">${this.previousText}</button>` : ''}
        </div>
        `;
    }

    tooltipTemplate(tooltip) {
        return `
            <span class="info">
                <span class="icon" tabindex=0>
                    <img src="assets/info.png">
                </span>
                <span class="tooltip">${tooltip}</span>
            </span>
        `;
    }

    get endTemplate() {
        return `
            <div class="comp">
                <p class="question">${this.endText}</p>
                <div class="button-container">
                    <button class="ok" onclick="location.reload()">${this.startText}</button>
                </div>
            </div>
        `;
    }

    // Check whether to use a question template or not
    get questionString() {
        const qString = this.question.attribute_question;
        return qString ? qString : `Onko rakennuksessa ${this.question.attribute_name}?`;
    }
    // Css for all elements
    get style() {
        return `
        <style>
        .comp {
            font-family: Arial;
            font-size: 18px;
            background-color: white;
            padding: 10px 10px 5px 10px;
            margin: 10px 10px 10px 10px;
            border: 2px solid #c5c5c5;
            border-radius: 2px;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
            width: auto;
        }

        .question {
            font-size: 18px;
            text-align: center;
        }

        .button-container {
            text-align: center;
            padding: 10px 10px 5px 10px;
        }

        button {
            min-width: 80px;
            background-color: #0073b0;
            border-style: hidden;
            box-shadow: 2px 2px 1px #888888;
            border-radius: 4px;
            font-size: 16px;
            padding: 3px;
            color: white;
            cursor: pointer;
        }

        button:hover {
            color: black;
            background-color: #badcf5;
            border-color: #6c757d;
        }

        button:focus {
            color: black;
            background-color: #badcf5;
            border-color: #6c757d;
        }

        th {
            padding: 10px;
            font-size: 18px;
            text-align: center;
            font-weight: normal;
        }

        td {
            padding: 10px;
            font-size: 18px;
            text-align: left;
        }

        table {
            border-collapse: separate;
            border-spacing: 0px;
        }

        .container {
            display: block;
            position: relative;
            cursor: pointer;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }

        /* Hide the browser's default radio button */
        .container input {
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
        }

        /* Create a custom radio button */
        .checkmark {
            position: absolute;
            top: 0;
            left: 0;
            height: 24px;
            width: 24px;
            background-color: #eee;
            border-radius: 50%;
        }

        /* On mouse-over, add a grey background color */
        .container:hover input~.checkmark {
            background-color: #ccc;
        }

        /* When the radio button is checked, add a blue background */
        .container input:checked~.checkmark {
            background-color: #0073b0;
        }

        /* Create the indicator (the dot/circle - hidden when not checked) */
        .checkmark:after {
            content: "";
            position: absolute;
            display: none;
        }

        /* Show the indicator (dot/circle) when checked */
        .container input:checked~.checkmark:after {
            display: block;
        }

        /* Style the indicator (dot/circle) */
        .container .checkmark:after {
            top: 7px;
            left: 7px;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: white;
        }

        /* Styles for tooltip */
        .info {
            position: relative;
        }
    
        .tooltip {
	    z-index: -1;
            font-size: 0.8em;
            width: 13em;
            display: inline-block;
            border: 1px solid black;
            padding: 0.33em;
            background: #eee;
            border-radius: 10px;
            opacity: 0;
            transition: 0.6s all;
            position: absolute;
            top: 1.4em;
            right: -6.5em;
        }

        img {
            width: 0.9em;
        }
    
        .icon:hover + .tooltip, .icon:focus + .tooltip {
            opacity: 1;
            z-index: 3;
        }
        </style>
        `;
    }
    // get the preliminary question
    async fetchQuestion() {
        const url = `${baseUrl}/question?lang=${this.language}`;
        return await fetch(url, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .catch((error) => console.error('Error:', error));
    }
    // POST answer and get new question and scores
    async postAnswer(answer) {
        const url = `${baseUrl}/answer?lang=${this.language}`;
        return await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(answer),
        }).then((response) => response.json());
    }
    // GET previous question and scores
    async getPrevious() {
        const url = `${baseUrl}/previous`;
        return await fetch(url, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .catch((error) => console.error('Error:', error));
    }
    // Sends new classes to result element
    updateClasses() {
        const event = new CustomEvent('updateScores', {
            bubbles: true,
            detail: {
                building_classes: this.reply.building_classes,
                question_number: this.qNumber,
            },
            composed: true,
        });
        this.dispatchEvent(event);
    }

    // Monitors the value of language attribute
    static get observedAttributes() {
        return ['language'];
    }

    // Reacts to changes in the value of language attribute
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        } else if (name === 'language') {
            this.language = newValue;
            this.setLanguage();
        }
    }

    setLanguage() {
        const json = languages[this.language];
        this.yesText = json['yesText'];
        this.noText = json['noText'];
        this.skipText = json['skipText'];
        this.previousText = json['previousText'];
        this.nextText = json['nextText'];
        this.startText = json['startText'];
        this.endText = json['endText'];
    }

    render() {
        if (!this.shadowRoot) {
            this.attachShadow({mode: 'open'});
        }

        this.shadowRoot.innerHTML = '';
        const temp = document.createElement('template');
        temp.innerHTML = this.style + this.template;
        this.shadowRoot.appendChild(temp.content.cloneNode(true));

        this.addEventListeners();
    }

    makeAnswer(response) {
        let res;
        if (this.question.type === 'multi') {
            res = this.question.attributes.map((attr) => {
                const checked = this.shadowRoot.querySelector(`input[name="radio${attr.attribute_id}"]:checked`);
                res = {attribute_id: attr.attribute_id,
                    response: checked.value};
                return res;
            });
        } else {
            res = [
                {
                    attribute_id: this.question.attribute_id,
                    response: response,
                },
            ];
        }
        const answer = {
            language: this.language,
            response: res,
        };
        return answer;
    }

    // Handles the logic for responding to user input
    async handleAnswer(response) {
        this.disableButtons();
        const answer = this.makeAnswer(response);
        if (response === 'previous') {
            this.qNumber--;
            this.reply = await this.getPrevious();
        } else {
            this.qNumber++;
            this.reply = await this.postAnswer(answer);
        }
        if (this.qNumber !== 1) {
            this.question = this.reply.new_question;
        } else {
            this.question = this.reply;
        }

        this.updateClasses();
        // Special case for when backend runs out of questions
        if (this.question.type && this.question.type === 'none') {
            const e = {detail: true};
            this.endSession(e);
            return;
        }
        this.render();
    }
    // Event listeners for answer buttons
    addEventListeners() {
        if (this.question.type === 'simple') {
            const okButton = this.shadowRoot.querySelector('.ok');
            okButton.addEventListener('click', (e) => {
                this.handleAnswer('yes');
            });

            const noButton = this.shadowRoot.querySelector('.no');
            noButton.addEventListener('click', (e) => {
                this.handleAnswer('no');
            });
            const skipButton = this.shadowRoot.querySelector('.skip');
            skipButton.addEventListener('click', (e) => {
                this.handleAnswer('skip');
            });
        }
        if (this.question.type === 'multi') {
            const nextButton = this.shadowRoot.querySelector('.next');
            nextButton.addEventListener('click', (e) => {
                this.handleAnswer('next');
            });
        }
        // Add back button if available
        if (this.qNumber !== 1) {
            const previousButton = this.shadowRoot.querySelector('.previous');
            previousButton.addEventListener('click', (e) => {
                this.handleAnswer('previous');
            });
        }
    }

    endSession(event) {
        if (event.detail !== true) return;
        if (!this.shadowRoot) {
            this.attachShadow({mode: 'open'});
        }
        this.shadowRoot.innerHTML = '';
        const temp = document.createElement('template');
        temp.innerHTML = this.style + this.endTemplate;
        this.shadowRoot.appendChild(temp.content.cloneNode(true));
    }


    // Disables the ui buttons.
    disableButtons() {
        const buttons = this.shadowRoot.querySelectorAll('button');
        buttons.forEach((button) => {
            button.disabled = true;
        });
    }
}

const languages = {
    'fi': {'yesText': 'Kyllä', 'noText': 'Ei', 'skipText': 'Ohita', 'previousText': 'Edellinen', 'nextText': 'Seuraava',
        'startText': 'Aloita alusta', 'endText': 'Hakusi on päättynyt'},
    'en': {'yesText': 'Yes', 'noText': 'No', 'skipText': 'Skip', 'previousText': 'Previous', 'nextText': 'Next',
        'startText': 'Start over', 'endText': 'Your search has ended'},
    'sv': {'yesText': 'Ja', 'noText': 'Nej', 'skipText': 'Hoppa över', 'previousText': 'Föregående', 'nextText': 'Nästa',
        'startText': 'Börja om', 'endText': 'Din sökning har avslutats'},
};

// check for polyfills
const register = () => customElements.define('fs-question', FsQuestion);
window.WebComponents ? window.WebComponents.waitFor(register) : register();
