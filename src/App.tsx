import React, { useState } from 'react';
import { ChevronRight, Activity, Zap, BrainCircuit, Dumbbell } from 'lucide-react';
import { cn } from './lib/utils';
import { sportsData, type SportId } from './data/sports';
import CrossSportAnalysis from './features/cross-sport/CrossSportAnalysis';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell, ScatterChart, Scatter, ZAxis, ReferenceLine } from 'recharts';

// Custom tooltip for the Scatter plot
const TraitTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl shadow-black/40">
        <p className="text-sm font-bold text-white mb-2">{data.name}</p>
        <div className="flex flex-col gap-1 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-slate-500"></span>
            <span className="text-slate-400">Baseline (Physical Only):</span>
            <span className="text-slate-200 font-mono">{data.baseline.toFixed(1)}%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
            <span className="text-slate-400">Enhanced (With Skills):</span>
            <span className="text-slate-200 font-mono">{data.enhanced.toFixed(1)}%</span>
          </div>
          {data.category === 'physical' && data.baseline > data.enhanced && (
             <div className="mt-2 pt-2 border-t border-slate-700 text-rose-400 font-medium">
               Eroded {((data.baseline - data.enhanced) / data.baseline * 100).toFixed(0)}% by skill data
             </div>
          )}
        </div>
      </div>
    );
  }
  return null;
};

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'cross-sport'>('dashboard');
  const [activeSport, setActiveSport] = useState<SportId>('nba');

  const sport = sportsData[activeSport];

  return (
    <div className="h-screen w-full grid-bg flex flex-col overflow-hidden bg-slate-900 text-slate-50 font-sans">
      <header className="h-16 px-8 border-b border-slate-800 flex items-center justify-between bg-slate-900/80 backdrop-blur-md z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center font-bold text-white">
            Σ
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Size Matters <span className="text-slate-500 font-normal ml-2">v1.0.4</span></h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-none mt-0.5">Physical Metrics vs Athletic Performance</p>
          </div>
        </div>
        
        <nav className="flex gap-6 h-full items-end pb-4 pt-1">
          {['dashboard', 'cross-sport'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={cn(
                "text-sm font-medium capitalize pb-1 border-b-2 transition-colors",
                activeTab === tab ? "text-indigo-400 border-indigo-400" : "text-slate-400 border-transparent hover:text-slate-200 hover:border-slate-700"
              )}
            >
              {tab.replace('-', ' ')}
            </button>
          ))}
        </nav>
        
        <div className="flex items-center gap-4">
          <div className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-slate-700 flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> Live Analysis
          </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {activeTab === 'dashboard' && (
          <aside className="w-64 border-r border-slate-800 bg-slate-900/40 p-6 flex flex-col gap-8 overflow-y-auto shrink-0">
            <div>
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-4">Select Discipline</h3>
              <div className="flex flex-col gap-2">
                {(Object.values(sportsData)).map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSport(s.id)}
                    className={cn(
                      "flex items-center justify-between w-full px-4 py-3 rounded-lg text-sm font-medium transition-all shadow-sm",
                      activeSport === s.id 
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/20" 
                        : "bg-slate-800/50 hover:bg-slate-800 text-slate-300"
                    )}
                  >
                    <span>{s.name} ({s.acronym})</span>
                    {activeSport === s.id && <ChevronRight className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mt-auto p-4 rounded-xl bg-indigo-900/20 border border-indigo-500/20">
              <p className="text-xs text-indigo-300 font-medium leading-relaxed italic">
                "Physical traits often function as role-setting variables rather than direct performance predictors."
              </p>
            </div>
          </aside>
        )}

        <section className="flex-1 p-8 overflow-y-auto flex flex-col gap-6">
          {activeTab === 'dashboard' && (
            <>
              <div className="flex justify-between items-end shrink-0 mb-2">
                <div>
                  <h2 className="text-3xl font-bold text-white tracking-tight">The Talent Takeover: {sport.acronym}</h2>
                  <p className="text-slate-400 mt-1">{sport.summary}</p>
                </div>
                <div className="flex gap-4">
                  <div className="metric-card px-4 py-2 rounded-lg flex flex-col justify-center">
                    <div className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">Baseline R² (Physics)</div>
                    <div className="text-xl font-bold text-slate-300">{sport.baselineRSquared.toFixed(3)}</div>
                  </div>
                  <div className="metric-card px-4 py-2 rounded-lg border-indigo-500/50 bg-indigo-950/20 flex flex-col justify-center shadow-inner shadow-indigo-500/10">
                    <div className="text-[10px] text-indigo-400 uppercase font-bold tracking-tight">Enhanced R² (Skills)</div>
                    <div className="text-xl font-bold text-indigo-400">{sport.enhancedRSquared.toFixed(3)}</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[420px]">
                
                {/* Visual Data Story: The Migration of Power */}
                <div className="metric-card rounded-2xl p-6 flex flex-col relative overflow-hidden group">
                  <BrainCircuit className="absolute -right-4 -top-4 w-32 h-32 text-indigo-900/20 rotate-12 transition-transform duration-1000 group-hover:rotate-0" />
                  
                  <div className="mb-6 relative z-10">
                    <h3 className="text-sm font-semibold text-white uppercase tracking-wide">The Erosion of Physicality</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Plotting feature importance: <span className="text-slate-300 font-medium whitespace-nowrap">X = Physical Only</span> vs <span className="text-indigo-300 font-medium whitespace-nowrap">Y = With Skills</span>.
                      <br/>Notice how physical traits (gray) collapse toward zero when skills are introduced.
                    </p>
                  </div>
                  
                  <div className="flex-1 min-h-[300px] w-full relative z-10">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: -20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                        <XAxis 
                          type="number" 
                          dataKey="baseline" 
                          name="Baseline Strength" 
                          stroke="#64748b" 
                          fontSize={11} 
                          tickLine={false} 
                          axisLine={false}
                          domain={[0, 'dataMax + 10']}
                          label={{ value: "Physical-Only Importance (%)", position: 'insideBottom', offset: -10, fill: '#64748b', fontSize: 10 }}
                        />
                        <YAxis 
                          type="number" 
                          dataKey="enhanced" 
                          name="Enhanced Strength" 
                          stroke="#cbd5e1" 
                          fontSize={11} 
                          tickLine={false} 
                          axisLine={false}
                          domain={[0, 'dataMax + 10']}
                          label={{ value: "Skill-Enhanced Importance (%)", angle: -90, position: 'insideLeft', offset: 15, fill: '#cbd5e1', fontSize: 10 }}
                        />
                        <ZAxis type="number" range={[100, 300]} />
                        <RechartsTooltip content={<TraitTooltip />} cursor={{ strokeDasharray: '3 3', stroke: '#475569' }} />
                        <ReferenceLine x={0} stroke="#334155" />
                        <ReferenceLine y={0} stroke="#334155" />
                        
                        <Scatter 
                          name="Physical Traits" 
                          data={sport.features.filter(f => f.category === 'physical')} 
                          fill="#64748b"
                        >
                          {sport.features.filter(f => f.category === 'physical').map((entry, index) => (
                            <Cell key={`cell-${index}`} fill="#64748b" />
                          ))}
                        </Scatter>
                        <Scatter 
                          name="Skill/Efficiency Traits" 
                          data={sport.features.filter(f => f.category === 'skill')} 
                          fill="#6366f1"
                        >
                          {sport.features.filter(f => f.category === 'skill').map((entry, index) => (
                            <Cell key={`cell-${index}`} fill="#6366f1" />
                          ))}
                        </Scatter>
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="metric-card rounded-2xl p-6 flex flex-col border border-slate-700/50 shadow-xl shadow-black/20">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">Residual Importance</h3>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                        <span className="w-3 h-3 bg-indigo-500 rounded-sm shadow-sm shadow-indigo-500/20"></span> Skill/Efficiency
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                        <span className="w-3 h-3 bg-slate-600 rounded-sm"></span> Physical Base
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-center py-2 space-y-4">
                    {sport.features.sort((a, b) => b.enhanced - a.enhanced).map((feature) => {
                      const isPhysical = feature.category === 'physical';
                      return (
                        <div key={feature.id} className="space-y-1.5 group">
                          <div className="flex justify-between text-xs items-end">
                            <span className={cn("transition-colors", isPhysical ? "text-slate-500 italic" : "text-slate-300 font-medium group-hover:text-white")}>
                              {feature.name} {isPhysical && "(Physical)"}
                            </span>
                            <span className={cn("font-mono font-bold text-[13px]", isPhysical ? "text-slate-400" : "text-white")}>
                              {feature.enhanced.toFixed(1)}%
                            </span>
                          </div>
                          <div className="w-full h-4 bg-slate-800/80 rounded border border-slate-700/50 overflow-hidden flex relative">
                            {/* Baseline watermark layer */}
                            <div 
                              className="absolute top-0 left-0 h-full bg-slate-600/20 border-r border-slate-500/30 transition-all duration-1000 ease-in-out"
                              style={{ width: `${feature.baseline}%` }}
                            ></div>
                            {/* Actual remaining significance */}
                            <div 
                              className={cn("h-full transition-all duration-1000 delay-300 ease-out relative z-10", isPhysical ? "bg-slate-500" : "bg-indigo-500")}
                              style={{ width: `${feature.enhanced}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="mt-6 p-4 bg-slate-800/60 rounded-xl border-l-4 border-amber-500 shadow-md">
                    <p className="text-xs text-slate-300 leading-relaxed font-medium">
                      <span className="text-amber-400 font-bold uppercase mr-2 tracking-wider text-[10px]">Key Insight:</span> 
                      {sport.insight}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col gap-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="metric-card rounded-xl p-4 flex flex-col justify-between gap-2 border border-emerald-900/30">
                      <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1.5">
                        <Activity className="w-3 h-3 text-emerald-500" /> Top Physical Signal
                      </span>
                      <span className="text-sm font-bold text-emerald-400 leading-tight">
                        {sport.topPhysicalPredictor}
                      </span>
                    </div>
                    <div className="metric-card rounded-xl p-4 flex flex-col justify-between gap-2 border border-rose-900/30">
                      <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1.5">
                        <Zap className="w-3 h-3 text-rose-500" /> Weakest Link
                      </span>
                      <span className="text-sm font-bold text-rose-400 leading-tight">
                        {sport.weakestCorrelation}
                      </span>
                    </div>
                  </div>

                  <div className="metric-card rounded-2xl p-6 flex-1 flex flex-col border border-slate-700/50 shadow-lg relative overflow-hidden group">
                    <Dumbbell className="absolute -right-4 -bottom-4 w-32 h-32 text-slate-800/20 group-hover:rotate-12 transition-transform duration-700" />
                    <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-5 relative z-10">Cross-Sport Benchmark</h3>
                    <div className="space-y-6 flex-1 justify-center flex flex-col relative z-10">
                      <div>
                        <div className="flex justify-between text-[11px] text-slate-400 mb-1.5 font-medium">
                          <span>Baseball (MLB)</span>
                          <span className="text-slate-200">Skill Dominant</span>
                        </div>
                        <div className="flex gap-1.5">
                          <div className="h-2 flex-1 bg-indigo-500/30 rounded-full"></div>
                          <div className="h-2 flex-1 bg-slate-800 rounded-full"></div>
                          <div className="h-2 flex-1 bg-slate-800 rounded-full"></div>
                          <div className="h-2 flex-1 bg-slate-800 rounded-full"></div>
                          <div className="h-2 flex-1 bg-slate-800 rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[11px] text-slate-400 mb-1.5 font-medium">
                          <span>Football (NFL - Def)</span>
                          <span className="text-emerald-400">High Physical Dependency</span>
                        </div>
                        <div className="flex gap-1.5">
                          <div className="h-2 flex-1 bg-emerald-500 rounded-full"></div>
                          <div className="h-2 flex-1 bg-emerald-500 rounded-full"></div>
                          <div className="h-2 flex-1 bg-emerald-500 rounded-full"></div>
                          <div className="h-2 flex-1 bg-emerald-400/50 rounded-full"></div>
                          <div className="h-2 flex-1 bg-slate-800 rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[11px] text-slate-400 mb-1.5 font-medium">
                          <span>Basketball (NBA)</span>
                          <span className="text-slate-200">Role-Gating Base</span>
                        </div>
                        <div className="flex gap-1.5">
                          <div className="h-2 flex-1 bg-indigo-500/60 rounded-full"></div>
                          <div className="h-2 flex-1 bg-indigo-500/60 rounded-full"></div>
                          <div className="h-2 flex-1 bg-slate-800 rounded-full"></div>
                          <div className="h-2 flex-1 bg-slate-800 rounded-full"></div>
                          <div className="h-2 flex-1 bg-slate-800 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'cross-sport' && <CrossSportAnalysis />}
        </section>
      </main>
      
      <footer className="h-10 border-t border-slate-800 bg-slate-900 px-8 flex items-center justify-between shrink-0">
        <div className="flex gap-6">
          <div className="flex items-center gap-2 text-[10px] text-slate-500 tracking-wide uppercase font-bold">
            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span> Methodology: Ridge Regression
          </div>
          <div className="flex items-center gap-2 text-[10px] text-slate-500 tracking-wide uppercase font-bold">
            <span className="w-1.5 h-1.5 bg-slate-600 rounded-full"></span> Position Normalized
          </div>
        </div>
        <div className="text-[10px] text-slate-600 font-mono uppercase tracking-widest">
          Research Archive: Ref #2026-SP-882
        </div>
      </footer>
    </div>
  );
}

export default App;

