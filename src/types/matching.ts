export interface UserPreferences {
  dietaryRestrictions: string[];
  cuisinePreferences: string[];
  cookingSkillLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  preferredSchedule: string[];
  preferredGroupSize: 'small' | 'medium' | 'large';
  ageRange: string;
  interests: string[];
  budget: string;
  location: {
    lat: number;
    lng: number;
    radius: number;
  };
  socialStyle: 'casual' | 'formal' | 'mixed';
  hostingPreference: 'never' | 'sometimes' | 'often' | 'always';
}

export interface TableMatch {
  tableId: string;
  tableName: string;
  compatibilityScore: number;
  matchReasons: MatchReason[];
  location: string;
  meetingSchedule: string;
  memberCount: number;
  maxMembers: number;
  cuisineType: string;
  averageAge: number;
  skillLevel: string;
  budget: string;
  dietary: string[];
  imageUrl: string;
}

export interface MatchReason {
  category: 'dietary' | 'schedule' | 'location' | 'cuisine' | 'skill' | 'social' | 'budget' | 'interests';
  score: number;
  description: string;
  icon: string;
}