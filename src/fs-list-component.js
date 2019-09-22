class FsListComponent extends HTMLElement {
    constructor() {
        super();
        this.classifications = null;
        this.scores = null;
        // listen to score updates from question-element
        const parentDiv = document.getElementById('faceted');
        parentDiv.addEventListener('updateScores', this.updateScores.bind(this));
    }

    updateScores(event) {
        console.log('got event');
        console.log(event.detail);
        console.log('event');
        // map scores to data
        // sort data
        // re-render
    }

    get template() {
        if (!this.classifications) {
            return '<h1>Error fetching data</h1>';
        }
        if (!this.scores) {
            return `<div>
                <p>Haun tulokset päivittyvät tänne</p>
                <button>Skip</button> 
                    </div>`;
        }
        const lis = this.createListItems();

        return `
    <div>
      <ul id="classifications">
        ${lis}
      </ul>
    </div>
    `;
    }

    createListItems() {
        // filter to show only bottom level classifications
        let classificationsToShow = this.classifications.filter((item) => {
            return item.level === 3;
        });
        // map classifications to list items
        classificationsToShow = classificationsToShow.map((item) => {
            return `<li id="${item.code}">${item.code} ${item.classificationItemNames[0].name}</li>`;
        });
        const lis = classificationsToShow.slice(0, 10).join('');
        return lis;
    }

    get style() {
        return `
    <style>
    div {
        border: 1px solid #c5c5c5;
        width: 30%;
    }
    ul {
          list-style: none;
        }
    li {
           margin: 5px 5px 5px -25px;
    }
    </style>
    `;
    }

    // native fetch for getting json
    async fetchData() {
        return await fetch(
            'https://data.stat.fi/api/classifications/v1/classifications/rakennus_1_20180712/classificationItems?content=data&meta=max&lang=fi'
        ).then((res) => res.json());
    }

    renderList() {
        if (!this.shadowRoot) {
            this.attachShadow({mode: 'open'});
        }
        console.log(this.shadowRoot);
        // clear the possible old render
        this.shadowRoot.innerHTML = '';

        // stamp template to DOM
        const temp = document.createElement('template');
        temp.innerHTML = this.style + this.template;
        this.shadowRoot.appendChild(temp.content.cloneNode(true));
        // add eventlisteners to listitems
        this.addEventListeners();

        // placeholder button hack
        const button = this.shadowRoot.querySelector('button');
        if (button) {
            button.addEventListener('click', this.showListItems.bind(this));
        }
    }

    addEventListeners() {
        const lis = this.shadowRoot.querySelectorAll('li');
        let odd = true;
        lis.forEach((li) => {
            li.style.background = odd ? '#bbbbbb' : '#dddddd';
            odd = !odd;
            li.addEventListener('click', (e) => {
                const classification = this.classifications.find((item) => {
                    return item.code === li.id;
                });
                const event = new CustomEvent('showDetails', {detail: classification, bubbles: true});
                console.log(event);
                // write something to test this
                // this.dispatchEvent(event)
            });
        });
    }

    showListItems() {
        this.scores = 'placeholder';
        this.renderList();
    }


    // async so we can fetch data before drawing component
    async connectedCallback() {
        const data = await this.fetchData();
        console.log(data);
        this.classifications = data;
        this.renderList();
    }

    // possible cleanup here
    disconnectedCallback() {
        const div = document.getElementById('faceted');
        div.removeEventListener('updateScores', this.updateScores.bind(this));
    }
}

// check for polyfills
const register = () =>
    customElements.define('fs-list-component', FsListComponent);
window.WebComponents ? window.WebComponents.waitFor(register) : register();
