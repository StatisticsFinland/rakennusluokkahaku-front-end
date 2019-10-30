const baseUrl = 'http://faceted.ddns.net:5000';

class FsQuestion extends HTMLElement {
    constructor() {
        super();
        this.question = null;
        this.reply = null;
        this.qNumber = 1;
    }

    // template for single questions
    get template() {
        return `
        <div class="comp">
          <p class="question">${this.qNumber}. ${this.questionString}</p>
          <div class="button-container">
            <button class="ok">Kyllä</button>
            <button class="no">Ei</button>
            <button class="skip">Ohita</button>
            ${this.qNumber !== 1 ? `<button class="previous">Edellinen</button>` : ''}
            </div>
        </div>
        `;
    }

    // template for multiquestions (NO LOGIC YET / NOT IMPLEMNTED)
    get multiquestionTemplate() {
        return `
        <div class="comp">
        <p class="question">${this.qNumber}. ${this.questionString}</p>
        <table align="center">
            <tr>
                <th>
                    <!-- empty header above attributes-->
                </th>
                <!-- TODO - make these less hardcoded for language support-->
                <th>Kyllä</th>
                <th>Ohita</th>
                <th>Ei</th>
            </tr>
            <!-- loopable section for each attribute in question -->
            <!-- name:s need to be based on attribute, name defines buttongroup -->
            <tr>
                <td>
                    "attribute goes here with more text so that the wanted behaviour can be tested"
                </td>
                <td>
                    <label class="container">
                        <input type="radio" name="radio" value="ok">
                        <span class="checkmark"></span>
                    </label>
                </td>
                <td>
                    <label class="container">
                        <input type="radio" checked="checked" name="radio" value="skip">
                        <span class="checkmark"></span>
                    </label></td>
                <td>
                    <label class="container">
                        <input type="radio" name="radio" value="no">
                        <span class="checkmark"></span>
                    </label>
                </td>
            </tr>
        </table>

        <div class="button-container">
            <button class="next">Seuraava</button>
            ${this.qNumber !== 1 ? '<button class="previous">Edellinen</button>' : ''}
        </div>
    </div>
        `;
    }

    get questionString() {
        const qString = this.question.attribute_question;
        return qString ? qString : `Onko rakennuksessa ${this.question.attribute_name}?`;
    }

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
            background-color: #edf3f8;
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
        </style>
        `;
    }

    // get the preliminary question
    async fetchQuestion() {
        const url = `${baseUrl}/question`;
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
        const url = `${baseUrl}/answer`;
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

    // sends new classes to list element
    updateClasses() {
        const event = new CustomEvent('updateScores', {
            bubbles: true,
            detail: this.reply.building_classes,
            composed: true,
        });
        this.dispatchEvent(event);
    }

    async connectedCallback() {
        const data = await this.fetchQuestion();
        this.question = data;

        this.render();
    }

    render() {
        if (!this.shadowRoot) {
            this.attachShadow({mode: 'open'});
        }

        this.shadowRoot.innerHTML = '';
        let temp;
        // // implementation ish?
        // if (this.response.type == 'multi') {
        //     temp = document.createElement('multiquestionTemplate');
        //     temp.innerHTML = this.style + this.multiquestionTemplate;
        // } else {
        temp = document.createElement('template');
        temp.innerHTML = this.style + this.template;
        // }
        this.shadowRoot.appendChild(temp.content.cloneNode(true));

        this.addEventListeners();
    }

    // handles the logic for responding to user input
    async handleAnswer(response) {
        const answer = {
            language: 'suomi',
            attribute_id: this.question.attribute_id,
            response: response,
        };
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
        this.render();
    }

    // event listeners for answer buttons
    addEventListeners() {
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
        // /add back button if availialbe
        if (this.qNumber !== 1) {
            const previousButton = this.shadowRoot.querySelector('.previous');
            previousButton.addEventListener('click', (e) => {
                this.handleAnswer('previous');
            });
        }
    }
}

// check for polyfills
const register = () => customElements.define('fs-question', FsQuestion);
window.WebComponents ? window.WebComponents.waitFor(register) : register();
