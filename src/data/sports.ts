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
    summary: 'Analyzing the predictive power of physical traits vs. efficiency metrics',
    insight: 'In basketball, physical traits add almost zero predictive value to *on-court production* once usage and efficiency are included. "Wingspan" is the strongest physical predictor initially (12.5% variance), but drops to 1.8% in skill models. "Team Avg Height" proves to be mathematically meaningless to team win %. Size dictates roster role, not individual performance.',
    baselineRSquared: 0.124,
    enhancedRSquared: 0.887,
    topPhysicalPredictor: 'Wingspan',
    weakestCorrelation: 'Team Avg Height (Win%)',
    features: [
      { id: 'per', name: 'Player Efficiency Rating (PER)', category: 'skill', baseline: 0, enhanced: 42.1 },
      { id: 'usg', name: 'Usage Rate (%)', category: 'skill', baseline: 0, enhanced: 28.4 },
      { id: 'ws48', name: 'Win Shares / 48', category: 'skill', baseline: 0, enhanced: 14.2 },
      { id: 'wingspan', name: 'Wingspan', category: 'physical', baseline: 12.5, enhanced: 1.8 },
      { id: 'height', name: 'Height w/o Shoes', category: 'physical', baseline: 18.2, enhanced: 0.9 },
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
    summary: 'Anthropometric vs Combine metrics by positional groupings (Defense Focus)',
    insight: 'NFL shows the highest physical dependency. Anthropometric and combine features matter more for defense.',
    baselineRSquared: 0.354,
    enhancedRSquared: 0.812,
    topPhysicalPredictor: 'Explosiveness (Broad Jump)',
    weakestCorrelation: 'QB Height',
    features: [
      { id: 'pff', name: 'PFF Grade / Technique', category: 'skill', baseline: 0, enhanced: 29.5 },
      { id: 'pressure', name: 'Pressure Rate / Production', category: 'skill', baseline: 0, enhanced: 25.1 },
      { id: 'snap', name: 'Snap Count / Usage', category: 'skill', baseline: 0, enhanced: 18.2 },
      { id: 'broad', name: 'Broad Jump / Explosiveness', category: 'physical', baseline: 18.5, enhanced: 12.0 },
      { id: 'weight', name: 'Weight / Leverage', category: 'physical', baseline: 25.4, enhanced: 8.5 },
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
