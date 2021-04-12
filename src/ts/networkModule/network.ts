import { urlMap } from '../config/config';

function getCsrf() {
  const name = '_csrf';
  const matches = document.cookie.match(new RegExp(
    '(?:^|\s)' + name.replace(/([.$?*+\\\/{}|()\[\]^])/g, '\\$1') + '=(.*?)(?:;|$)'
));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}


/**
 * Функция для получения ивентов
 * @return {json} - возвращает массив json-ов
 */

export async function getAllEventsJson(page?: number, category?: string) {
  if (!page) {
    page = 1;
  }

  if (!category) {
    category='';
  }

  try {
    const answer = await fetch(`${urlMap.allEventsUrl}?page=${page}&category=${category}`, {
      credentials: 'include',
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
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
  const csrf = getCsrf();

  console.log(csrf);
  try {
    const answer = await fetch(urlMap.postRegistrationDataUrl, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'X-XSRF-TOKEN': csrf,
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
  const csrf = getCsrf();
  try {
    const answer = await fetch(urlMap.postLoginDataUrl, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'X-XSRF-TOKEN': csrf,
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
  const csrf = getCsrf();
  try {
    const answer = await fetch(urlMap.currentProfileUrl, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'X-XSRF-TOKEN': csrf,
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
  const csrf = getCsrf();
  try {
    const answer = await fetch(urlMap.putAvatarUrl, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'X-XSRF-TOKEN': csrf,
      },
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
