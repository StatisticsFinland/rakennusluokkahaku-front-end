/* eslint-disable max-len*/

function mockResponse(body) {
    return new window.Response(JSON.stringify(body), {
        status: 200,
        headers: {'Content-type': 'application/json'},
    });
}

// 4 questions to play around with
const questions = [
    {
        attribute_id: '1',
        attribute_name: 'Asunnot',
        attribute_question: 'Onko rakennus asunto?',
    },
    {
        attribute_id: '101',
        attribute_name: 'Asuinhuone',
        attribute_question: '',
    },
    {
        attribute_id: '102',
        attribute_name: 'Eteinen',
        attribute_question: '',
    },
    {
        attribute_id: '103',
        attribute_name: 'Keittiö',
        attribute_question: '',
    },
];

// 3 building classes to play around with
const buildingClasses = [
    {
        class_id: '0110',
        class_name: 'Omakotitalot',
        score: 0.50,
    },
    {
        class_id: '0111',
        class_name: 'Paritalot',
        score: 0.25,
    },
    {
        class_id: '0112',
        class_name: 'Rivitalot',
        score: 0.25,
    },
];

// 11 classifications to play around with
const classifications = [
    {
        classification: {
            localId: 'rakennus_1_20180712',
            internationalRecommendation: false,
            nationalRecommendation: true,
            classificationName: [
                {
                    langName: 'suomi',
                    lang: 'fi',
                    name: 'Rakennusluokitus 2018',
                },
            ],
            classificationDescription: [
                {
                    langName: 'suomi',
                    lang: 'fi',
                    description: 'Tilastokeskuksen tilastoissa on vielä toistaiseksi käytössä Rakennusluokitus 1994.\r\n\r\nRakennusluokituksessa talonrakennukset luokitellaan niiden pääasiallisen käyttötarkoituksen, eli  rakennuksessa harjoitettavan toiminnan vaatimien tilojen mukaan.',
                },
            ],
        },
        localId: 'rakennus_1_20180712/0110',
        level: 3,
        code: '0110',
        order: 30,
        modifiedDate: '2019-03-08T06:53:18Z',
        parentItemLocalId: 'rakennus_1_20180712/011',
        parentCode: '011',
        classificationItemNames: [
            {
                langName: 'suomi',
                lang: 'fi',
                name: 'Omakotitalot',
            },
        ],
        explanatoryNotes: [
            {
                type: [
                    'alkuperäinen',
                ],
                langName: [
                    'suomi',
                ],
                lang: [
                    'fi',
                ],
                generalNote: [
                    'Pientalot, joissa on yksi asuinhuoneisto.  \n\nOmakotitaloja ovat sellaiset pientalot, joissa on yksi asuinhuoneisto, sekä townhouse- eli kaupunkipientalot. Kaupunkipientaloilla tarkoitetaan yleensä omavaippaisia kaksi- tai kolmikerroksisia pientaloja, jotka ovat kiinni viereisissä taloissa. Niillä on tavallisesti oma pienehkö etu- tai takapihansa ja sisäänkäynti suoraan kadulta.',
                ],
            },
        ],
        classificationIndexEntry: [
            {
                text: [
                    'yhden asunnon talo',
                    'yksiasuntoinen pientalo',
                    'yhden asunnon pientalo',
                    'yhden asuinhuoneiston talo',
                    'townhouse-talo',
                    'kaupunkipientalo',
                ],
            },
        ],
    },
    {
        classification: {
            localId: 'rakennus_1_20180712',
            internationalRecommendation: false,
            nationalRecommendation: true,
            classificationName: [
                {
                    langName: 'suomi',
                    lang: 'fi',
                    name: 'Rakennusluokitus 2018',
                },
            ],
            classificationDescription: [
                {
                    langName: 'suomi',
                    lang: 'fi',
                    description: 'Tilastokeskuksen tilastoissa on vielä toistaiseksi käytössä Rakennusluokitus 1994.\r\n\r\nRakennusluokituksessa talonrakennukset luokitellaan niiden pääasiallisen käyttötarkoituksen, eli  rakennuksessa harjoitettavan toiminnan vaatimien tilojen mukaan.',
                },
            ],
        },
        localId: 'rakennus_1_20180712/0111',
        level: 3,
        code: '0111',
        order: 40,
        modifiedDate: '2019-03-08T06:53:18Z',
        parentItemLocalId: 'rakennus_1_20180712/011',
        parentCode: '011',
        classificationItemNames: [
            {
                langName: 'suomi',
                lang: 'fi',
                name: 'Paritalot',
            },
        ],
        explanatoryNotes: [
            {
                type: [
                    'alkuperäinen',
                ],
                langName: [
                    'suomi',
                ],
                lang: [
                    'fi',
                ],
                generalNote: [
                    'Pientalot, joissa on kaksi rinnakkaista asuinhuoneistoa.',
                ],
            },
        ],
        classificationIndexEntry: [
            {
                text: [
                    'kahden asunnon talo',
                    'kaksiasuntoinen pientalo',
                    'kahden asunnon pientalo',
                    'kahden asuinhuoneiston talo',
                ],
            },
        ],
    },
    {
        classification: {
            localId: 'rakennus_1_20180712',
            internationalRecommendation: false,
            nationalRecommendation: true,
            classificationName: [
                {
                    langName: 'suomi',
                    lang: 'fi',
                    name: 'Rakennusluokitus 2018',
                },
            ],
            classificationDescription: [
                {
                    langName: 'suomi',
                    lang: 'fi',
                    description: 'Tilastokeskuksen tilastoissa on vielä toistaiseksi käytössä Rakennusluokitus 1994.\r\n\r\nRakennusluokituksessa talonrakennukset luokitellaan niiden pääasiallisen käyttötarkoituksen, eli  rakennuksessa harjoitettavan toiminnan vaatimien tilojen mukaan.',
                },
            ],
        },
        localId: 'rakennus_1_20180712/0112',
        level: 3,
        code: '0112',
        order: 50,
        modifiedDate: '2019-03-08T06:53:18Z',
        parentItemLocalId: 'rakennus_1_20180712/011',
        parentCode: '011',
        classificationItemNames: [
            {
                langName: 'suomi',
                lang: 'fi',
                name: 'Rivitalot',
            },
        ],
        explanatoryNotes: [
            {
                type: [
                    'alkuperäinen',
                ],
                langName: [
                    'suomi',
                ],
                lang: [
                    'fi',
                ],
                generalNote: [
                    'Pientalot, joissa on vähintään kolme rinnakkaista asuinhuoneistoa ja joissa eri asuinhuoneistoihin kuuluvia tiloja ei ole päällekkäin. \n\nRivitalot koostuvat kolmesta tai useammasta yhteen rakennetusta asuinhuoneistosta ja muusta asukkaiden käytössä olevasta huonetilasta.',
                ],
            },
        ],
        classificationIndexEntry: [
            {
                text: [
                    'kytketty pientalo',
                    'rivi- ja ketjutalo',
                    'ketjutalo',
                ],
            },
        ],
    },
    {
        classification: {
            localId: 'rakennus_1_20180712',
            internationalRecommendation: false,
            nationalRecommendation: true,
            classificationName: [
                {
                    langName: 'suomi',
                    lang: 'fi',
                    name: 'Rakennusluokitus 2018',
                },
            ],
            classificationDescription: [
                {
                    langName: 'suomi',
                    lang: 'fi',
                    description: 'Tilastokeskuksen tilastoissa on vielä toistaiseksi käytössä Rakennusluokitus 1994.\r\n\r\nRakennusluokituksessa talonrakennukset luokitellaan niiden pääasiallisen käyttötarkoituksen, eli  rakennuksessa harjoitettavan toiminnan vaatimien tilojen mukaan.',
                },
            ],
        },
        localId: 'rakennus_1_20180712/0120',
        level: 3,
        code: '0120',
        order: 70,
        modifiedDate: '2019-03-08T06:53:18Z',
        parentItemLocalId: 'rakennus_1_20180712/012',
        parentCode: '012',
        classificationItemNames: [
            {
                langName: 'suomi',
                lang: 'fi',
                name: 'Pienkerrostalot',
            },
        ],
        explanatoryNotes: [
            {
                type: [
                    'alkuperäinen',
                ],
                langName: [
                    'suomi',
                ],
                lang: [
                    'fi',
                ],
                generalNote: [
                    'Kaksikerroksiset kerrostalot.',
                ],
            },
        ],
        classificationIndexEntry: [
            {
                text: [
                    'luhtitalo',
                ],
            },
        ],
    },
    {
        classification: {
            localId: 'rakennus_1_20180712',
            internationalRecommendation: false,
            nationalRecommendation: true,
            classificationName: [
                {
                    langName: 'suomi',
                    lang: 'fi',
                    name: 'Rakennusluokitus 2018',
                },
            ],
            classificationDescription: [
                {
                    langName: 'suomi',
                    lang: 'fi',
                    description: 'Tilastokeskuksen tilastoissa on vielä toistaiseksi käytössä Rakennusluokitus 1994.\r\n\r\nRakennusluokituksessa talonrakennukset luokitellaan niiden pääasiallisen käyttötarkoituksen, eli  rakennuksessa harjoitettavan toiminnan vaatimien tilojen mukaan.',
                },
            ],
        },
        localId: 'rakennus_1_20180712/0121',
        level: 3,
        code: '0121',
        order: 80,
        modifiedDate: '2019-03-08T06:53:18Z',
        parentItemLocalId: 'rakennus_1_20180712/012',
        parentCode: '012',
        classificationItemNames: [
            {
                langName: 'suomi',
                lang: 'fi',
                name: 'Asuinkerrostalot',
            },
        ],
        explanatoryNotes: [
            {
                type: [
                    'alkuperäinen',
                ],
                langName: [
                    'suomi',
                ],
                lang: [
                    'fi',
                ],
                generalNote: [
                    'Vähintään kolmikerroksiset kerrostalot.',
                ],
            },
        ],
        classificationIndexEntry: [
            {
                text: [
                    'terassitalo',
                    'lamellitalo',
                    'pistetalo',
                ],
            },
        ],
    },
    {
        classification: {
            localId: 'rakennus_1_20180712',
            internationalRecommendation: false,
            nationalRecommendation: true,
            classificationName: [
                {
                    langName: 'suomi',
                    lang: 'fi',
                    name: 'Rakennusluokitus 2018',
                },
            ],
            classificationDescription: [
                {
                    langName: 'suomi',
                    lang: 'fi',
                    description: 'Tilastokeskuksen tilastoissa on vielä toistaiseksi käytössä Rakennusluokitus 1994.\r\n\r\nRakennusluokituksessa talonrakennukset luokitellaan niiden pääasiallisen käyttötarkoituksen, eli  rakennuksessa harjoitettavan toiminnan vaatimien tilojen mukaan.',
                },
            ],
        },
        localId: 'rakennus_1_20180712/0130',
        level: 3,
        code: '0130',
        order: 100,
        modifiedDate: '2019-03-08T06:53:18Z',
        parentItemLocalId: 'rakennus_1_20180712/013',
        parentCode: '013',
        classificationItemNames: [
            {
                langName: 'suomi',
                lang: 'fi',
                name: 'Asuntolarakennukset',
            },
        ],
        explanatoryNotes: [
            {
                type: [
                    'alkuperäinen',
                    'päivitettävä',
                ],
                langName: [
                    'suomi',
                    'suomi',
                ],
                lang: [
                    'fi',
                    'fi',
                ],
                generalNote: [
                    'Asuinrakennukset, joissa asukkailla on yhteiset keittiö-, oleskelu- tai saniteettitilat ja asuintilana ei ole asuinhuoneisto vaan jatkuvaan asumiskäyttöön soveltuva asuinhuone.  \r\n\r\nAsuntolarakennuksia ovat esimerkiksi varsinkin vanhemman rakennuskannan oppilaitosten asuntolat.',
                    'Asuinrakennukset, joissa asukkailla on yhteiset keittiö-, oleskelu- tai saniteettitilat ja asuintilana ei ole asuinhuoneisto vaan jatkuvaan asumiskäyttöön soveltuva asuinhuone.  \r\n\r\nErityisryhmien asuntolarakennuksia ovat esimerkiksi varsinkin vanhemman rakennuskannan oppilaitosten asuntolat.',
                ],
                includes: [
                    '',
                    '',
                ],
                includesAlso: [
                    '',
                    '',
                ],
                excludes: [
                    'ammattimaisesti tarjottava tilapäinen majoitus (032 Majoitusliikerakennukset).',
                    'palvelu tai tehostettu palveluasuminen (014 Erityisryhmien asuinrakennukset).',
                ],
            },
        ],
        classificationIndexEntry: [
            {
                text: [
                    'asuntola',
                    'oppilaitoksen asuntola',
                    'opiskelija-asuntola',
                    'työmaa-asuntola',
                    'kodittomien asuntola',
                ],
            },
        ],
    },
    {
        classification: {
            localId: 'rakennus_1_20180712',
            internationalRecommendation: false,
            nationalRecommendation: true,
            classificationName: [
                {
                    langName: 'suomi',
                    lang: 'fi',
                    name: 'Rakennusluokitus 2018',
                },
            ],
            classificationDescription: [
                {
                    langName: 'suomi',
                    lang: 'fi',
                    description: 'Tilastokeskuksen tilastoissa on vielä toistaiseksi käytössä Rakennusluokitus 1994.\r\n\r\nRakennusluokituksessa talonrakennukset luokitellaan niiden pääasiallisen käyttötarkoituksen, eli  rakennuksessa harjoitettavan toiminnan vaatimien tilojen mukaan.',
                },
            ],
        },
        localId: 'rakennus_1_20180712/0140',
        level: 3,
        code: '0140',
        order: 120,
        modifiedDate: '2019-03-08T06:53:18Z',
        parentItemLocalId: 'rakennus_1_20180712/014',
        parentCode: '014',
        classificationItemNames: [
            {
                langName: 'suomi',
                lang: 'fi',
                name: 'Erityisryhmien asuinrakennukset',
            },
        ],
        explanatoryNotes: [
            {
                type: [
                    'alkuperäinen',
                ],
                langName: [
                    'suomi',
                ],
                lang: [
                    'fi',
                ],
                generalNote: [
                    'Toimintarajoitteisille, asumisessaan tavanomaisesta poikkeavia hoito-, tuki- tai muita palveluja tarvitseville henkilöille tarkoitetut asuinrakennukset, joissa on poikkeuksellisia tila- ja varusteratkaisuja ja joissa on tarjolla palveluasumista tai tehostettua palveluasumista. \n\nErityisryhmien asuinrakennuksissa asukkaan asuintilana on asuinhuoneisto tai muu jatkuvaan asumiskäyttöön soveltuva asuinhuone. Erityisryhmien asuinrakennukset on tarkoitettu esimerkiksi huonokuntoisille tai muistisairaille iäkkäille, vammaisille henkilöille tai mielenterveys- ja päihdekuntoutujille. Palveluasumisessa palvelunantaja järjestää asiakkaalle palveluasunnon ja sinne osavuorokautisesti asiakkaan tarvitsemaa hoitoa ja huolenpitoa sekä asumiseen liittyviä palveluja.Tehostetussa palveluasumisessa palvelunantaja järjestää asiakkaalle palveluasunnon ja sinne asiakkaan tarvitsemaa hoitoa ja huolenpitoa sekä asumiseen liittyviä palveluja asiakkaan ympärivuorokautiseen hoidon ja huolenpidon tarpeeseen. Molempiin sisältyvät asiakkaan tarvitsemat ateria-, vaatehuolto-, peseytymis- ja siivouspalvelut sekä osallisuutta ja sosiaalista kanssakäymistä edistävät palvelut. Erityisryhmien asuinrakennuksissa tarjottavien palvelujen tyyppi ja määrä vaihtelee asiakkaan tarpeen ja palvelunantajan palveluvalikoiman mukaan. Palvelunantaja voi olla julkinen tai yksityinen.  Asumispalveluissa asiakkaan asuminen perustuu aina asunnon hallintasuhteeseen (vuokra tai omistus). Laitoshoidossa asiakas on hoitosuhteessa laitokseen.',
                ],
                excludes: [
                    'rakennukset, joissa annetaan pääasiassa ympärivuorokautista hoitoa ja joissa on pysyviä vuodepaikkoja (0620 Laitospalvelujen rakennukset).',
                ],
            },
        ],
        classificationIndexEntry: [
            {
                text: [
                    'vammaisten palvelutalo',
                    'vanhusten palvelutalo',
                    'kuntoutuskoti',
                ],
            },
        ],
    },
    {
        classification: {
            localId: 'rakennus_1_20180712',
            internationalRecommendation: false,
            nationalRecommendation: true,
            classificationName: [
                {
                    langName: 'suomi',
                    lang: 'fi',
                    name: 'Rakennusluokitus 2018',
                },
            ],
            classificationDescription: [
                {
                    langName: 'suomi',
                    lang: 'fi',
                    description: 'Tilastokeskuksen tilastoissa on vielä toistaiseksi käytössä Rakennusluokitus 1994.\r\n\r\nRakennusluokituksessa talonrakennukset luokitellaan niiden pääasiallisen käyttötarkoituksen, eli  rakennuksessa harjoitettavan toiminnan vaatimien tilojen mukaan.',
                },
            ],
        },
        localId: 'rakennus_1_20180712/0210',
        level: 3,
        code: '0210',
        order: 150,
        modifiedDate: '2019-03-08T06:53:18Z',
        parentItemLocalId: 'rakennus_1_20180712/021',
        parentCode: '021',
        classificationItemNames: [
            {
                langName: 'suomi',
                lang: 'fi',
                name: 'Ympärivuotiseen käyttöön soveltuvat vapaa-ajan asuinrakennukset',
            },
        ],
        explanatoryNotes: [
            {
                type: [
                    'alkuperäinen',
                ],
                langName: [
                    'suomi',
                ],
                lang: [
                    'fi',
                ],
                generalNote: [
                    'Vapaa-ajan asuinrakennukset, jotka on rakennettu ja varusteltu niin, että niissä voi oleskella ympärivuotisesti.',
                ],
            },
        ],
        classificationIndexEntry: [
            {
                text: [
                    'talviasuttava vapaa-ajan rakennus',
                ],
            },
        ],
    },
    {
        classification: {
            localId: 'rakennus_1_20180712',
            internationalRecommendation: false,
            nationalRecommendation: true,
            classificationName: [
                {
                    langName: 'suomi',
                    lang: 'fi',
                    name: 'Rakennusluokitus 2018',
                },
            ],
            classificationDescription: [
                {
                    langName: 'suomi',
                    lang: 'fi',
                    description: 'Tilastokeskuksen tilastoissa on vielä toistaiseksi käytössä Rakennusluokitus 1994.\r\n\r\nRakennusluokituksessa talonrakennukset luokitellaan niiden pääasiallisen käyttötarkoituksen, eli  rakennuksessa harjoitettavan toiminnan vaatimien tilojen mukaan.',
                },
            ],
        },
        localId: 'rakennus_1_20180712/0211',
        level: 3,
        code: '0211',
        order: 160,
        modifiedDate: '2019-03-08T06:53:18Z',
        parentItemLocalId: 'rakennus_1_20180712/021',
        parentCode: '021',
        classificationItemNames: [
            {
                langName: 'suomi',
                lang: 'fi',
                name: 'Osavuotiseen käyttöön soveltuvat vapaa-ajan asuinrakennukset',
            },
        ],
        explanatoryNotes: [
            {
                type: [
                    'alkuperäinen',
                ],
                langName: [
                    'suomi',
                ],
                lang: [
                    'fi',
                ],
                generalNote: [
                    'Vapaa-ajan asuinrakennukset, jotka on rakennettu ja varusteltu vain lämpimään vuodenaikaan tapahtuvaa oleskelua varten.',
                ],
            },
        ],
        classificationIndexEntry: [
            {
                text: [],
            },
        ],
    },
    {
        classification: {
            localId: 'rakennus_1_20180712',
            internationalRecommendation: false,
            nationalRecommendation: true,
            classificationName: [
                {
                    langName: 'suomi',
                    lang: 'fi',
                    name: 'Rakennusluokitus 2018',
                },
            ],
            classificationDescription: [
                {
                    langName: 'suomi',
                    lang: 'fi',
                    description: 'Tilastokeskuksen tilastoissa on vielä toistaiseksi käytössä Rakennusluokitus 1994.\r\n\r\nRakennusluokituksessa talonrakennukset luokitellaan niiden pääasiallisen käyttötarkoituksen, eli  rakennuksessa harjoitettavan toiminnan vaatimien tilojen mukaan.',
                },
            ],
        },
        localId: 'rakennus_1_20180712/0310',
        level: 3,
        code: '0310',
        order: 190,
        modifiedDate: '2019-03-08T06:53:18Z',
        parentItemLocalId: 'rakennus_1_20180712/031',
        parentCode: '031',
        classificationItemNames: [
            {
                langName: 'suomi',
                lang: 'fi',
                name: 'Tukku- ja vähittäiskaupan myymälähallit',
            },
        ],
        explanatoryNotes: [
            {
                type: [
                    'alkuperäinen',
                    'päivitettävä',
                ],
                langName: [
                    'suomi',
                    'suomi',
                ],
                lang: [
                    'fi',
                    'fi',
                ],
                generalNote: [
                    'Yksikerroksiset, lähes yhtenäistä hallimaista tilaa sisältävät myymälärakennukset. \r\n\r\nTukku- ja vähittäiskaupan myymälähalleissa ei ole väliseiniä, vaan koko rakennus on yhtenäistä tilaa.Tukku- ja vähittäiskaupan myymälähalleja koskevat erilaiset rakennusmääräykset kuin kauppakeskuksia ja liike- ja tavarataloja tai muita myymälärakennuksia. Tukku- ja vähittäiskaupan myymälähalleja ovat esimerkiksi päivittäistavarakaupan myymälähallit, kauppahallit, autokaupat, -huoltamot ja -korjaamot.',
                    'Yksikerroksiset, lähes yhtenäistä hallimaista tilaa sisältävät myymälärakennukset. \r\n\r\nTukku- ja vähittäiskaupan myymälähalleissa ei ole väliseiniä, vaan koko rakennus on yhtenäistä tilaa.Tukku- ja vähittäiskaupan myymälähalleja koskevat erilaiset rakennusmääräykset kuin kauppakeskuksia ja liike- ja tavarataloja tai muita myymälärakennuksia. Tyypillisiä tukku- ja vähittäiskaupan myymälähalleja ovat esimerkiksi päivittäistavarakaupan myymälähallit, kauppahallit, autokaupat, -huoltamot ja -korjaamot. Ei hallimaisina nämä rakennukset kuuluvat luokkaan 0319 Muut myymälärakennukset',
                ],
                includes: [
                    '',
                    '',
                ],
                includesAlso: [
                    '',
                    '',
                ],
                excludes: [
                    'kylmäasemat (0319 Muut myymälärakennukset).',
                    'taidegalleriat (0713 Museot ja taidegalleriat).',
                ],
            },
        ],
        classificationIndexEntry: [
            {
                text: [
                    'päivittäistavarakaupan myymälähalli',
                    'kauppahalli',
                    'huutokauppahalli',
                    'rautakauppa',
                    'autokauppa',
                    'huoltoasema',
                    'autohuoltamo',
                    'huoltamo',
                    'polttoaineen jakeluasema',
                    'autopesula',
                    'autokorjaamo',
                    'automaalaamo',
                    'ruostesuojaamo',
                    'autosuojaamo',
                    'autokatsastusasema',
                    'katsastusasema',
                ],
            },
        ],
    },
    {
        classification: {
            localId: 'rakennus_1_20180712',
            internationalRecommendation: false,
            nationalRecommendation: true,
            classificationName: [
                {
                    langName: 'suomi',
                    lang: 'fi',
                    name: 'Rakennusluokitus 2018',
                },
            ],
            classificationDescription: [
                {
                    langName: 'suomi',
                    lang: 'fi',
                    description: 'Tilastokeskuksen tilastoissa on vielä toistaiseksi käytössä Rakennusluokitus 1994.\r\n\r\nRakennusluokituksessa talonrakennukset luokitellaan niiden pääasiallisen käyttötarkoituksen, eli  rakennuksessa harjoitettavan toiminnan vaatimien tilojen mukaan.',
                },
            ],
        },
        localId: 'rakennus_1_20180712/0512',
        level: 3,
        code: '0512',
        order: 360,
        modifiedDate: '2019-03-08T06:53:18Z',
        parentItemLocalId: 'rakennus_1_20180712/051',
        parentCode: '051',
        classificationItemNames: [
            {
                langName: 'suomi',
                lang: 'fi',
                name: 'Ammattiliikenteen kaluston huoltorakennukset',
            },
        ],
        explanatoryNotes: [
            {
                type: [
                    'alkuperäinen',
                    'päivitettävä',
                ],
                langName: [
                    'suomi',
                    'suomi',
                ],
                lang: [
                    'fi',
                    'fi',
                ],
                generalNote: [
                    'Umpinaiset, lämmitetyt liikenne- ja kuljetusalan rakennukset, jotka on tarkoitettu ammattiliikenteen kulkuneuvojen ja raskaiden työkoneiden huoltamiseen ja korjaamiseen.',
                    'Umpinaiset, lämmitetyt liikenne- ja kuljetusalan rakennukset, jotka on tarkoitettu ammattiliikenteen kulkuneuvojen ja raskaiden työkoneiden huoltamiseen ja korjaamiseen.',
                ],
                includes: [
                    '',
                    '',
                ],
                includesAlso: [
                    '',
                    'Ammattiliikenteen kaluston suojarakennukset, jotka ovat varusteltu siten, että niissä voi suorittaa myös kaluston huolto- ja korjaustöitä.',
                ],
                excludes: [
                    'muun kuin ammattiliikenteen kaluston huoltorakennukset, kuten autokorjaamot, -maalaamot ja -pesulat (0310 Tukku- ja vähittäiskaupan myymälähallit).',
                    'muun kuin ammattiliikenteen kaluston huoltorakennukset, kuten autokorjaamot, -maalaamot ja -pesulat (0310 Tukku- ja vähittäiskaupan myymälähallit).',
                ],
            },
        ],
        classificationIndexEntry: [
            {
                text: [
                    'ammattiliikenteen huoltorakennus',
                    'raideliikenteen huoltorakennus',
                    'raideliikenteen korjaamorakennus',
                    'ammattimaisen ajoneuvoliikenteen huoltorakennus',
                    'ammattimaisen ajoneuvoliikenteen korjaamorakennus',
                    'ajoneuvoliikenteen huoltorakennus',
                    'ajoneuvoliikenteen korjaamorakennus',
                    'lentokoneen huoltorakennus',
                    'lentokoneen korjaamorakennus',
                    'lentokonehalli',
                ],
            },
        ],
    },
];

export {questions, buildingClasses, classifications, mockResponse};
