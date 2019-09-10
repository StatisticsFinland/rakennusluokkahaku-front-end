class DisplayList extends HTMLElement {
  constructor() {
    super();
    this.items = null;
  }

  get template() {
    if (!this.items) {
      return "<h1>Error fetching data</h1>"
    }
    // show only first 10 results
    const lis = this.items.slice(0, 10).join("");
    return `
    <div>
      <span>Hello from template!</span>
      <ul>
        ${lis}
      </ul>
    </div>
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
    this.items = data.map(item => {
      return `<li>${item.classificationItemNames[0].name}</li>`;
    });

    //polyfills like this being here instead of constructor
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      //stamp template to DOM
      this.shadowRoot.innerHTML = this.template;
    }
  }

  // possible cleanup here
  disconnectedCallback() {}
}

// check for polyfills
const register = () => customElements.define("display-list", DisplayList);
window.WebComponents ? window.WebComponents.waitFor(register) : register();
