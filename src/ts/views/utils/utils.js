/**
 * Функция для склонения слов, стоящих после чисел
 * @param {Number} number - само число
 * @param {Object} titles - массив из трёх string - склонений слова в именительном падеже ед.ч., родительном падеже ед.ч., родительном падеже мн.ч.
 * @return {String} - Строка со словом в нужном склонении и пробелом впереди
 */

export const addDeclensionOfNumbers = (number, titles) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return ' ' + titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
};

/**
 * Функция-обработчик нажатия по кнопке-переключателю
 * @param {Object} event - ивент
 * @return {Response} answer - ответ
 */

export function buttonToggleHandler(event) {
  const {target} = event;
  if (target.classList.contains('tab-inactive')) {
    const curActiveElem = target.parentNode.querySelector('.tab-active');
    curActiveElem.classList.add('tab-inactive');
    target.classList.add('tab-active');
    target.classList.remove('tab-inactive');
    curActiveElem.classList.remove('tab-active');
    this.actions.changeTab(target.id);
  }

  if (target.classList.contains('button-inactive')) {
    const curActiveElem = target.parentNode.querySelector('.button-active');
    curActiveElem.classList.add('button-inactive');
    target.classList.add('button-active');
    target.classList.remove('button-inactive');
    curActiveElem.classList.remove('button-active');

    if (this.constructor.name === 'UserView') {
      this.actions.changeUserEventsButton(target.id);
    } else if (this.constructor.name === 'OneProfileView') {
      this.actions.changeOneProfileEventsButton(target.id);
    }
  }
}
