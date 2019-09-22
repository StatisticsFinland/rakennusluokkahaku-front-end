class FsEventComponent extends HTMLElement {
    constructor() {
        super();
    }

    get template() {
        return `<div>
                <button>Dispatch</button> 
                    </div>`;
    }

    get style() {
        return `
    <style>
    div {
        border: 1px solid #c5c5c5;
        width: 30%;
    }
    </style>
    `;
    }

    connectedCallback() {
        if (!this.shadowRoot) {
            this.attachShadow({mode: 'open'});
        }
        this.shadowRoot.innerHTML = '';

        // stamp template to DOM
        const temp = document.createElement('template');
        temp.innerHTML = this.style + this.template;
        this.shadowRoot.appendChild(temp.content.cloneNode(true));

        const button = this.shadowRoot.querySelector('button');
        button.addEventListener('click', (e) => {
            const event = new CustomEvent('updateScores',
                {
                    bubbles: true,
                    detail: 'Hello World!',
                    composed: true,
                });
            e.target.dispatchEvent(event);
            console.log('event sent');
        });
    }
}

customElements.define('fs-event-component', FsEventComponent);
