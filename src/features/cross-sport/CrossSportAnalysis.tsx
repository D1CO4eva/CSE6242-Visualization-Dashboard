import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Cell 
} from 'recharts';
import { Activity, Target, ShieldAlert, TrendingDown } from 'lucide-react';

const rSquaredData = [
  { sport: 'Basketball', 'Physical Only': 0.008, 'Enhanced (Skills)': 0.772 },
  { sport: 'Soccer', 'Physical Only': 0.002, 'Enhanced (Skills)': 0.089 },
  { sport: 'Baseball', 'Physical Only': 0.255, 'Enhanced (Skills)': 0.480 },
  { sport: 'Football', 'Physical Only': 0.400, 'Enhanced (Skills)': 0.599 },
];

const nflPositionalData = [
  { position: 'Defense (Pooled)', physicalWeight: 0.599, category: 'Defense' },
  { position: 'Wide Receivers', physicalWeight: 0.238, category: 'Offense' },
  { position: 'Quarterbacks', physicalWeight: 0.140, category: 'Offense' },
  { position: 'Running Backs', physicalWeight: 0.013, category: 'Offense' },
];

const radarData = [
  { metric: 'Static Size', NBA: 85, MLB: 30, NFL: 95, Soccer: 20 },
  { metric: 'Explosiveness', NBA: 70, MLB: 50, NFL: 95, Soccer: 90 },
  { metric: 'Skill Execution', NBA: 95, MLB: 100, NFL: 70, Soccer: 85 },
  { metric: 'Efficiency', NBA: 90, MLB: 75, NFL: 60, Soccer: 80 },
  { metric: 'Role Dependency', NBA: 95, MLB: 40, NFL: 95, Soccer: 30 },
  { metric: 'System Dependency', NBA: 60, MLB: 20, NFL: 100, Soccer: 75 }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/90 border border-slate-700 p-3 rounded-lg shadow-xl backdrop-blur-sm">
        <p className="text-white font-bold mb-2 text-sm">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-xs mb-1">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-slate-300">{entry.name}:</span>
            <span className="text-white font-mono font-bold">{entry.value.toFixed(3)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function CrossSportAnalysis() {
  const [activeRadarSport, setActiveRadarSport] = useState<'NBA' | 'MLB' | 'NFL' | 'Soccer'>('NBA');
  const [activePositionalSport, setActivePositionalSport] = useState<'NFL' | 'NBA' | 'MLB' | 'Soccer'>('NFL');

  const positionalData = {
    NFL: [
      { position: 'Defense (Pooled)', physicalWeight: 0.599, category: 'Defense' },
      { position: 'Wide Receivers', physicalWeight: 0.238, category: 'Offense' },
      { position: 'Quarterbacks', physicalWeight: 0.140, category: 'Offense' },
      { position: 'Running Backs', physicalWeight: 0.013, category: 'Offense' },
    ],
    NBA: [
      { position: 'Center', physicalWeight: 0.35, category: 'Frontcourt' },
      { position: 'Power Forward', physicalWeight: 0.25, category: 'Frontcourt' },
      { position: 'Small Forward', physicalWeight: 0.15, category: 'Wings' },
      { position: 'Shooting Guard', physicalWeight: 0.08, category: 'Backcourt' },
      { position: 'Point Guard', physicalWeight: 0.05, category: 'Backcourt' },
    ],
    MLB: [
      { position: 'Pitchers', physicalWeight: 0.28, category: 'Mound' },
      { position: 'Catchers', physicalWeight: 0.18, category: 'Defense' },
      { position: 'Outfielders', physicalWeight: 0.12, category: 'Field' },
      { position: 'Infielders', physicalWeight: 0.09, category: 'Field' },
    ],
    Soccer: [
      { position: 'Goalkeepers', physicalWeight: 0.089, category: 'Defense' },
      { position: 'Center Backs', physicalWeight: 0.074, category: 'Defense' },
      { position: 'Strikers', physicalWeight: 0.067, category: 'Forward' },
      { position: 'Defensive Mids', physicalWeight: 0.050, category: 'Midfield' },
      { position: 'Central Mids', physicalWeight: 0.045, category: 'Midfield' },
      { position: 'Wingers', physicalWeight: 0.019, category: 'Midfield' },
    ]
  };

  const currentPositionalData = positionalData[activePositionalSport];

  return (
    <div className="w-full h-full pb-16 overflow-y-auto pr-2">
      <header className="mb-8 border-b border-slate-800 pb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 leading-tight">
            Cross-Sport Synthesis
          </h1>
          <p className="text-slate-400 text-sm">
            Visualizing the boundary between physical potential and execution across four disciplines.
          </p>
        </div>
        <div className="hidden md:flex gap-3 text-xs">
          <div className="bg-slate-800/50 px-3 py-1.5 rounded border border-slate-700/50 text-slate-300 flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-indigo-400" /> Data Source: 2M+ Plays
          </div>
        </div>
      </header>

      {/* Hero Insight */}
      <section className="mb-10 p-6 bg-indigo-950/20 border border-indigo-500/20 rounded-xl relative overflow-hidden flex items-center gap-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/4"></div>
        <div className="w-12 h-12 bg-indigo-600/20 rounded-full flex items-center justify-center shrink-0 border border-indigo-500/30">
          <Target className="w-6 h-6 text-indigo-400" />
        </div>
        <div className="relative z-10">
          <p className="text-xl md:text-2xl font-semibold text-white leading-snug">
            "Physical traits set the <span className="text-indigo-400">boundaries of potential</span>, but performance is determined by the <span className="text-emerald-400">conversion to measurable skill</span>."
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        {/* CHART 1: Predictive Power Delta */}
        <section className="metric-card rounded-2xl p-6 flex flex-col min-h-[400px]">
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">Predictive Power: Physical vs Skill</h3>
            <p className="text-xs text-slate-500 mt-1">Comparing R² variations when skill metrics are injected.</p>
          </div>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rSquaredData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="sport" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: '#1e293b', opacity: 0.4 }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12, color: '#cbd5e1' }} />
                <Bar dataKey="Physical Only" fill="#475569" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Enhanced (Skills)" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-700/50">
            <p className="text-xs text-slate-400">
              <span className="text-indigo-400 font-bold">Observation:</span> Basketball displays the deepest delta; height is a prerequisite, but production is almost entirely skill-based.
            </p>
          </div>
        </section>

        {/* CHART 2: Universal Abstraction Radar */}
        <section className="metric-card rounded-2xl p-6 flex flex-col min-h-[400px]">
          <div className="flex justify-between items-end mb-2">
            <div>
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">Universal Abstraction Mapping</h3>
              <p className="text-xs text-slate-500 mt-1">Sport archetypes mapped across 6 foundational dimensions.</p>
            </div>
            {/* Interactive Legend/Toggle */}
            <div className="flex gap-2">
              {['NBA', 'MLB', 'NFL', 'Soccer'].map(s => (
                <button 
                  key={s}
                  onClick={() => setActiveRadarSport(s as any)}
                  className={`px-2.5 py-1 text-[10px] uppercase font-bold rounded transition-colors ${
                    activeRadarSport === s ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-slate-800 text-slate-500 border border-slate-700'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name={activeRadarSport}
                  dataKey={activeRadarSport}
                  stroke="#34d399"
                  fill="#34d399"
                  fillOpacity={0.4}
                />
                <RechartsTooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 pt-4 border-t border-slate-700/50">
            <p className="text-xs text-slate-400">
              <span className="text-emerald-400 font-bold">Archetype Focus:</span> {
                activeRadarSport === 'NBA' ? "High Efficiency & Skill Execution, gated strongly by Role Dependency (Height)." :
                activeRadarSport === 'MLB' ? "Dominated entirely by isolated Skill Execution with minimal System Dependency." :
                activeRadarSport === 'NFL' ? "Maximized System Dependency and Explosiveness; physics dictate outcomes." :
                "EDA-only (no ridge model). FIFA shows weak overall size-performance correlation; signal concentrates at Goalkeeper and Center Back. SoccerMon adds GPS workload/fatigue as a dynamic lens."
              }
            </p>
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        {/* CHART 3: NFL Positional Divide - 2 Cols */}
        <section className="metric-card rounded-2xl p-6 xl:col-span-2">
          <div className="mb-6 flex justify-between items-start">
            <div>
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">The Positional Locality of Physicality</h3>
              <p className="text-xs text-slate-500 mt-1">Physical reliance is not uniform; it fragments heavily between roles.</p>
            </div>
            {/* Interactive Toggle */}
            <div className="flex gap-2">
              {['NBA', 'MLB', 'NFL', 'Soccer'].map(s => (
                <button 
                  key={s}
                  onClick={() => setActivePositionalSport(s as any)}
                  className={`px-2.5 py-1 text-[10px] uppercase font-bold rounded transition-colors ${
                    activePositionalSport === s ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/40' : 'bg-slate-800 text-slate-500 border border-slate-700'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={currentPositionalData} margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={true} vertical={false} />
                <XAxis type="number" domain={[0, 0.7]} stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis dataKey="position" type="category" stroke="#cbd5e1" fontSize={11} tickLine={false} axisLine={false} width={120} />
                <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: '#1e293b', opacity: 0.4 }} />
                <Bar 
                  dataKey="physicalWeight" 
                  name="Physical Predictability (R²)" 
                  radius={[0, 4, 4, 0]}
                  barSize={20}
                >
                  {currentPositionalData.map((entry, index) => {
                    let fillColor = '#38bdf8'; // Default blue
                    if (activePositionalSport === 'NFL' && entry.category === 'Defense') fillColor = '#f43f5e';
                    if (activePositionalSport === 'NBA' && entry.category === 'Frontcourt') fillColor = '#fbbf24';
                    if (activePositionalSport === 'Soccer' && entry.category === 'Defense') fillColor = '#4ade80';
                    if (activePositionalSport === 'MLB' && entry.category === 'Mound') fillColor = '#c084fc';
                    return <Cell key={`cell-${index}`} fill={fillColor} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex gap-4 text-xs">
            {activePositionalSport === 'NFL' && (
              <>
                <div className="flex items-center gap-2 text-slate-400"><span className="w-3 h-3 bg-rose-500 rounded-sm"></span> Defense: Bio-Mechanically Reactive</div>
                <div className="flex items-center gap-2 text-slate-400"><span className="w-3 h-3 bg-sky-400 rounded-sm"></span> Offense: Systematically Directed</div>
              </>
            )}
            {activePositionalSport === 'NBA' && (
              <>
                <div className="flex items-center gap-2 text-slate-400"><span className="w-3 h-3 bg-amber-400 rounded-sm"></span> Frontcourt: Size-Gated</div>
                <div className="flex items-center gap-2 text-slate-400"><span className="w-3 h-3 bg-sky-400 rounded-sm"></span> Backcourt: Skill-Dictated</div>
              </>
            )}
             {activePositionalSport === 'MLB' && (
              <>
                <div className="flex items-center gap-2 text-slate-400"><span className="w-3 h-3 bg-purple-400 rounded-sm"></span> Mound: Force Generation</div>
                <div className="flex items-center gap-2 text-slate-400"><span className="w-3 h-3 bg-sky-400 rounded-sm"></span> Field: Hand-Eye Coordination</div>
              </>
            )}
             {activePositionalSport === 'Soccer' && (
              <>
                <div className="flex items-center gap-2 text-slate-400"><span className="w-3 h-3 bg-emerald-400 rounded-sm"></span> Defense: Aerial / Blocking</div>
                <div className="flex items-center gap-2 text-slate-400"><span className="w-3 h-3 bg-sky-400 rounded-sm"></span> Forward/Mid: Biomechanical Efficiency</div>
              </>
            )}
          </div>
        </section>

        {/* Individual vs Team Disconnect - 1 Col */}
        <section className="metric-card rounded-2xl p-6 flex flex-col justify-center relative overflow-hidden">
          <ShieldAlert className="absolute -right-4 -top-4 w-32 h-32 text-slate-800/30 rotate-12" />
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-6">Aggregate Scaling Failure</h3>
          
          <div className="space-y-6 relative z-10">
            <div>
              <div className="flex justify-between items-end mb-1">
                <span className="text-xs text-slate-400">Individual Level Physical R²</span>
                <span className="text-lg font-mono font-bold text-slate-200">~0.35</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full">
                <div className="h-full bg-slate-500 rounded-full" style={{ width: '35%' }}></div>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <TrendingDown className="text-slate-600 w-6 h-6 mb-2" />
            </div>

            <div>
              <div className="flex justify-between items-end mb-1">
                <span className="text-xs text-rose-400 font-bold">Team Win% Correlation</span>
                <span className="text-lg font-mono font-bold text-rose-400">~0.02</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full relative">
                <div className="h-full bg-rose-500 rounded-full animate-pulse z-10 relative" style={{ width: '4%' }}></div>
                {/* Visual shadow to show drop */}
                <div className="absolute top-0 left-0 h-full bg-rose-900/40 rounded-full" style={{ width: '35%' }}></div>
              </div>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-700/50 pt-4 mt-2">
              Aggregating physical traits (e.g. Average Team Height or Weight) fails entirely to predict organizational success (Win%). Tactical integration and skill execution overrides isolated physical metrics at scale.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
