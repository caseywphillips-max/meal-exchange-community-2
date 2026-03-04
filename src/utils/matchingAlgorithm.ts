import { UserPreferences, TableMatch, MatchReason } from '@/types/matching';

export function calculateCompatibilityScore(
  userPrefs: UserPreferences,
  table: any
): { score: number; reasons: MatchReason[] } {
  const reasons: MatchReason[] = [];
  let totalScore = 0;
  let maxScore = 0;

  // Dietary Restrictions Match (25 points)
  maxScore += 25;
  const dietaryScore = calculateDietaryScore(userPrefs.dietaryRestrictions, table.dietary || []);
  if (dietaryScore > 0) {
    totalScore += dietaryScore;
    reasons.push({
      category: 'dietary',
      score: dietaryScore,
      description: dietaryScore === 25 ? 'Perfect dietary match' : 'Good dietary compatibility',
      icon: '🥗'
    });
  }

  // Schedule Match (20 points)
  maxScore += 20;
  const scheduleScore = calculateScheduleScore(userPrefs.preferredSchedule, table.meetingSchedule);
  if (scheduleScore > 0) {
    totalScore += scheduleScore;
    reasons.push({
      category: 'schedule',
      score: scheduleScore,
      description: 'Schedule aligns well',
      icon: '📅'
    });
  }

  // Location Proximity (20 points)
  maxScore += 20;
  const locationScore = calculateLocationScore(userPrefs.location, table.location);
  if (locationScore > 0) {
    totalScore += locationScore;
    reasons.push({
      category: 'location',
      score: locationScore,
      description: locationScore >= 15 ? 'Very close to you' : 'Within your preferred area',
      icon: '📍'
    });
  }

  // Cuisine Preferences (15 points)
  maxScore += 15;
  const cuisineScore = calculateCuisineScore(userPrefs.cuisinePreferences, table.cuisineType);
  if (cuisineScore > 0) {
    totalScore += cuisineScore;
    reasons.push({
      category: 'cuisine',
      score: cuisineScore,
      description: 'Matches your cuisine preferences',
      icon: '🍽️'
    });
  }

  // Skill Level Match (10 points)
  maxScore += 10;
  const skillScore = calculateSkillScore(userPrefs.cookingSkillLevel, table.skillLevel);
  if (skillScore > 0) {
    totalScore += skillScore;
    reasons.push({
      category: 'skill',
      score: skillScore,
      description: 'Similar cooking skill level',
      icon: '👨‍🍳'
    });
  }

  // Budget Match (10 points)
  maxScore += 10;
  const budgetScore = calculateBudgetScore(userPrefs.budget, table.budget);
  if (budgetScore > 0) {
    totalScore += budgetScore;
    reasons.push({
      category: 'budget',
      score: budgetScore,
      description: 'Budget range matches',
      icon: '💰'
    });
  }

  return {
    score: Math.round((totalScore / maxScore) * 100),
    reasons: reasons.sort((a, b) => b.score - a.score)
  };
}

function calculateDietaryScore(userDietary: string[], tableDietary: string[]): number {
  if (!userDietary.length) return 25;
  const matches = userDietary.filter(d => tableDietary.includes(d));
  return (matches.length / userDietary.length) * 25;
}

function calculateScheduleScore(userSchedule: string[], tableSchedule: string): number {
  const scheduleDays = tableSchedule.toLowerCase();
  const matches = userSchedule.filter(day => scheduleDays.includes(day.toLowerCase()));
  return matches.length > 0 ? 20 : 0;
}

function calculateLocationScore(userLocation: any, tableLocation: string): number {
  // Simplified location scoring - in real app would use actual coordinates
  if (!userLocation || !tableLocation) return 10;
  return 15; // Mock score
}

function calculateCuisineScore(userCuisines: string[], tableCuisine: string): number {
  if (!userCuisines.length) return 10;
  return userCuisines.includes(tableCuisine) ? 15 : 5;
}

function calculateSkillScore(userSkill: string, tableSkill: string): number {
  const levels = ['beginner', 'intermediate', 'advanced', 'expert'];
  const userLevel = levels.indexOf(userSkill);
  const tableLevel = levels.indexOf(tableSkill.toLowerCase());
  const diff = Math.abs(userLevel - tableLevel);
  return diff === 0 ? 10 : diff === 1 ? 7 : 3;
}

function calculateBudgetScore(userBudget: string, tableBudget: string): number {
  if (userBudget === tableBudget) return 10;
  const budgets = ['$', '$$', '$$$', '$$$$'];
  const userIdx = budgets.indexOf(userBudget);
  const tableIdx = budgets.indexOf(tableBudget);
  const diff = Math.abs(userIdx - tableIdx);
  return diff === 1 ? 7 : diff === 0 ? 10 : 3;
}