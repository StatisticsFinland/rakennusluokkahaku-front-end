class FsList extends HTMLElement {
    constructor() {
        super();
        this.data = null;
        this.classifications = null;
        this.hidden = true;
        // listen to score updates from question-element
        const parentDiv = document.getElementById('faceted');
        if (parentDiv) {
            parentDiv.addEventListener(
                'updateScores',
                this.updateScores.bind(this)
            );
        }
    }

    updateScores(event) {
        // Sort the data to make sure it is in the same order as this.data
        if (!event.detail) {
            this.hidden = true;
            this.renderList();
            return;
        }
        const newData = event.detail.sort((a, b) => a.class_id.localeCompare(b.class_id));
        this.classifications = this.data.map((item, i) => {
            const newObj = {...item};
            newObj.score = newData[i].score;
            return newObj;
        });
        this.classifications.sort((a, b) => {
            return b.score - a.score;
        });
        this.hidden = false;
        this.renderList();
    }

    get template() {
        if (!this.data) {
            return '<h1>Error fetching data from api</h1>';
        }
        const lis = this.createListItems();

        return `
        <div class="comp">
            <div class="blue">
                <h3>Hakutulokset</h3>
            </div>
            <div class="white">  
                <ul id="classifications">
                ${lis}
                </ul>
            </div>
        </div>
    `;
    }

    createListItems() {
        // map classifications to list items
        let classificationsToShow = this.classifications.slice(0, 10);
        classificationsToShow = classificationsToShow.map((item) => {
            return `<li id="id${item.code}">${item.code} ${item.classificationItemNames[0].name} ${item.score ?
                `Score: ${Number(item.score).toFixed(2)}` :
                ''}</li>`;
        });
        const lis = classificationsToShow.join('');
        return lis;
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
    div {
        border: 1px solid #c5c5c5;
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
    ul {
          list-style: none;
          padding 1px 1px 1px 1px;
          margin 1px 1px 1px 1px;
          vertical-align:middle;
          
        }
    li {
           padding: 1px 1px 1px 1px;
           margin: 1px 1px 1px -40px;
           list-style-type: none;
           cursor: pointer;
    }
    li:hover {
        background-color: #e0effa;
    }
    .selected {
        background-color: #badcf5 !important;
        font-weight: bold;
    }
    
    </style>
    `;
    }

    // Fetch classifications from stat.fi API
    async fetchData() {
        return await fetch(
            'https://data.stat.fi/api/classifications/v1/classifications/rakennus_1_20180712/classificationItems?content=data&meta=max&lang=fi'
        ).then((res) => res.json());
    }

    renderList() {
        if (!this.shadowRoot) {
            this.attachShadow({mode: 'open'});
        }
        // clear the possible old render
        this.shadowRoot.innerHTML = '';

        // stamp template to DOM
        const temp = document.createElement('template');
        temp.innerHTML = this.style + this.template;
        this.shadowRoot.appendChild(temp.content.cloneNode(true));
        // add eventlisteners to listitems
        this.addEventListeners();
    }

    addEventListeners() {
        const lis = this.shadowRoot.querySelectorAll('li');
        lis.forEach((li) => {
            li.addEventListener('click', (e) => {
                lis.forEach((li) => {
                    li.classList.remove('selected');
                });
                li.classList.add('selected');
                const c = this.classifications.find((item) => {
                    return item.code === li.id.slice(2, 6);
                });
                const item = {
                    name: c.classificationItemNames[0].name,
                    keywords: c.classificationIndexEntry[0].text.join(', '),
                    code: c.code,
                    note: c.explanatoryNotes[0].generalNote[c.explanatoryNotes[0].generalNote.length - 1],
                };
                const ex = c.explanatoryNotes[0].excludes;
                if (ex && ex.join('').replace(',', '').trim()) {
                    item.excludes = Array.from(new Set(ex)).map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
                }
                /* FIXME: kysy asiakkaalta
                Näitä ei ole koko datassa
                const inc = c.explanatoryNotes[0].includes;
                if (inc && inc.join('').replace(',', '').trim()) {
                    item.includes = inc;
                }
                */
                const incA = c.explanatoryNotes[0].includesAlso;
                if (incA && incA.join('').replace(' ', '').trim()) {
                    item.includesAlso = Array.from(new Set(incA)).map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(', ');
                }
                const event = new CustomEvent('showDetails', {
                    detail: item,
                    bubbles: true,
                    composed: true,
                });
                this.dispatchEvent(event);
            });
        });
    }

    async connectedCallback() {
        const data = await this.fetchData();
        this.data = data.filter(
            (item) => item.level === 3 && item.code !== '1919'
        );
        // make a deep copy
        this.classifications = this.data.map((item) => {
            return {...item};
        });

        this.renderList();
    }

    disconnectedCallback() {
        const div = document.getElementById('faceted');
        if (div) {
            div.removeEventListener(
                'updateScores',
                this.updateScores.bind(this)
            );
        }
    }
}

// check for polyfills
const register = () => customElements.define('fs-list', FsList);
window.WebComponents ? window.WebComponents.waitFor(register) : register();

export default FsList;
