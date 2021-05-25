import { vlOptions, toVirtualize } from './VirtualizedListInterfaces';

function isEmpty(element: HTMLElement) {
  if (element.innerHTML === '') {
    return true;
  }

  return false;
}

export default class VirtualizedList {
  private data: object;

  private component: any;

  private height: number;

  private offset: number;

  private elementWrapperName: string;

  private collection: HTMLCollection;

  private isVirtualized: Array<boolean> = [];

  private container: HTMLElement;

  private onePageSize: number;

  private countPages: number;

  private uploadingContent: boolean;

  private endOfData: boolean;

  private uploadContentFunction: Function;

  constructor(options: vlOptions) {
    this.data = options.data;
    this.component = options.component;
    this.height = options.height;
    this.offset = options.offset || 100;
    this.collection = document.getElementsByClassName(options.elementWrapperName);
    this.container = options.container;
    this.elementWrapperName = options.elementWrapperName;
    this.onePageSize = options.onePageSize;
    this.uploadContentFunction = options.uploadContent;
    this.uploadingContent = false;
    this.endOfData = false;
    this.countPages = 1;

    this.handlerScroll = this.handlerScroll.bind(this);
  }

  private isVisible(el: HTMLElement) {
    const rect = el.getBoundingClientRect();
    const frameHeight = window.innerHeight;

    if (rect.top - this.offset < frameHeight && rect.top + this.offset + this.height >= 0) {
      return true;
    }

    return false;
  }


  private handlerScroll() {
    let index = 0;

    Array.from(this.collection).forEach((el: HTMLElement) => {
      if (this.isVisible(el) && isEmpty(el)) {
        el.innerHTML = this.component(Object.entries(this.data)[index][1]);
      }

      if (!this.isVisible(el) && !isEmpty(el)) {
        el.innerHTML = '';
      }
      index++;
    })

    const contentHeight = this.container.offsetHeight;
    const windowOffsetY = window.pageYOffset;

    const windowHeight = window.innerHeight;

    if (windowOffsetY + windowHeight > contentHeight) {
      this.upload();
    }
  }

  private async upload() {
    if (this.uploadingContent || this.endOfData) {
      return;
    }

    this.uploadingContent = true;

    this.countPages++;
    const newData: any = await this.uploadContentFunction(this.countPages);

    console.log(newData, 'загружено');

    if (newData === null) {
      this.endOfData = true;
      return;
    }

    if (Object.entries(newData).length < this.onePageSize) {
      this.endOfData = true;
    }

    Object.entries(newData).forEach(() => {
      this.container.insertAdjacentHTML('beforeend', `<div class="${this.elementWrapperName}"></div>`);
    })


    this.data = Array.prototype.concat(this.data, newData);

    this.uploadingContent = false;
  }

  async initialize() {
    this.data = await this.uploadContentFunction(this.countPages);

    if (Object.entries(this.data).length < this.onePageSize) {
      console.log('daawdadwwd');
      this.endOfData = true;
    }

    window.addEventListener('scroll', this.handlerScroll);

    Object.entries(this.data).forEach(([, val]) => {
      this.container.insertAdjacentHTML('beforeend', `<div class="${this.elementWrapperName}"></div>`);
    });

    this.handlerScroll();
  }

  destroy() {
    this.container.innerHTML = '';
    window.removeEventListener('scroll', this.handlerScroll);
  }
}
