class FsDetail extends HTMLElement {
    constructor() {
        super();
        this.classification = null;
        this.hidden = true;
        this.answered = false;

        const parentDiv = document.getElementById('faceted');
        if (parentDiv) {
            parentDiv.addEventListener('showDetails', this.updateDetail.bind(this));
        }
    }

    connectedCallback() {
        this.render();
    }

    updateDetail(event) {
        this.classification = event.detail;
        this.render();
    }

    get template() {
        if (!this.classification) {
            this.hidden = true;
            return '';
        }
        this.hidden = false;
        const item = this.classification;
        const template = `
        <div class="comp">
            <div class="blue">
                <h3> ${item.code} ${item.name} </h3>
            </div>
            <div class="white">
                <ul>
                    <li class="note">${item.note}<hr/></li>
                    ${this.excludes}
                    ${this.includes}
                    ${this.includesAlso}
                    ${this.keywords}
                    ${this.feedback}
                </ul>
            </div>
        </div>
        `;
        return template;
    }

    get excludes() {
        if (!this.classification.excludes) {
            return '';
        }
        return `
            <li class="excludes"><span class="header">Tähän ei kuulu: </span><span>${this.classification.excludes}</span><hr/></li>
            `;
    }

    get includes() {
        if (!this.classification.includes) {
            return '';
        }
        return `
        <li class="includes"><span class="header">Tähän kuuluu: </span><span>${this.classification.includes}</span><hr/></li>
        `;
    }

    get includesAlso() {
        if (!this.classification.includesAlso) {
            return '';
        }
        return `
        <li class="includesAlso"><span class="header">Tähän kuuluu myös: </span><span>${this.classification.includesAlso}</span><hr/></li>
        `;
    }

    get keywords() {
        if (!this.classification.keywords) {
            return '';
        }
        return `
        <li class="keywords"><span class="header">Hakusanat: </span><span>${this.classification.keywords}</span><hr/></li>
        `;
    }

    get feedback() {
        if (this.answered) {
            return `
            <li class="feedback">Kiitos palautteestasi</li>
            `;
        }
        return `
        <li class="feedback"><span>Oliko tämä hakemanne luokka?</span> <button class="ok">Kyllä</button> <button class="no">Ei</button></li>
        `;
    }

    get style() {
        return `
    <style>
    .comp {
        font-family: Arial;
        font-size: 18px;
        background-color: white;
        margin: 10px 10px 10px 10px;
        border: 2px solid #c5c5c5;
        border-radius: 2px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        width: auto;
      }
    .blue {
        padding: 10px 10px 5px 10px;
        background-color: #0073b0;
        color: white;
        padding:  5px 5px 5px 5px;
        margin: 0px;
      }
    .white{
        padding: 10px 10px 5px 10px;
        border: 1px solid #c5c5c5;
        width: auto;
    }
    h3 {
        font-size 1em;
    }
    ul {
        list-style: none;
        padding-top: 0px;
        margin-top 0px;
    }
    li {
        padding 0;
        white-space: pre-wrap;
        padding: 1px 1px 1px 1px;
        margin: 1px 1px 1px -40px;
    }
    hr {
        opacity: 0.6;
    }

    .header {
        font-weight: bold;
        font-size: 1em;
    }
    button {
        min-width: 50px;
        background-color: #0073b0;
        border-style: hidden;
        box-shadow: 2px 2px 1px #888888;
        border-radius: 4px;
        font-size: 16px;
        padding: 3px;
        color:white;
        cursor: pointer;
      }
    button:hover {
        color: black;
        background-color: #edf3f8;
        border-color: #6c757d;
    }
    </style>
    `;
    }

    render() {
        if (!this.shadowRoot) {
            this.attachShadow({mode: 'open'});
        }
        // clear the possible old render
        this.shadowRoot.innerHTML = '';

        // stamp template to DOM
        const temp = document.createElement('template');
        temp.innerHTML = this.style + this.template;
        this.shadowRoot.appendChild(temp.content.cloneNode(true));
        if (!this.hidden && !this.answered) this.addEventListeners();
    }

    addEventListeners() {
        const okButton = this.shadowRoot.querySelector('.ok');
        okButton.addEventListener('click', (e) => {
            this.handleClick('yes');
        });
        const noButton = this.shadowRoot.querySelector('.no');
        noButton.addEventListener('click', () => {
            this.handleClick('no');
        });
    }
    handleClick(str) {
        const answer = {
            response: str,
            class_id: this.classification.code,
            class_name: this.classification.name,
        };
        this.postAnswer(answer);
        this.answered = true;
        this.render();
    }

    // POST answer to endpoint
    async postAnswer(answer) {
        const base = 'http://faceted.ddns.net:5000';
        const endpoint = '/feedback';
        return await fetch(base + endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(answer),
        }).then((response) => response.json());
    }
    // Cleanup
    disconnectedCallback() {
        const parentDiv = document.getElementById('faceted');
        if (parentDiv) {
            parentDiv.removeEventListener('showDetails', this.updateDetail.bind(this));
        }
    }
}
customElements.define('fs-detail', FsDetail);
