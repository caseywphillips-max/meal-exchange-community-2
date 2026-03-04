export interface Review {
  id: string;
  tableId: string;
  tableName: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  mealRating: number;
  atmosphereRating: number;
  organizationRating: number;
  comment: string;
  date: string;
  helpfulCount: number;
  images?: string[];
}

export interface MemberRating {
  id: string;
  fromUserId: string;
  fromUserName: string;
  toUserId: string;
  toUserName: string;
  tableId: string;
  rating: number;
  cookingSkill: number;
  punctuality: number;
  friendliness: number;
  comment?: string;
  date: string;
}

export interface TableRatings {
  overall: number;
  mealQuality: number;
  atmosphere: number;
  organization: number;
  totalReviews: number;
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export interface UserRatings {
  overall: number;
  cookingSkill: number;
  punctuality: number;
  friendliness: number;
  totalRatings: number;
}