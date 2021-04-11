import { urlMap } from '../config/config';

/**
 * Функция для получения ивентов
 * @return {json} - возвращает массив json-ов
 */

export async function getAllEventsJson() {
  try {
    const answer = await fetch(urlMap.allEventsUrl);
    const jsonFile = await answer.json();
    return jsonFile;
  } catch(err) {
    if (!navigator.onLine) {
      location.reload();
    }
  }
}

/**
 * Функция для получения ивента по id
 * @param {uint64} id - форма для валидации
 * @return {json} - json ивента
 */

export async function getEventById(id: number) {
  try {
    const answer = await fetch(urlMap.oneEventUrl + id);
    const jsonFile = await answer.json();
    return jsonFile;
  } catch(err) {
    if (!navigator.onLine) {
      location.reload();
    }
  }
}

/**
 * Функция для регистрации
 * @param {json} toPost - данные.
 * @return {Response} answer - ответ
 */

export async function postRegistrationData(toPost: object) {
  try {
    const answer = await fetch(urlMap.postRegistrationDataUrl, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(toPost),
    });
    return answer;
  } catch(err) {
    if (!navigator.onLine) {
      location.reload();
    }
  }
}

/**
 * Функция для логина
 * @param {json} jsonString - данные в формате json
 * @return {Response} answer - ответ
 */

export async function postLoginData(data: object) {
  try {
    const answer = await fetch(urlMap.postLoginDataUrl, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    });
    return answer;
  } catch(err) {
    if (!navigator.onLine) {
      location.reload();
    }
  }

}

/**
 * Функция для обновления профиля
 * @param {json} jsonString - данные обновленные в формате json
 * @return {Response} answer - ответ
 */

export async function postProfileData(data: object) {
  try {
    const answer = await fetch(urlMap.currentProfileUrl, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    });
    return answer;
  } catch(err) {
    if (!navigator.onLine) {
      location.reload();
    }
  }

}

/**
 * Функция для получения профиля текущего пользователя
 * @return {Response} answer - ответ
 */

export async function getLoggedProfileData() {
  try {
    const answer = await fetch(urlMap.currentProfileUrl, { credentials: 'include' });
    const answerJson = await answer.json();
    return answerJson;
  } catch(err) {
    if (!navigator.onLine) {
      location.reload();
    }
  }
}

/**
 * Функция для выхода из системы
 * @return {Response} answer - ответ
 */

export async function logoutFunc() {
  try {
    const answer = await fetch(urlMap.logout, { credentials: 'include' });
    return answer;
  } catch(err) {
    if (!navigator.onLine) {
      location.reload();
    }
  }
}

/**
 * Функция для обновления аватара
 * @param {FormData} file -
 * @return {Response} answer - ответ
 */

export async function putAvatar(form: FormData) {
  try {
    const answer = await fetch(urlMap.putAvatarUrl, {
      method: 'PUT',
      credentials: 'include',
      body: form,
    });
    return answer;
  } catch(err) {
    if (!navigator.onLine) {
      location.reload();
    }
  }
}

export async function getProfileDataById(id: Number) {
  try {
    const answer = await fetch(`${urlMap.apiUrl}/profile/${id}`, { credentials: 'include' });
    const answerJson = await answer.json();
    return answerJson;
  } catch(err) {
    if (!navigator.onLine) {
      location.reload();
    }
  }
}
