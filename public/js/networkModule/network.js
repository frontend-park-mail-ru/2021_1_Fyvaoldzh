import { urlMap } from '../config/config.js';

/**
 * Функция для получения ивентов
 * @return {json} - возвращает массив json-ов
 */

export async function getAllEventsJson() {
  const answer = await fetch(urlMap.allEventsUrl);
  const jsonFile = await answer.json();
  return jsonFile;
}

/**
 * Функция для получения ивента по id
 * @param {uint64} id - форма для валидации
 * @return {json} - json ивента
 */

export async function getEventById(id) {
  const answer = await fetch(urlMap.oneEventUrl + id);
  const jsonFile = await answer.json();
  return jsonFile;
}

/**
 * Функция для регистрации
 * @param {json} jsonString - данные в формате json
 * @return {Response} answer - ответ
 */

export async function postRegistrationData(jsonString) {
  const answer = await fetch(urlMap.postRegistrationDataUrl, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(jsonString),
  });
  return answer;
}

/**
 * Функция для логина
 * @param {json} jsonString - данные в формате json
 * @return {Response} answer - ответ
 */

export async function postLoginData(data) {
  const answer = await fetch(urlMap.postLoginDataUrl, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  });
  return answer;
}

/**
 * Функция для обновления профиля
 * @param {json} jsonString - данные обновленные в формате json
 * @return {Response} answer - ответ
 */

export async function postProfileData(data) {
  const answer = await fetch(urlMap.currentProfileUrl, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  });
  return answer;
}

/**
 * Функция для получения профиля текущего пользователя
 * @return {Response} answer - ответ
 */

export async function getLoggedProfileData() {
  const answer = await fetch(urlMap.currentProfileUrl, { credentials: 'include' });
  const answerJson = await answer.json();
  return answerJson;
}

/**
 * Функция для выхода из системы
 * @return {Response} answer - ответ
 */

export async function logoutFunc() {
  const answer = await fetch(urlMap.logout, { credentials: 'include' });
  return answer;
}

/**
 * Функция для обновления аватара
 * @param {FormData} file -
 * @return {Response} answer - ответ
 */

export async function putAvatar(file) {
  const answer = await fetch(urlMap.putAvatarUrl, {
    method: 'PUT',
    credentials: 'include',
    body: file,
  });
  return answer;
}

export async function getProfileById(id) {
  const answer = await fetch(urlMap.oneProfileUrl + id);
  const jsonFile = await answer.json();
  return jsonFile;
}
