import { ActionsInterface } from '../interfaces';

export default class Dispatcher {
  public channel: Array<Function>;

  constructor() {
    this.channel = []; //в каждом ченнеле хранится перечень функций, которые вызываются только все вместе(по очереди), получают на вход одно и то же, и в совокупности выполняют какую-то одну большую задачу(?)
    //у dispatcher один ченнел, а у eventBus безлимитное кол-во?
  }

<<<<<<< HEAD:src/ts/dispatcher/dispatcher.ts
  dispatch(action: ActionsInterface) {
    this.channel.forEach((listener) => listener(action));
=======
  dispatch(action) {
    this.channel.forEach(listener => listener(action)); //вызываются все функции внутри ченнела(хотя нужна какая-то одна)
>>>>>>> origin/dev:public/js/dispatcher/dispatcher.js
  }

  register(listener: Function) {
    this.channel.push(listener);
  }
}
