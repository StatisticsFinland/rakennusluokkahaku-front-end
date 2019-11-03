async function sleep(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function mockResponse(body) {
    return new window.Response(JSON.stringify(body), {
        status: 200,
        headers: {'Content-type': 'application/json'},
    });
}

export {sleep, mockResponse};
