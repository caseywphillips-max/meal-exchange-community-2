export interface CommunityTable {
  id: string;
  name: string;
  inviteCode: string;
  description: string;
  location: string;
  diet_type: string;
  dietary: string[];
  budget: string;
  budget_range: string;
  member_count: number;
  max_members: number;
  meetingSchedule: string;
  cuisineType: string;
  skillLevel: string;
  imageUrl: string;
}

export const defaultTables: CommunityTable[] = [
  {
    id: '1',
    name: 'Downtown Meal Prep',
    inviteCode: 'DOWNTOWN8',
    description: 'Weekly meal prep for busy professionals',
    location: 'San Francisco',
    diet_type: 'Balanced',
    dietary: ['vegetarian-friendly'],
    budget: '$$',
    budget_range: '$10-15',
    member_count: 8,
    max_members: 12,
    meetingSchedule: 'Tuesdays & Thursdays, 6pm',
    cuisineType: 'Mediterranean',
    skillLevel: 'Intermediate',
    imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400',
  },
  {
    id: '2',
    name: 'Vegan Vibes',
    inviteCode: 'VEGAN10',
    description: 'Plant-based meal prep community',
    location: 'Oakland',
    diet_type: 'Vegan',
    dietary: ['vegan', 'gluten-free'],
    budget: '$',
    budget_range: '$5-10',
    member_count: 6,
    max_members: 10,
    meetingSchedule: 'Mondays & Wednesdays, 7pm',
    cuisineType: 'Asian',
    skillLevel: 'Beginner',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
  },
  {
    id: '3',
    name: 'Keto Kitchen',
    inviteCode: 'KETO5',
    description: 'Low-carb meal sharing group',
    location: 'Berkeley',
    diet_type: 'Keto',
    dietary: ['keto', 'low-carb'],
    budget: '$$$',
    budget_range: '$15-20',
    member_count: 5,
    max_members: 8,
    meetingSchedule: 'Saturdays, 5pm',
    cuisineType: 'American',
    skillLevel: 'Advanced',
    imageUrl: 'https://images.unsplash.com/photo-1532980400857-e8d9d275d858?w=400',
  },
  {
    id: '4',
    name: 'Family Style Feast',
    inviteCode: 'FAMILY12',
    description: 'Traditional family recipes shared',
    location: 'San Francisco',
    diet_type: 'Mixed',
    dietary: ['vegetarian-friendly', 'kid-friendly'],
    budget: '$$',
    budget_range: '$10-15',
    member_count: 10,
    max_members: 12,
    meetingSchedule: 'Sundays, 6pm',
    cuisineType: 'Italian',
    skillLevel: 'Intermediate',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400',
  },
  {
    id: '5',
    name: 'Paleo Potluck',
    inviteCode: 'PALEO7',
    description: 'Whole foods and clean eating',
    location: 'Palo Alto',
    diet_type: 'Paleo',
    dietary: ['paleo', 'dairy-free'],
    budget: '$$$',
    budget_range: '$15-20',
    member_count: 7,
    max_members: 10,
    meetingSchedule: 'Thursdays & Saturdays, 6:30pm',
    cuisineType: 'Mediterranean',
    skillLevel: 'Intermediate',
    imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400',
  },
  {
    id: '6',
    name: 'Student Budget Bites',
    inviteCode: 'STUDENT15',
    description: 'Affordable meals for college students',
    location: 'Berkeley',
    diet_type: 'Mixed',
    dietary: ['vegetarian-friendly'],
    budget: '$',
    budget_range: '$5-10',
    member_count: 12,
    max_members: 15,
    meetingSchedule: 'Tuesdays & Fridays, 7pm',
    cuisineType: 'Asian',
    skillLevel: 'Beginner',
    imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400',
  },
];

export const getTableById = (tableId?: string) =>
  defaultTables.find((table) => table.id === tableId);

export const getTableByInviteCode = (inviteCode?: string) => {
  if (!inviteCode) {
    return undefined;
  }

  const normalizedCode = inviteCode.trim().toUpperCase();
  return defaultTables.find((table) => table.inviteCode.toUpperCase() === normalizedCode);
};
