export type ViewMode = 'individual' | 'team';
export type SportId = 'nba' | 'mlb' | 'nfl' | 'soccer';

export interface FeatureImportance {
  id: string;
  name: string;
  category: 'physical' | 'skill';
  baseline: number;
  enhanced: number;
}

export interface SportData {
  id: SportId;
  name: string;
  acronym: string;
  summary: string;
  insight: string;
  baselineRSquared: number;
  enhancedRSquared: number;
  baselineLabel?: string;
  enhancedLabel?: string;
  topPhysicalPredictor: string;
  weakestCorrelation: string;
  features: FeatureImportance[];
}

export const sportsData: Record<SportId, SportData> = {
  nba: {
    id: 'nba',
    name: 'Basketball',
    acronym: 'NBA',
    summary: 'Ridge regression on 31,179 player-seasons: physical traits vs. skill metrics predicting PER',
    insight: 'Physical features alone barely predict PER (test R² = 0.008). Adding skill metrics (points, minutes, TS%, rebounds) lifts test R² to 0.772 — a 95× jump. Physical traits add essentially no incremental value on top of skill: skill-only R² = 0.771 vs. skill+physical R² = 0.772. Height correlates weakly with PER (r² = 0.58%) and weight only slightly better (r² = 0.80%) across the full 31k season-stat sample. Standing reach is the strongest physical predictor (r² = 13.2% vs PER) but only in the 181-player combine-merged career sample. Size sorts players into positions, not into production tiers.',
    baselineRSquared: 0.008,
    enhancedRSquared: 0.772,
    topPhysicalPredictor: 'Standing Reach (combine)',
    weakestCorrelation: 'Height → PER (r² 0.58%)',
    features: [
      { id: 'pts', name: 'Points / Game', category: 'skill', baseline: 0, enhanced: 15.1 },
      { id: 'min', name: 'Minutes / Game', category: 'skill', baseline: 0, enhanced: 12.7 },
      { id: 'ts', name: 'True Shooting %', category: 'skill', baseline: 0, enhanced: 8.9 },
      { id: 'weight', name: 'Weight (lb)', category: 'physical', baseline: 38.5, enhanced: 5.5 },
      { id: 'height', name: 'Height (in)', category: 'physical', baseline: 24.8, enhanced: 5.5 },
    ],
  },
  mlb: {
    id: 'mlb',
    name: 'Baseball',
    acronym: 'MLB',
    summary: 'Contact quality and command vs. raw pitcher/hitter metrics',
    insight: 'In baseball, physical dimensions provide limited explanatory power next to bat-to-ball skills and command.',
    baselineRSquared: 0.084,
    enhancedRSquared: 0.742,
    topPhysicalPredictor: 'Fastball Velo',
    weakestCorrelation: 'Team Ht/Wt (Win%)',
    features: [
      { id: 'barrel', name: 'Barrel Rate / Contact Qual', category: 'skill', baseline: 0, enhanced: 38.5 },
      { id: 'krate', name: 'K-Rate / Plate Discipline', category: 'skill', baseline: 0, enhanced: 31.0 },
      { id: 'ops', name: 'Adjusted OPS+', category: 'skill', baseline: 0, enhanced: 20.1 },
      { id: 'weight', name: 'Weight (Physical)', category: 'physical', baseline: 9.3, enhanced: 1.1 },
      { id: 'height', name: 'Height (Physical)', category: 'physical', baseline: 6.8, enhanced: 0.5 },
    ],
  },
  nfl: {
    id: 'nfl',
    name: 'Football',
    acronym: 'NFL',
    summary: 'Position-level ridge models (DEF / QB / RB / WR): baseline skill vs. baseline + anthro + combine',
    insight: 'NFL physical effects concentrate in the trenches, not across the field. Defense: baseline (prior EPA, draft, experience) R² = 0.40; adding anthropometric + combine features lifts R² to 0.60 — a +0.20 jump, dominated by weight (coef 0.184). QB, RB, WR barely move: QB 0.11→0.14, WR 0.22→0.24, RB essentially 0 in both models. Team-level regressions of net EPA on team average height/weight return R² ≈ −0.03 (no signal). Size predicts defensive leverage; skill metrics and role still dominate everywhere else.',
    baselineRSquared: 0.400,
    enhancedRSquared: 0.599,
    baselineLabel: 'Defense R² (Baseline)',
    enhancedLabel: 'Defense R² (+ Anthro)',
    topPhysicalPredictor: 'Weight (DL leverage)',
    weakestCorrelation: 'QB Height (coef ≈ 0)',
    features: [
      { id: 'epa', name: 'Prior EPA / Play (Skill)', category: 'skill', baseline: 78.0, enhanced: 28.9 },
      { id: 'rookie', name: 'Rookie Flag (Skill)', category: 'skill', baseline: 15.4, enhanced: 7.0 },
      { id: 'draft', name: 'Draft Pick (Skill)', category: 'skill', baseline: 6.6, enhanced: 0.6 },
      { id: 'weight', name: 'Weight (lbs)', category: 'physical', baseline: 0, enhanced: 53.8 },
      { id: 'bench', name: 'Bench Press Reps', category: 'physical', baseline: 0, enhanced: 9.6 },
    ],
  },
  soccer: {
    id: 'soccer',
    name: 'Soccer',
    acronym: 'FIFA',
    summary: 'FIFA position-level correlations + SoccerMon GPS/HR monitoring (EDA)',
    insight: 'Soccer is observational: no ridge model. FIFA data (n=122,841) shows height barely correlates with overall rating (r=0.046, r²≈0.2%) and weight is weak (r=0.146, r²≈2.1%). The signal concentrates by position — Goalkeeper weight peaks at r=0.30 (r²≈8.9%) and Center Back at r=0.27. SoccerMon GPS adds a dynamic workload/fatigue lens that static anthropometrics miss.',
    baselineRSquared: 0.002,
    enhancedRSquared: 0.089,
    baselineLabel: 'Pooled Height r²',
    enhancedLabel: 'Best Position r² (GK Wt)',
    topPhysicalPredictor: 'Weight (Goalkeeper)',
    weakestCorrelation: 'Height (Pooled, Wingers)',
    features: [
      { id: 'gk_weight', name: 'Weight — Goalkeeper (r²)', category: 'physical', baseline: 8.9, enhanced: 8.9 },
      { id: 'cb_weight', name: 'Weight — Center Back (r²)', category: 'physical', baseline: 7.4, enhanced: 7.4 },
      { id: 'st_weight', name: 'Weight — Striker (r²)', category: 'physical', baseline: 6.7, enhanced: 6.7 },
      { id: 'gk_height', name: 'Height — Goalkeeper (r²)', category: 'physical', baseline: 2.5, enhanced: 2.5 },
      { id: 'pooled_weight', name: 'Weight — Pooled (r²)', category: 'physical', baseline: 2.1, enhanced: 2.1 },
    ],
  }
};
