import React from 'react';
import { 
  Activity, 
  Heart, 
  Droplet, 
  Zap,
  Info,
  ChevronRight,
  Download
} from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';

const HealthMetrics: React.FC = () => {
  return (
    <DashboardLayout title="Health Metrics & Analytics">
      <div className="space-y-8">
        
        {/* Real-time Status Banner */}
        <div className="card bg-gradient-to-br from-secondary-navy to-slate-800 p-8 text-white relative overflow-hidden">
          <Activity size={120} className="absolute -right-4 -bottom-4 text-white/5" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Excellent Progress!</h2>
              <p className="text-blue-100 text-lg">Your health score has increased by <span className="font-bold text-success">8%</span> this month.</p>
            </div>
            <div className="flex gap-4">
              <button className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl border border-white/10 flex items-center gap-2 transition-all">
                <Download size={18} /> Export Health Data
              </button>
            </div>
          </div>
        </div>

        {/* Vital Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Heart Rate Chart */}
          <div className="card p-6">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-red-50 p-2 rounded-lg text-emergency">
                  <Heart size={20} fill="currentColor" />
                </div>
                <div>
                  <h3 className="font-bold text-secondary-navy">Heart Rate (BPM)</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Last 7 Days</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-secondary-navy">72 <span className="text-sm font-normal text-slate-400">avg</span></p>
              </div>
            </div>
            <div className="h-48 flex items-end gap-2 px-2">
              {[65, 78, 62, 85, 70, 72, 68].map((h, i) => (
                <div key={i} className="flex-1 bg-red-100 hover:bg-emergency rounded-t-lg transition-all relative group" style={{ height: `${h}%` }}>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-secondary-navy text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-all">{h}</div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-400">
              <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
            </div>
          </div>

          {/* Blood Sugar Chart */}
          <div className="card p-6">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 p-2 rounded-lg text-primary-blue">
                  <Droplet size={20} fill="currentColor" />
                </div>
                <div>
                  <h3 className="font-bold text-secondary-navy">Blood Sugar (mg/dL)</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Morning Readings</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-secondary-navy">94 <span className="text-sm font-normal text-slate-400">avg</span></p>
              </div>
            </div>
            <div className="h-48 flex items-end gap-2 px-2">
              {[90, 95, 88, 102, 92, 94, 91].map((h, i) => (
                <div key={i} className="flex-1 bg-blue-100 hover:bg-primary-blue rounded-t-lg transition-all relative group" style={{ height: `${h}%` }}>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-secondary-navy text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-all">{h}</div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-400">
              <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
            </div>
          </div>
        </div>

        {/* Detailed Metrics Table */}
        <div className="card overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-secondary-navy">Historical Health Data</h3>
            <div className="flex gap-2">
              <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 rounded text-slate-500">MONTHLY VIEW</span>
            </div>
          </div>
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <th className="px-8 py-4">Date</th>
                <th className="px-8 py-4">Weight (kg)</th>
                <th className="px-8 py-4">BP (mmHg)</th>
                <th className="px-8 py-4">Sleep (Hrs)</th>
                <th className="px-8 py-4">Spo2 (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                { date: 'May 01, 2026', weight: '72.4', bp: '120/80', sleep: '7.5', spo2: '99' },
                { date: 'Apr 01, 2026', weight: '73.2', bp: '124/82', sleep: '6.8', spo2: '98' },
                { date: 'Mar 01, 2026', weight: '74.5', bp: '130/85', sleep: '6.2', spo2: '98' }
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-4 text-sm font-bold text-secondary-navy">{row.date}</td>
                  <td className="px-8 py-4 text-sm text-slate-600">{row.weight}</td>
                  <td className="px-8 py-4 text-sm text-slate-600">{row.bp}</td>
                  <td className="px-8 py-4 text-sm text-slate-600">{row.sleep}</td>
                  <td className="px-8 py-4 text-sm font-bold text-success">{row.spo2}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* AI Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
          <div className="card p-8 bg-blue-50/50 border-primary-blue/10 flex gap-6 items-start">
            <div className="bg-primary-blue text-white p-3 rounded-2xl">
              <Zap size={24} />
            </div>
            <div>
              <h4 className="font-bold text-secondary-navy mb-2">AI Perspective</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Your heart rate variability is showing positive trends. We recommend maintaining your current morning cardio routine for localized heart health improvements.
              </p>
              <button className="text-primary-blue font-bold text-xs flex items-center gap-1 hover:gap-2 transition-all">
                Full AI Health Report <ChevronRight size={14} />
              </button>
            </div>
          </div>
          <div className="card p-8 border-amber-100 bg-amber-50/30 flex gap-6 items-start">
            <div className="bg-warning text-white p-3 rounded-2xl">
              <Info size={24} />
            </div>
            <div>
              <h4 className="font-bold text-secondary-navy mb-2">Smart Observation</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                We noticed a small spike in blood sugar on Tuesdays. Consider monitoring your late-night dietary intake on Monday evenings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HealthMetrics;
