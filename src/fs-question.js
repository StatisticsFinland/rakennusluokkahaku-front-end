class FsQuestion extends HTMLElement {
    constructor() {
      super();
      this.question = null;
      this.answer = null;
      this.classes = null;
      this.reply = null;
    }

    get template() {
        return `
        <div class='comp'>
          <p class='question'>
            Onko rakennuksessa <span></span>?
          </p>
          <div class='button-container'>
            <button class="ok">Kyllä</button>
            <button class="no">Ei</button>
          </div>
        </div>
        `;
    }

    get style() {
        return `
        <style> 
        .comp {
            font-family: Arial;
            font-size: 18px;
            padding: 10px 10px 5px 10px;
            position: absolute;
            top: 30%;
            left: 55%;
            transform: translate(-50%,-50%);
            border: 2px solid #c5c5c5;
            border-radius: 2px;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
            
            min-width: 300px;
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
            background-color: #4078a5;
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
     
    //fetch for getting the preliminary question
    async fetchQuestion() {
      return await fetch(
        'faceted.ddns.net:5000/question', {
          method: 'GET'
        }
      )
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch( error => console.error('Error:', error) );
    }

    //fetch for sending answer and getting new question & categories
    async postAnswer() {
      return await fetch(
        'faceted.ddns.net:5000/answer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(answer)
        })
        .then(response => response.json())
    }

    //sends new classes to list element
    updateClasses(){
      this.classes = this.reply.building_classes
      const event = new CustomEvent('updateClasses',
        {
          bubbles: true,
          detail: this.classes,
          composed: true,
      });
      this.dispatchEvent(event);
    }
  
    async connectedCallback() {

      //const data = await this.fetchQuestion();
      //this.question = data;

      if (!this.shadowRoot) {
          this.attachShadow({ mode: "open" });
          //stamp template to DOM
          const temp = document.createElement("template");
          temp.innerHTML = this.style + this.template;
          this.shadowRoot.appendChild(temp.content.cloneNode(true));
          this.addEventListeners();   
      }
    }

    //formulates and sends answer object to backend
    createAnswer = (response) => {
      this.answer = {
        language: 'suomi',
        attribute_id: this.question.attribute_id,
        answer: response
      };
      this.reply = this.postAnswer();
    }

    //event listeners for answer buttons
    addEventListeners() {

      const valueElement = this.shadowRoot.querySelector('span');
        valueElement.innerText = ('sauna');

      const okButton = this.shadowRoot.querySelector(".ok");
        okButton.addEventListener("click", (e) => {
          //this.createAnswer('yes');
          //this.updateClasses();
          valueElement.innerText = ('vaja');  
        });

      const noButton = this.shadowRoot.querySelector(".no");
          noButton.addEventListener("click", (e) => {
            //this.createAnswer('no');
            //this.updateClasses();
            valueElement.innerText = ('lattia');
          });

    }
  }

  // check for polyfills
  const register = () =>
    customElements.define("fs-question", FsQuestion);
  window.WebComponents ? window.WebComponents.waitFor(register) : register();

