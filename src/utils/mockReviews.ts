import { Review, TableRatings, MemberRating } from '@/types/reviews';

export const mockReviews: Review[] = [
  {
    id: '1',
    tableId: '1',
    tableName: 'Italian Feast Fridays',
    userId: 'user1',
    userName: 'Sarah Chen',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    rating: 5,
    mealRating: 5,
    atmosphereRating: 5,
    organizationRating: 4,
    comment: 'Amazing experience! The homemade pasta was incredible and everyone was so welcoming. Can\'t wait for next Friday!',
    date: '2024-01-15T19:00:00Z',
    helpfulCount: 12,
    images: []
  },
  {
    id: '2',
    tableId: '1',
    tableName: 'Italian Feast Fridays',
    userId: 'user2',
    userName: 'Mike Johnson',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    rating: 4,
    mealRating: 5,
    atmosphereRating: 4,
    organizationRating: 3,
    comment: 'Great food and company! The tiramisu was to die for. Only minor issue was timing - we started a bit late.',
    date: '2024-01-08T19:00:00Z',
    helpfulCount: 8
  },
  {
    id: '3',
    tableId: '2',
    tableName: 'Vegan Potluck Paradise',
    userId: 'user3',
    userName: 'Emma Wilson',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    rating: 5,
    mealRating: 5,
    atmosphereRating: 5,
    organizationRating: 5,
    comment: 'Best vegan meals I\'ve ever had! Everyone brings such creative dishes. The mushroom wellington last week was restaurant quality.',
    date: '2024-01-10T18:30:00Z',
    helpfulCount: 15
  },
  {
    id: '4',
    tableId: '3',
    tableName: 'BBQ & Blues',
    userId: 'user4',
    userName: 'James Lee',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    rating: 4,
    mealRating: 4,
    atmosphereRating: 5,
    organizationRating: 4,
    comment: 'Love the casual vibe and the music selection is always on point. Ribs were tender and flavorful.',
    date: '2024-01-12T17:00:00Z',
    helpfulCount: 6
  },
  {
    id: '5',
    tableId: '4',
    tableName: 'Asian Fusion Adventures',
    userId: 'user5',
    userName: 'Lisa Park',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    rating: 5,
    mealRating: 5,
    atmosphereRating: 4,
    organizationRating: 5,
    comment: 'Each week is a culinary journey! Last week\'s Korean-Mexican fusion tacos were mind-blowing.',
    date: '2024-01-14T19:00:00Z',
    helpfulCount: 10
  }
];

export const mockTableRatings: Record<string, TableRatings> = {
  '1': {
    overall: 4.5,
    mealQuality: 4.8,
    atmosphere: 4.5,
    organization: 4.2,
    totalReviews: 47,
    distribution: {
      5: 28,
      4: 15,
      3: 3,
      2: 1,
      1: 0
    }
  },
  '2': {
    overall: 4.7,
    mealQuality: 4.9,
    atmosphere: 4.6,
    organization: 4.5,
    totalReviews: 32,
    distribution: {
      5: 22,
      4: 8,
      3: 2,
      2: 0,
      1: 0
    }
  },
  '3': {
    overall: 4.3,
    mealQuality: 4.4,
    atmosphere: 4.6,
    organization: 4.0,
    totalReviews: 28,
    distribution: {
      5: 12,
      4: 13,
      3: 3,
      2: 0,
      1: 0
    }
  },
  '4': {
    overall: 4.8,
    mealQuality: 4.9,
    atmosphere: 4.7,
    organization: 4.8,
    totalReviews: 41,
    distribution: {
      5: 32,
      4: 7,
      3: 2,
      2: 0,
      1: 0
    }
  },
  '5': {
    overall: 4.2,
    mealQuality: 4.3,
    atmosphere: 4.1,
    organization: 4.2,
    totalReviews: 19,
    distribution: {
      5: 8,
      4: 8,
      3: 3,
      2: 0,
      1: 0
    }
  },
  '6': {
    overall: 4.1,
    mealQuality: 4.0,
    atmosphere: 4.3,
    organization: 3.9,
    totalReviews: 1,
    distribution: {
      5: 0,
      4: 1,
      3: 0,
      2: 0,
      1: 0
    }
  }
};

export const mockMemberRatings: MemberRating[] = [
  {
    id: '1',
    fromUserId: 'user1',
    fromUserName: 'Sarah Chen',
    toUserId: 'user2',
    toUserName: 'Mike Johnson',
    tableId: '1',
    rating: 5,
    cookingSkill: 5,
    punctuality: 4,
    friendliness: 5,
    comment: 'Mike makes the best carbonara! Always friendly and helpful.',
    date: '2024-01-15T19:00:00Z'
  },
  {
    id: '2',
    fromUserId: 'user3',
    fromUserName: 'Emma Wilson',
    toUserId: 'user1',
    toUserName: 'Sarah Chen',
    tableId: '2',
    rating: 4,
    cookingSkill: 4,
    punctuality: 5,
    friendliness: 5,
    comment: 'Sarah is wonderful to have at our table. Great energy!',
    date: '2024-01-10T18:30:00Z'
  }
];