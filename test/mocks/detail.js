function mockResponse(body) {
    return new window.Response(JSON.stringify(body), {
        status: 200,
        headers: {'Content-type': 'application/json'},
    });
}

const simpleClassification = {
    detail: {
        code: '0110',
        name: 'Omakotitalot',
        note: 'Pientalot, joissa on yksi asuinhuoneisto.',
    },
};

const complexClassification = {
    detail: {
        code: '0110',
        name: 'Omakotitalot',
        note: 'Pientalot, joissa on yksi asuinhuoneisto.',
        includes: ['pientalot'],
        excludes: ['kerrostalot'],
        includesAlso: ['luhtitalot'],
        keywords: 'yhden asunnon talo, yksiasuntoinen pientalo, yhden asunnon pientalo, yhden asuinhuoneiston talo, townhouse-talo, kaupunkipientalo',
    },
};

export {mockResponse, simpleClassification, complexClassification};
