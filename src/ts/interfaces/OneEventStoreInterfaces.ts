export interface OneEventDataInterface {
  id: number;
  title: string;
  place: string;
  description: string;
  startDate: string;
  endDate: string;
  subway: string;
  street: string;
  tags: Array<object>;
  category: string;
  followers: Array<object>;
}

export interface PlanningAnswer {
  userId: number;
  eventId: number;
  isAdded: boolean;
}

export interface TagInterface {
  id: number;
  name: string;
}

export interface FollowerInterface {
  id: number;
  name: string;
}

export interface ToInviteInterface {
  eventId: number;
  invites: Array<number>;
}
