const VALIDATION_ERR_MESSAGES = {
  LOGIN: 'Логин должен содержать минимум 5 символов латиницы, не содержать знаков препинания, кроме точки.',
  PASSWORD: 'Пароль должен содержать минимум 6 символов латиницы, цифр.',
  EMAIL: 'Неправильный формат электронной почты.',
  NAME: 'Имя не должно быть пустым или содержать цифры, спецсимволы и знаки препинания.',
  CITY: 'Введите город.',
  BIRTHDAY: 'Некорректный формат даты рождения.',
  AVATAR: 'Только картинки, пожалуйста.',
};

const INPUTS = {
  login: {
    regex: /^[a-zA-Z._0-9]{4,}$/,
    inputName: 'login',
    errorMsg: VALIDATION_ERR_MESSAGES.LOGIN,
  },
  name: {
    regex: /^[a-zA-Zа-яА-Я\s]+$/,
    inputName: 'name',
    errorMsg: VALIDATION_ERR_MESSAGES.NAME,
  },
  password: {
    regex: /[$._*^&a-zA-Z0-9]{6,}$/,
    inputName: 'password',
    errorMsg: VALIDATION_ERR_MESSAGES.PASSWORD,
  },
  email: {
    regex: /^\S+@\S+\.\S+$/,
    inputName: 'email',
    errorMsg: VALIDATION_ERR_MESSAGES.EMAIL,
  },
  city: {
    regex: /^[a-zA-Zа-яА-Я\s]+$/,
    inputName: 'city',
    errorMsg: VALIDATION_ERR_MESSAGES.CITY,
  },
  birthday: {
    regex: /^\d{4}[-]\d{2}[-]\d{2}$/,
    inputName: 'birthday',
    errorMsg: VALIDATION_ERR_MESSAGES.BIRTHDAY,
  },
  avatar: {
    inputName: 'avatar',
    errorMsg: VALIDATION_ERR_MESSAGES.AVATAR,
  },
};

export default INPUTS;
