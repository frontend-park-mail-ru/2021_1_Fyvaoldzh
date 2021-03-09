'use strict';

const backendServerUrl = 'http://95.163.180.8:1323/api/v1/';

const allEventsUrl = 'http://95.163.180.8:1323/api/v1/';
const oneEventUrl = 'http://95.163.180.8:1323/api/v1/event/';
const postLoginDataUrl = 'http://95.163.180.8:1323/api/v1/login';
const postRegistrationDataUrl = 'http://95.163.180.8:1323/api/v1/register';

export async function getAllEventsJson() {
    let answer = await fetch(allEventsUrl);
    let jsonFile = await answer.json();
    console.log(answer);
    return jsonFile;
}

export async function getEventById(id) {
    let answer = await fetch(oneEventUrl + id);
    let jsonFile = await answer.json();
    console.log(jsonFile);
    return jsonFile;
}

export async function postRegistationData(jsonString) {
    let answer = await fetch(postRegistrationDataUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: jsonString
    })
    let result = await answer.json();
    return result;
}

export async function postLoginData(jsonString) {
    let answer = await fetch(postLoginDataUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: jsonString
    })
    console.log(answer);
    let result = await answer.json();
    return result;
}