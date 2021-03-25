'use strict';

const backendServerUrl = 'http://95.163.180.8:1323/api/v1/';

const allEventsUrl = 'http://95.163.180.8:1323/api/v1/';
const oneEventUrl = 'http://95.163.180.8:1323/api/v1/event/';
const oneProfileUrl = 'http://95.163.180.8:1323/api/v1/profile/1';
const postLoginDataUrl = 'http://95.163.180.8:1323/api/v1/login';
const postRegistrationDataUrl = 'http://95.163.180.8:1323/api/v1/register';

const currentProfileUrl = 'http://95.163.180.8:1323/api/v1/profile';
const logout = 'http://95.163.180.8:1323/api/v1/logout';
const putAvatarUrl = 'http://95.163.180.8:1323/api/v1/upload_avatar';

/**
 * Функция для получения ивентов
 * @return {json} - возвращает json
 */

export async function getAllEventsJson() {
  let answer = await fetch(allEventsUrl);
  let jsonFile = await answer.json();
  return jsonFile;
}

/**
 * Функция для получения ивента по id
 * @param {uint64} id - форма для валидации
 * @return {json} - json ивента
 */

export async function getEventById(id) {
  let answer = await fetch(oneEventUrl + id);
  let jsonFile = await answer.json();
  console.log(jsonFile);
  return jsonFile;
}

/**
 * Функция для получения профиля по id
 * @return {json} - json профиля
 */

export async function getProfileById() {
  let answer = await fetch(oneProfileUrl);
  let jsonFile = await answer.json();
  console.log(jsonFile);
  return jsonFile;
}

/**
 * Функция для регистрации
 * @param {json} jsonString - данные в формате json
 * @return {Response} answer - ответ
 */

export async function postRegistationData(jsonString) {
  let answer = await fetch(postRegistrationDataUrl, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: jsonString,
  });
  return answer;
}

/**
 * Функция для логина
 * @param {json} jsonString - данные в формате json
 * @return {Response} answer - ответ
 */

export async function postLoginData(jsonString) {
  let answer = await fetch(postLoginDataUrl, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: jsonString,
  });
  console.log(answer);
  return answer;
}

/**
 * Функция для обновления профиля
 * @param {json} jsonString - данные обновленные в формате json
 * @return {Response} answer - ответ
 */

export async function postProfileData(jsonString) {
  let answer = await fetch(currentProfileUrl, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: jsonString,
  });
  let a = await answer.text();
  console.log(a);
  return answer;
}

/**
 * Функция для получения профиля текущего пользователя
 * @return {Response} answer - ответ
 */

export async function getLoggedProfileData() {
  let answer = await fetch(currentProfileUrl, {credentials: 'include'});
  return answer;
}

/**
 * Функция для выхода из системы
 * @return {Response} answer - ответ
 */

export async function logoutFunc() {
  let answer = await fetch(logout, {credentials: 'include'});
  return answer;
}

/**
 * Функция для обновления аватара
 * @param {FormData} file -
 * @return {Response} answer - ответ
 */

export async function putAvatar(file) {
  let answer = await fetch(putAvatarUrl, {
    method: 'PUT',
    credentials: 'include',
    body: file,
  });
  return answer;
}
