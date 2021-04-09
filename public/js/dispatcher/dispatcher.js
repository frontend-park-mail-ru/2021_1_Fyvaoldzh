export default class Dispatcher {
  constructor() {
    this.channel = []; //в каждом ченнеле хранится перечень функций, которые вызываются только все вместе(по очереди), получают на вход одно и то же, и в совокупности выполняют какую-то одну большую задачу(?)
    //у dispatcher один ченнел, а у eventBus безлимитное кол-во?
  }

  dispatch(action) {
    this.channel.forEach(listener => listener(action)); //вызываются все функции внутри ченнела(хотя нужна какая-то одна)
  }

  register(listener) {
    this.channel.push(listener);
  }
}
