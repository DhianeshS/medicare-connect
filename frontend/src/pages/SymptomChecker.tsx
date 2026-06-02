import React, { useState } from 'react';
import { Search, Activity, AlertCircle, ChevronRight, Hash, ShieldCheck } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';

const SymptomChecker: React.FC = () => {
  const [symptoms, setSymptoms] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeSymptoms = () => {
    if (!symptoms.trim()) return;
    
    setIsAnalyzing(true);
    // Simulating AI analysis
    setTimeout(() => {
      const mockResults = [
        { condition: 'Common Cold', severity: 'Low', specialist: 'GP', match: '92%' },
        { condition: 'Influenza', severity: 'Medium', specialist: 'Infectious Disease', match: '45%' }
      ];
      setResults(mockResults);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <DashboardLayout title="AI Symptom Checker">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Intro Card */}
        <div className="card bg-gradient-to-r from-primary-blue to-blue-600 text-white p-10">
          <div className="flex items-start justify-between">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold mb-4">Smart Symptom Analysis</h2>
              <p className="text-blue-100 text-sm leading-relaxed mb-6">
                Our AI-powered tool helps you understand your symptoms and provides guidance on the next steps. Please note: This is not a formal diagnosis.
              </p>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-xs font-bold bg-white/20 px-3 py-1.5 rounded-lg">
                  <ShieldCheck size={14} /> SECURE DATA
                </div>
                <div className="flex items-center gap-2 text-xs font-bold bg-white/20 px-3 py-1.5 rounded-lg">
                  <Activity size={14} /> INSTANT RESULTS
                </div>
              </div>
            </div>
            <Activity size={100} className="text-white/10 hidden md:block" />
          </div>
        </div>

        {/* Search Section */}
        <div className="card p-8">
          <label className="block text-sm font-bold text-secondary-navy mb-4">What symptoms are you experiencing?</label>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="e.g. cough, fever, headache, fatigue"
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-primary-blue transition-all"
              />
            </div>
            <button 
              onClick={analyzeSymptoms}
              disabled={isAnalyzing}
              className="px-8 bg-secondary-navy hover:bg-slate-800 text-white font-bold rounded-xl transition-all disabled:opacity-50"
            >
              {isAnalyzing ? 'Analyzing...' : 'Check Now'}
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-2">Popular:</span>
            {['Fever', 'Cough', 'Dizziness', 'Sore Throat'].map(s => (
              <button key={s} onClick={() => setSymptoms(s)} className="text-xs bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-primary-blue px-3 py-1 rounded-full border border-slate-200 transition-all">
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Results Section */}
        {isAnalyzing && (
          <div className="flex flex-col items-center justify-center p-12 space-y-4">
            <div className="w-12 h-12 border-4 border-primary-blue/20 border-t-primary-blue rounded-full animate-spin"></div>
            <p className="text-sm font-bold text-slate-500 animate-pulse">Running diagnostic patterns...</p>
          </div>
        )}

        {results.length > 0 && !isAnalyzing && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-bold text-secondary-navy flex items-center gap-2">
              <Hash size={20} className="text-primary-blue" /> Analysis Results
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map((res, i) => (
                <div key={i} className="card p-6 border-l-4 border-primary-blue relative overflow-hidden group hover:shadow-lg transition-all cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[10px] font-bold bg-blue-50 text-primary-blue px-2 py-1 rounded-md mb-2 inline-block">CONDITION MATCH: {res.match}</span>
                      <h4 className="text-xl font-bold text-secondary-navy">{res.condition}</h4>
                    </div>
                    <div className={`px-3 py-1 rounded-lg text-xs font-bold ${res.severity === 'Low' ? 'bg-green-100 text-success' : 'bg-amber-100 text-warning'}`}>
                      {res.severity} Severity
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                    <div className="flex items-center gap-1">
                      <User size={14} className="text-slate-400" /> Specialist: {res.specialist}
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button className="text-primary-blue font-bold text-xs flex items-center gap-1 group-hover:gap-2 transition-all">
                      Learn More <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="card bg-amber-50 border-amber-100 flex gap-4 p-6 mt-8">
              <AlertCircle className="text-warning shrink-0" size={24} />
              <div>
                <p className="text-sm font-bold text-secondary-navy mb-1">Medical Disclaimer</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  These results are for informational purposes only. If you are experiencing a medical emergency, please use the SOS button or contact emergency services immediately.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

const User = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

export default SymptomChecker;
