export interface ActionsInterface {
  eventName: string,
  data: any,
}

export interface HistoryState {
  page: string;
  parameter: string;
}

export interface PostUserDataInterface {
  name?: string;
  city?: string;
  about?: string;
  birthday?: string;
  email?: string;
}
