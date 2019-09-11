class FsListComponent extends HTMLElement {
  constructor() {
    super();
    this.items = null;
  }

  get template() {
    if (!this.items) {
      return "<h1>Error fetching data</h1>";
    }
    // show only first 10 results for demo
    const lis = this.items.slice(0, 10).join("");
    return `
    <div>
      <ul>
        ${lis}
      </ul>
    </div>
    `;
  }

  get style() {
    return `
    <style>
    ul {
          list-style: none;
          border: 1px solid #c5c5c5;
          width: 30%;
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
      "https://data.stat.fi/api/classifications/v1/classifications/rakennus_1_20180712/classificationItems?content=data&meta=max&lang=fi"
    ).then(res => res.json());
  }

  // async so we can fetch data before drawing component
  async connectedCallback() {
    const data = await this.fetchData();
    // filter to show only bottom level classifications
    this.items = data.filter(item => {
      return item.level == "3";
    });
    // map classifications to list items
    this.items = this.items.map(item => {
      return `<li>${item.code} ${item.classificationItemNames[0].name}</li>`;
    });

    //polyfills like this being here instead of constructor
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      //stamp template to DOM
      this.shadowRoot.innerHTML = this.style + this.template;
    }
  }

  // possible cleanup here
  disconnectedCallback() {}
}

// check for polyfills
const register = () =>
  customElements.define("fs-list-component", FsListComponent);
window.WebComponents ? window.WebComponents.waitFor(register) : register();
