import { urlMap } from '../config/config';

function getCsrf() {
  const name = '_csrf';
  const matches = document.cookie.match(
    new RegExp(`(?:^|s)${name.replace(/([.$?*+\\/{}|()[\]^])/g, '\\$1')}=(.*?)(?:;|$)`),
  );
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
    category = '';
  }

  try {
    const answer = await fetch(`${urlMap.allEventsUrl}?page=${page}&category=${category}`, {
      credentials: 'include',
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
    return await answer.json();
  } catch (err) {
    if (!navigator.onLine) {
      location.reload();
    }
  }
}

export async function getRecommendEvents(page?: number) {
  if (!page) {
    page = 1;
  }

  try {
    const answer = await fetch(`${urlMap.recommendationsEventsUrl}?page=${page}`, {
      credentials: 'include',
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
    return await answer.json();
  } catch (err) {
    if (!navigator.onLine) {
      location.reload();
    }
  }
}

/**
 * Функция для получения ивента по id
 * @param {number} id - форма для валидации
 * @return {json} - json ивента
 */

export async function getEventById(id: number) {
  try {
    const answer = await fetch(urlMap.oneEventUrl + id, {
      credentials: 'include',
    });
    return await answer.json();
  } catch (err) {
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
  try {
    return await fetch(urlMap.postRegistrationDataUrl, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'X-XSRF-TOKEN': csrf,
      },
      body: JSON.stringify(toPost),
    });
  } catch (err) {
    if (!navigator.onLine) {
      location.reload();
    }
  }
}

/**
 * Функция для логина
 * @return {Response} answer - ответ
 * @param data
 */

export async function postLoginData(data: object) {
  const csrf = getCsrf();
  try {
    return await fetch(urlMap.postLoginDataUrl, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'X-XSRF-TOKEN': csrf,
      },
      body: JSON.stringify(data),
    });
  } catch (err) {
    if (!navigator.onLine) {
      location.reload();
    }
  }
}

/**
 * Функция для обновления профиля
 * @return {Response} answer - ответ
 * @param data
 */

export async function postProfileData(data: object) {
  const csrf = getCsrf();
  try {
    return await fetch(urlMap.currentProfileUrl, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'X-XSRF-TOKEN': csrf,
      },
      body: JSON.stringify(data),
    });
  } catch (err) {
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
    const answer = await fetch(urlMap.currentProfileUrl, {
      credentials: 'include',
    });
    return await answer.json();
  } catch (err) {
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
  const csrf = getCsrf();
  try {
    return await fetch(urlMap.logout, {
      credentials: 'include',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'X-XSRF-TOKEN': csrf,
      },
    });
  } catch (err) {
    if (!navigator.onLine) {
      location.reload();
    }
  }
}

/**
 * Функция для обновления аватара
 * @return {Response} answer - ответ
 * @param form
 */

export async function putAvatar(form: FormData) {
  const csrf = getCsrf();
  try {
    return await fetch(urlMap.putAvatarUrl, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'X-XSRF-TOKEN': csrf,
      },
      body: form,
    });
  } catch (err) {
    if (!navigator.onLine) {
      location.reload();
    }
  }
}

/**
 * Функция для получения профиля по id
 * @return {json} - json профиля
 */

export async function getProfileById(id: number) {
  try {
    const answer = await fetch(`${urlMap.oneProfileUrl}${id}`, {
      credentials: 'include',
    });
    return await answer.json();
  } catch (err) {
    if (!navigator.onLine) {
      location.reload();
    }
  }
}

export async function addPlanning(id: number) {
  const csrf = getCsrf();
  try {
    return await fetch(`${urlMap.addPlanningEventUrl}/${id}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'X-XSRF-TOKEN': csrf,
      },
    });
  } catch (err) {
    if (!navigator.onLine) {
      location.reload();
    }
  }
}

export async function removePlanning(id: number) {
  const csrf = getCsrf();
  try {
    return await fetch(`${urlMap.removePlanningEventUrl}/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'X-XSRF-TOKEN': csrf,
      },
    });
  } catch (err) {
    if (!navigator.onLine) {
      location.reload();
    }
  }
}

export async function checkPlanningEvent(id: number) {
  const csrf = getCsrf();
  try {
    const answer = await fetch(`${urlMap.checkPlanningEventUrl}/${id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'X-XSRF-TOKEN': csrf,
      },
    });
    return await answer.json();
  } catch (err) {
    if (!navigator.onLine) {
      location.reload();
    }
  }
}

//
// export async function getEventsByParams(find = '', category = '', page = '') {  //реализация Димы
//   const csrf = getCsrf();
//   const url = new URL(urlMap.customEventUrl);
//   const params = { find, page, category };
//   url.search = new URLSearchParams(params).toString();
//   try {
//     const answer = await fetch(url.toString(), {
//       method: 'GET',
//       credentials: 'include',
//       headers: {
//         'X-XSRF-TOKEN': csrf,
//       },
//     });
//     const jsonFile = await answer.json();
//     return jsonFile;
//   } catch (err) {
//     if (!navigator.onLine) {
//       location.reload();
//     }
//   }
// }
//
// /**
//  * Функция для получения пользователей по номеру страницы
//  * @param {Number | String} page - номер текущей страницы поиска
//  * @return {json} - json, содержащий найденных пользователей
//  */
//
// export async function getUsersByParams(page = '') {  //реализация Димы
//   try {
//     const url = new URL(urlMap.customUserUrl);
//     const params = { page };
//     url.search = new URLSearchParams(params).toString();
//     const answer = await fetch(url.toString());
//     const jsonFile = await answer.json();
//     return jsonFile;
//   } catch (err) {
//     if (!navigator.onLine) {
//       location.reload();
//     }
//   }
// }

/**
 * Функция для получения ивентов по части названия, номеру страницы и категории
 * @param {String} find - часть названия ивента
 * @param {Number | String} category - категория ивента
 * @param {Number | String} page - номер текущей страницы поиска
 * @return {json} - json, содержащий найденные ивенты
 */

export async function getEventsByParams( // моя реализация
  find: string = '',
  category: number | string = '',
  page: number | string = '',
) {
  const url = new URL(urlMap.customEventUrl);
  // const params = { find: find, page: page, category: category };
  const params = [
    ['find', `${find}`],
    ['page', `${page}`],
    ['category', `${category}`],
  ];
  url.search = new URLSearchParams(params).toString();
  const answer = await fetch(url.toString());
  const jsonFile = await answer.json();
  return jsonFile;
}

/**
 * Функция для получения пользователей по номеру страницы
 * @param {Number | String} page - номер текущей страницы поиска
 * @return {json} - json, содержащий найденных пользователей
 */

export async function getUsersByParams(page: number | string = '1') {
  // моя реализация
  const url = new URL(urlMap.customUserUrl);
  const params = [['page', `${page}`]];
  url.search = new URLSearchParams(params).toString();
  const answer = await fetch(url.toString());
  const jsonFile = await answer.json();
  return jsonFile;
}

/**
 * Функция для получения планируемых мероприятий пользователя по его id
 * @param {number} id - id пользователя
 * @return {json} - json планируемых мероприятий
 */

export async function getPlanningEventsById(id: number) {
  const answer = await fetch(urlMap.planningEventsUrl + id);
  const jsonFile = await answer.json();
  return jsonFile;
}

/**
 * Функция для получения посещенных мероприятий пользователя по его id
 * @param {number} id - id пользователя
 * @return {json} - json посещенных мероприятий
 */

export async function getVisitedEventsById(id: number) {
  const answer = await fetch(urlMap.visitedEventsUrl + id);
  const jsonFile = await answer.json();
  return jsonFile;
}
