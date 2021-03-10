'use strict';

const backendServerUrl = 'http://95.163.180.8:1323/api/v1/';

const allEventsUrl = 'http://95.163.180.8:1323/api/v1/';
const oneEventUrl = 'http://95.163.180.8:1323/api/v1/event/';
const postLoginDataUrl = 'http://95.163.180.8:1323/api/v1/login';
const postRegistrationDataUrl = 'http://95.163.180.8:1323/api/v1/register';

const currentProfileUrl = 'http://95.163.180.8:1323/api/v1/profile';
const logout = 'http://95.163.180.8:1323/api/v1/logout';
const putAvatarUrl = 'http://95.163.180.8:1323/api/v1/upload_avatar';

export async function getAllEventsJson() {
    let answer = await fetch(allEventsUrl);
    let jsonFile = await answer.json();
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
    return answer;
}

export async function postLoginData(jsonString) {
    let answer = await fetch(postLoginDataUrl, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: jsonString
    })
    console.log(answer);
    return answer;
}

export async function postProfileData(jsonString) {
    let answer = await fetch(currentProfileUrl, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: jsonString
    })
    let a = await answer.text();
    console.log(a);
    return answer;
}

export async function getLoggedProfileData() {
    let answer = await fetch(currentProfileUrl, {credentials: 'include'});
    return answer;
}

export async function logoutFunc() {
    let answer = await fetch(logout, {credentials: 'include'});
    return answer;
}

export async function putAvatar(file) {
    let answer = await fetch(putAvatarUrl, {
        method: 'PUT',
        credentials: 'include',
        body: file
    })
    return answer;
}