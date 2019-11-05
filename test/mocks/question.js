// 4 simple questions to play around with
const questions = [
    {
        type: 'simple',
        attribute_id: '1',
        attribute_name: 'Asunnot',
        attribute_question: 'Onko rakennus asunto?',
    },
    {
        type: 'simple',
        attribute_id: '101',
        attribute_name: 'Asuinhuone',
        attribute_question: '',
    },
    {
        type: 'simple',
        attribute_id: '102',
        attribute_name: 'Eteinen',
        attribute_question: '',
    },
    {
        type: 'simple',
        attribute_id: '103',
        attribute_name: 'Keittiö',
        attribute_question: '',
    },
];

// 2 multiquestions for testingpourposes
const multiQuestions = [
    {
        type: 'multi',
        attribute_question: 'Minkälaisia vessoja tilassa on?',
        attributes: [
            {
                name: 'WC',
                id: '100',
            },
            {
                name: 'WC, esteetön',
                id: '101',
            },
            {
                name: 'PuuCee',
                id: '102',
            },
        ],
    },
    {
        type: 'multi',
        attribute_question: 'Minkälaista toimintaa rakennuksessa on?',
        attributes: [
            {
                name: 'Sairaan hoitoa',
                id: '100',
            },
            {
                name: 'Koulutusta',
                id: '101',
            },
            {
                name: 'Juttuja',
                id: '102',
            },
            {
                name: 'muita juttuja',
                id: '103',
            },
            {
                name: 'vielä lisää asioita',
                id: '104',
            },
        ],
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

export {questions, multiQuestions, buildingClasses};
