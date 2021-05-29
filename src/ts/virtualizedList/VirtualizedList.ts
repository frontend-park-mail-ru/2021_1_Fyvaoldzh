import { vlOptions, toVirtualize } from './VirtualizedListInterfaces';
import { parseDate, capitalize } from '../views/utils/utils';

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
    this.offset = options.offset || 1000;
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
        if (Object.entries(this.data)[index][1].startDate) {
          Object.entries(this.data)[index][1].startDate = parseDate(Object.entries(this.data)[index][1].startDate);
        }

        if (Object.entries(this.data)[index][1].place) {
          Object.entries(this.data)[index][1].place = capitalize(Object.entries(this.data)[index][1].place);
        }

        if (Object.entries(this.data)[index][1].distance) {
          (Object.entries(this.data)[index][1] as any).distance = (parseFloat((Object.entries(this.data)[index][1] as any).distance)).toFixed(2) + ' км';
        }

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


    if (newData === null) {
      this.endOfData = true;
      return;
    }

    Object.entries(newData).forEach(([, val]) => {
      if ((val as any).startDate) {
        (val as any).startDate = parseDate((val as any).startDate);
      }

      if ((val as any).distance) {
        (val as any).distance = ((val as any).distance as number).toFixed(2) + ' км';
      }
    })

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
