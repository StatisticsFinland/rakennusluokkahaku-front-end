const baseUrl = 'http://0.0.0.0:5000';

class FsQuestion extends HTMLElement {
    constructor() {
        super();
        this.question = null;
        this.reply = null;
    }

    get template() {
        if (!this.question) {
            return `<p>Error fetching data</p>`
        }
        return `
        <div class='comp'>
          <p class='question'>
            Onko rakennuksessa <span>${this.question.attribute_name}</span>?
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

    // get the preliminary question
    async fetchQuestion() {
        const url = `${baseUrl}/question`;
        return await fetch(url, {
            method: 'GET',
            mode: 'cors',
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
            body: JSON.stringify(answer),
        }).then((response) => response.json());
    }

    // sends new classes to list element
    updateClasses() {
        console.log(this.reply);
        // TODO change the send data to real data
        const newData = testidata.map((item) => {
            const newItem = item;
            newItem.score = Math.random();
            return newItem;
        });
        const event = new CustomEvent('updateScores', {
            bubbles: true,
            detail: newData,
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
        const temp = document.createElement('template');
        temp.innerHTML = this.style + this.template;
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
        this.reply = await this.postAnswer(answer);
        this.updateClasses();
        this.question = this.reply.new_question;
        this.render();
    }

    // event listeners for answer buttons
    addEventListeners() {
        const okButton = this.shadowRoot.querySelector('.ok');
        okButton.addEventListener('click', (e) => {
            this.handleAnswer(true);
        });

        const noButton = this.shadowRoot.querySelector('.no');
        noButton.addEventListener('click', (e) => {
            this.handleAnswer(false);
        });
    }
}

// check for polyfills
const register = () => customElements.define('fs-question', FsQuestion);
window.WebComponents ? window.WebComponents.waitFor(register) : register();

// dont mind me
const testidata = [
    {
        class_name: 'Omakotitalot',
        class_id: '0110',
        score: 0,
    },
    {
        class_name: 'Paritalot',
        class_id: '0111',
        score: 0,
    },
    {
        class_name: 'Rivitalot',
        class_id: '0112',
        score: 0,
    },
    {
        class_name: 'Pienkerrostalot',
        class_id: '0120',
        score: 0,
    },
    {
        class_name: 'Asuinkerrostalot',
        class_id: '0121',
        score: 0,
    },
    {
        class_name: 'Asuntolarakennukset',
        class_id: '0130',
        score: 0,
    },
    {
        class_name: 'Erityisryhmien asuinrakennukset',
        class_id: '0140',
        score: 0,
    },
    {
        class_name:
            'Ympärivuotiseen käyttöön soveltuvat vapaa-ajan asuinrakennukset',
        class_id: '0210',
        score: 0,
    },
    {
        class_name:
            'Osavuotiseen käyttöön soveltuvat vapaa-ajan asuinrakennukset',
        class_id: '0211',
        score: 0,
    },
    {
        class_name: 'Tukku- ja vähittäiskaupan myymälähallit',
        class_id: '0310',
        score: 0,
    },
    {
        class_name: 'Kauppakeskukset ja liike- ja tavaratalot',
        class_id: '0311',
        score: 0,
    },
    {
        class_name: 'Muut myymälärakennukset',
        class_id: '0319',
        score: 0,
    },
    {
        class_name: 'Hotellit',
        class_id: '0320',
        score: 0,
    },
    {
        class_name: 'Motellit, hostellit ja vastaavat majoitusliikerakennukset',
        class_id: '0321',
        score: 0,
    },
    {
        class_name: 'Loma-, lepo- ja virkistyskodit',
        class_id: '0322',
        score: 0,
    },
    {
        class_name: 'Muut majoitusliikerakennukset',
        class_id: '0329',
        score: 0,
    },
    {
        class_name: 'Ravintolarakennukset ja vastaavat liikerakennukset',
        class_id: '0330',
        score: 0,
    },
    {
        class_name: 'Toimistorakennukset',
        class_id: '0400',
        score: 0,
    },
    {
        class_name: 'Asemarakennukset ja terminaalit',
        class_id: '0510',
        score: 0,
    },
    {
        class_name: 'Ammattiliikenteen kaluston suojarakennukset',
        class_id: '0511',
        score: 0,
    },
    {
        class_name: 'Ammattiliikenteen kaluston huoltorakennukset',
        class_id: '0512',
        score: 0,
    },
    {
        class_name: 'Pysäköintitalot ja -hallit',
        class_id: '0513',
        score: 0,
    },
    {
        class_name: 'Kulkuneuvojen katokset',
        class_id: '0514',
        score: 0,
    },
    {
        class_name: 'Datakeskukset ja laitetilat',
        class_id: '0520',
        score: 0,
    },
    {
        class_name: 'Tietoliikenteen rakennukset',
        class_id: '0521',
        score: 0,
    },
    {
        class_name: 'Muut liikenteen rakennukset',
        class_id: '0590',
        score: 0,
    },
    {
        class_name: 'Terveys- ja hyvinvointikeskukset',
        class_id: '0610',
        score: 0,
    },
    {
        class_name: 'Keskussairaalat',
        class_id: '0611',
        score: 0,
    },
    {
        class_name: 'Erikoissairaalat ja laboratoriorakennukset',
        class_id: '0612',
        score: 0,
    },
    {
        class_name: 'Muut sairaalat',
        class_id: '0613',
        score: 0,
    },
    {
        class_name: 'Kuntoutuslaitokset',
        class_id: '0614',
        score: 0,
    },
    {
        class_name: 'Muut terveydenhuoltorakennukset',
        class_id: '0619',
        score: 0,
    },
    {
        class_name: 'Laitospalvelujen rakennukset',
        class_id: '0620',
        score: 0,
    },
    {
        class_name: 'Avopalvelujen rakennukset',
        class_id: '0621',
        score: 0,
    },
    {
        class_name: 'Vankilarakennukset',
        class_id: '0630',
        score: 0,
    },
    {
        class_name: 'Teatterit, musiikki- ja kongressitalot',
        class_id: '0710',
        score: 0,
    },
    {
        class_name: 'Elokuvateatterit',
        class_id: '0711',
        score: 0,
    },
    {
        class_name: 'Kirjastot ja arkistot',
        class_id: '0712',
        score: 0,
    },
    {
        class_name: 'Museot ja taidegalleriat',
        class_id: '0713',
        score: 0,
    },
    {
        class_name: 'Näyttely- ja messuhallit',
        class_id: '0714',
        score: 0,
    },
    {
        class_name: 'Seura- ja kerhorakennukset',
        class_id: '0720',
        score: 0,
    },
    {
        class_name: 'Uskonnonharjoittamisrakennukset',
        class_id: '0730',
        score: 0,
    },
    {
        class_name: 'Seurakuntatalot',
        class_id: '0731',
        score: 0,
    },
    {
        class_name: 'Muut uskonnollisten yhteisöjen rakennukset',
        class_id: '0739',
        score: 0,
    },
    {
        class_name: 'Jäähallit',
        class_id: '0740',
        score: 0,
    },
    {
        class_name: 'Uimahallit',
        class_id: '0741',
        score: 0,
    },
    {
        class_name: 'Monitoimihallit',
        class_id: '0742',
        score: 0,
    },
    {
        class_name: 'Urheilu- ja palloiluhallit',
        class_id: '0743',
        score: 0,
    },
    {
        class_name: 'Stadion- ja katsomorakennukset',
        class_id: '0744',
        score: 0,
    },
    {
        class_name: 'Muut urheilu- ja liikuntarakennukset',
        class_id: '0749',
        score: 0,
    },
    {
        class_name: 'Muut kokoontumisrakennukset',
        class_id: '0790',
        score: 0,
    },
    {
        class_name: 'Lasten päiväkodit',
        class_id: '0810',
        score: 0,
    },
    {
        class_name: 'Yleissivistävien oppilaitosten rakennukset',
        class_id: '0820',
        score: 0,
    },
    {
        class_name: 'Ammatillisten oppilaitosten rakennukset',
        class_id: '0830',
        score: 0,
    },
    {
        class_name: 'Korkeakoulurakennukset',
        class_id: '0840',
        score: 0,
    },
    {
        class_name: 'Tutkimuslaitosrakennukset',
        class_id: '0841',
        score: 0,
    },
    {
        class_name: 'Vapaan sivistystyön opetusrakennukset',
        class_id: '0890',
        score: 0,
    },
    {
        class_name:
            'Järjestöjen, liittojen, työnantajien ja vastaavien opetusrakennukset',
        class_id: '0891',
        score: 0,
    },
    {
        class_name: 'Yleiskäyttöiset teollisuushallit',
        class_id: '0910',
        score: 0,
    },
    {
        class_name: 'Raskaan teollisuuden tehdasrakennukset',
        class_id: '0911',
        score: 0,
    },
    {
        class_name: 'Elintarviketeollisuuden tuotantorakennukset',
        class_id: '0912',
        score: 0,
    },
    {
        class_name: 'Muut teollisuuden tuotantorakennukset',
        class_id: '0919',
        score: 0,
    },
    {
        class_name: 'Teollisuus- ja pienteollisuustalot',
        class_id: '0920',
        score: 0,
    },
    {
        class_name: 'Metallimalmien käsittelyrakennukset',
        class_id: '0930',
        score: 0,
    },
    {
        class_name: 'Muut kaivannaistoiminnan rakennukset',
        class_id: '0939',
        score: 0,
    },
    {
        class_name: 'Sähköenergian tuotantorakennukset',
        class_id: '1010',
        score: 0,
    },
    {
        class_name: 'Lämpö- ja kylmäenergian tuotantorakennukset',
        class_id: '1011',
        score: 0,
    },
    {
        class_name: 'Energiansiirtorakennukset',
        class_id: '1090',
        score: 0,
    },
    {
        class_name: 'Energianvarastointirakennukset',
        class_id: '1091',
        score: 0,
    },
    {
        class_name: 'Vedenotto-, vedenpuhdistus- ja vedenjakelurakennukset',
        class_id: '1110',
        score: 0,
    },
    {
        class_name:
            'Jätteenkeruu-, jätteenkäsittely- ja jätteenvarastointirakennukset',
        class_id: '1120',
        score: 0,
    },
    {
        class_name: 'Materiaalien kierrätysrakennukset',
        class_id: '1130',
        score: 0,
    },
    {
        class_name: 'Lämmittämättömät varastot',
        class_id: '1210',
        score: 0,
    },
    {
        class_name: 'Lämpimät varastot',
        class_id: '1211',
        score: 0,
    },
    {
        class_name: 'Kylmä- ja pakastevarastot',
        class_id: '1212',
        score: 0,
    },
    {
        class_name: 'Muut olosuhteiltaan säädellyt varastot',
        class_id: '1213',
        score: 0,
    },
    {
        class_name:
            'Logistiikkakeskukset ja muut monikäyttöiset varastorakennukset',
        class_id: '1214',
        score: 0,
    },
    {
        class_name: 'Varastokatokset',
        class_id: '1215',
        score: 0,
    },
    {
        class_name: 'Paloasemat',
        class_id: '1310',
        score: 0,
    },
    {
        class_name: 'Väestönsuojat',
        class_id: '1311',
        score: 0,
    },
    {
        class_name: 'Muut pelastustoimen rakennukset',
        class_id: '1319',
        score: 0,
    },
    {
        class_name: 'Lypsykarjarakennukset',
        class_id: '1410',
        score: 0,
    },
    {
        class_name: 'Lihakarjarakennukset',
        class_id: '1411',
        score: 0,
    },
    {
        class_name: 'Sikalat',
        class_id: '1412',
        score: 0,
    },
    {
        class_name: 'Lampolat ja vuohinavetat',
        class_id: '1413',
        score: 0,
    },
    {
        class_name: 'Hevostallit',
        class_id: '1414',
        score: 0,
    },
    {
        class_name: 'Siipikarjarakennukset',
        class_id: '1415',
        score: 0,
    },
    {
        class_name: 'Turkiseläinrakennukset',
        class_id: '1416',
        score: 0,
    },
    {
        class_name: 'Muut eläinsuojat',
        class_id: '1419',
        score: 0,
    },
    {
        class_name: 'Kasvihuoneet',
        class_id: '1490',
        score: 0,
    },
    {
        class_name: 'Viljankuivaamot ja viljansäilytysrakennukset',
        class_id: '1491',
        score: 0,
    },
    {
        class_name: 'Maatalouden varastorakennukset',
        class_id: '1492',
        score: 0,
    },
    {
        class_name: 'Lantalat',
        class_id: '1493',
        score: 0,
    },
    {
        class_name: 'Muut maa-, metsä- ja kalatalouden rakennukset',
        class_id: '1499',
        score: 0,
    },
    {
        class_name: 'Saunarakennukset',
        class_id: '1910',
        score: 0,
    },
    {
        class_name: 'Talousrakennukset',
        class_id: '1911',
        score: 0,
    },
    {
        class_name: 'Majat ja tuvat',
        class_id: '1912',
        score: 0,
    },
    {
        class_name: 'Muualla luokittelemattomat rakennukset',
        class_id: '1919',
        score: 0,
    },
];
