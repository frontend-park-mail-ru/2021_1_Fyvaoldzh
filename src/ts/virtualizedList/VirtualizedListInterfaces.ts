export interface vlOptions {
  component: any;
  height: number;
  elementWrapperName: string;
  offset?: number;
  container: HTMLElement;
  data: object;
  onePageSize: number;
  uploadContent: Function;
}

export interface toVirtualize {
  id: number;
  isRendered: boolean;
}
