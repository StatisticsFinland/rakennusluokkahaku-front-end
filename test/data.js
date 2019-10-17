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

export {questions, buildingClasses};
