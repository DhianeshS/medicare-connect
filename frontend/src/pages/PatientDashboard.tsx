import React from 'react';
import { 
  Activity, 
  Pill, 
  ArrowUpRight,
  TrendingUp,
  Droplets,
  Heart,
  FileText,
  Calendar,
  Stethoscope,
  Info,
  HelpCircle,
  AlertTriangle
} from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { useNavigate } from 'react-router-dom';

const PatientDashboard: React.FC = () => {
    const navigate = useNavigate();

    const handleSOS = () => {
        alert("CRITICAL ALERT: Emergency trauma protocols have been activated. Your clinical profile and GPS coordinates are now streaming to the nearest response unit. STAY CALM. Help is arriving.");
    };

  return (
    <DashboardLayout title="Patient Wellness Command">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column - Stats and Overview */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Health Status Score - Modernized */}
          <div className="bg-primary-teal rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-primary-teal/20">
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div className="max-w-md">
                <div className="flex items-center gap-2 mb-4 bg-white/20 w-fit px-4 py-1.5 rounded-full backdrop-blur-sm">
                   <TrendingUp size={16} />
                   <span className="text-xs font-black uppercase tracking-widest">Wellness Trend: Stable</span>
                </div>
                <p className="text-white/70 text-sm font-bold mb-2">Clinical Health Summary</p>
                <h3 className="text-5xl font-black mb-4 tracking-tight">Vitals Within Norm</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-8 font-medium">
                  Hello Mr. Ramesh, your blood pressure markers are stabilizing. Continue with Amlodipine 5mg as prescribed and maintain your low-sodium diet for the next 15 days.
                </p>
                <button className="bg-white text-primary-teal font-black px-10 py-4 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/5 flex items-center gap-3">
                   Download Clinical Report <FileText size={20} />
                </button>
              </div>
              <div className="bg-white/20 backdrop-blur-xl p-10 rounded-[2.5rem] flex flex-col items-center border border-white/30 shadow-2xl">
                <div className="relative flex items-center justify-center mb-4">
                    <svg className="w-28 h-28 transform -rotate-90">
                        <circle cx="56" cy="56" r="48" stroke="rgba(255,255,255,0.2)" strokeWidth="10" fill="transparent" />
                        <circle cx="56" cy="56" r="48" stroke="white" strokeWidth="10" fill="transparent" strokeDasharray="301.6" strokeDashoffset="45.24" strokeLinecap="round" />
                    </svg>
                    <span className="absolute text-4xl font-black">92</span>
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-black opacity-80">Wellness Score</span>
              </div>
            </div>
            <Activity size={240} className="absolute -bottom-20 -right-20 text-white/10 rotate-12" />
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card !rounded-[2rem] p-8 border-none bg-white shadow-xl shadow-slate-100/50 hover:shadow-2xl transition-all group">
              <div className="bg-red-50 w-14 h-14 rounded-2xl flex items-center justify-center text-emergency mb-6 group-hover:scale-110 transition-transform">
                <Heart size={28} />
              </div>
              <p className="text-xs text-slate-400 font-black uppercase tracking-widest mb-1">Resting Heart Rate</p>
              <h4 className="text-3xl font-black text-secondary-navy">78 <span className="text-sm font-bold text-slate-400">BPM</span></h4>
              <div className="mt-4 flex items-center gap-2 text-primary-teal text-[10px] font-black uppercase tracking-widest">
                 <CheckCircle size={14} /> Normal Range
              </div>
            </div>

            <div className="card !rounded-[2rem] p-8 border-none bg-white shadow-xl shadow-slate-100/50 hover:shadow-2xl transition-all group">
              <div className="bg-primary-teal/10 w-14 h-14 rounded-2xl flex items-center justify-center text-primary-teal mb-6 group-hover:scale-110 transition-transform">
                <Droplets size={28} />
              </div>
              <p className="text-xs text-slate-400 font-black uppercase tracking-widest mb-1">Blood Sugar</p>
              <h4 className="text-3xl font-black text-secondary-navy">94 <span className="text-sm font-bold text-slate-400">mg/dL</span></h4>
              <div className="mt-4 flex items-center gap-2 text-primary-teal text-[10px] font-black uppercase tracking-widest">
                 <CheckCircle size={14} /> Controlled
              </div>
            </div>

            <div className="card !rounded-[2rem] p-8 border-none bg-white shadow-xl shadow-slate-100/50 hover:shadow-2xl transition-all group">
              <div className="bg-amber-50 w-14 h-14 rounded-2xl flex items-center justify-center text-warning mb-6 group-hover:scale-110 transition-transform">
                <Activity size={28} />
              </div>
              <p className="text-xs text-slate-400 font-black uppercase tracking-widest mb-1">Blood Pressure</p>
              <h4 className="text-3xl font-black text-secondary-navy">130/85</h4>
              <div className="mt-4 flex items-center gap-2 text-warning text-[10px] font-black uppercase tracking-widest">
                 <Info size={14} /> Slightly Elevated
              </div>
            </div>
          </div>

          {/* Help & First Aid Center Logic */}
          <div className="card !rounded-[2.5rem] p-0 border-none shadow-xl shadow-slate-100 overflow-hidden group">
            <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-100">
                <div className="flex-1 p-10 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary-teal text-white p-2.5 rounded-xl shadow-lg shadow-primary-teal/20">
                            <HelpCircle size={24} />
                        </div>
                        <h3 className="text-xl font-black text-secondary-navy">Emergency First Aid Guidance</h3>
                    </div>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">
                        Need immediate assistance with fever, minor cuts, or burns? Use our automated first aid command center.
                    </p>
                    <button 
                        onClick={() => navigate('/dashboard/help')}
                        className="btn-primary !px-8 flex items-center gap-2 !bg-secondary-navy group-hover:!bg-primary-teal transition-all"
                    >
                        Access Help Center <ArrowUpRight size={18} />
                    </button>
                </div>
                <div className="md:w-64 p-10 bg-slate-50 flex flex-col items-center justify-center text-center">
                    <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center shadow-xl shadow-slate-200/50 mb-4 transform group-hover:rotate-12 transition-transform">
                        <Stethoscope size={32} className="text-primary-teal" />
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Consultations</p>
                    <p className="text-lg font-black text-secondary-navy">24/7 Support</p>
                </div>
            </div>
          </div>
        </div>

        {/* Right Column - Reminders and SOS */}
        <div className="space-y-10">
          
          {/* Indian Specialist Preview */}
          <div className="card !rounded-[2.5rem] !p-8 border-none shadow-xl shadow-slate-100 relative overflow-hidden group">
             <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-black text-secondary-navy">Assigned Doctor</h3>
                <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase animate-pulse">Available</div>
             </div>
             <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-[1.5rem] bg-white shadow-xl border-4 border-slate-50 overflow-hidden">
                    <img className="w-full h-full object-cover" src="https://ui-avatars.com/api/?name=Arjun+Sharma&background=00B69B&color=fff&bold=true" alt="Doc" />
                </div>
                <div>
                    <h4 className="text-lg font-black text-secondary-navy">Dr. Arjun Sharma</h4>
                    <p className="text-xs font-bold text-slate-400">Chief Cardiologist • MD, DM</p>
                </div>
             </div>
             <button 
                onClick={() => navigate('/dashboard/appointments', { state: { preSelectedDoctorId: 1 } })}
                className="w-full bg-slate-50 hover:bg-primary-teal hover:text-white text-primary-teal py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-sm flex items-center justify-center gap-2"
             >
                Schedule Checkup <Calendar size={16} />
             </button>
          </div>

          <div 
             onClick={handleSOS}
             className="card !p-8 border-none bg-red-600 text-white !rounded-[2.5rem] shadow-2xl shadow-red-200 relative overflow-hidden group cursor-pointer hover:bg-red-700 transition-all active:scale-[0.98]"
          >
            <div className="relative z-10">
                <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 animate-pulse">
                    <AlertTriangle size={28} />
                </div>
                <h3 className="text-2xl font-black mb-3 text-white">Emergency SOS</h3>
                <p className="text-white/80 text-[10px] font-black leading-relaxed mb-8 uppercase tracking-widest">Priority Clinical Dispatch</p>
                <div className="w-full bg-white text-red-600 font-black py-4 rounded-xl shadow-xl flex items-center justify-center gap-3 group-hover:bg-red-50 transition-colors">
                    ACTIVATE HELP
                </div>
            </div>
            <Activity size={180} className="absolute -bottom-10 -right-10 text-white/10 group-hover:rotate-12 transition-transform" />
          </div>

          {/* Daily Rx Checklist */}
          <div className="card !rounded-[2.5rem] !p-8 border-none shadow-xl shadow-slate-100">
            <h3 className="text-xl font-black text-secondary-navy mb-8">Prescription Routine</h3>
            <div className="space-y-4">
              {[
                { name: 'Amlodipine', dose: '5mg', time: '08:00 AM', status: 'Taken' },
                { name: 'Metformin', dose: '500mg', time: '01:30 PM', status: 'Pending' }
              ].map((med, i) => (
                <div key={i} className="flex items-center gap-4 p-5 rounded-[1.5rem] bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all group border border-transparent hover:border-slate-50">
                    <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                        <Pill size={22} className={med.status === 'Taken' ? 'text-emerald-500' : 'text-primary-teal'} />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-black text-secondary-navy tracking-tight">{med.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{med.dose}</p>
                    </div>
                    <span className={`text-[9px] font-black px-3 py-1 rounded-lg uppercase tracking-widest ${med.status === 'Taken' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-200 text-slate-500'}`}>
                        {med.status === 'Taken' ? 'Completed' : med.time}
                    </span>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-50 pt-6 hover:text-primary-teal transition-all">View All Current Meds</button>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

const CheckCircle = ({ size }: { size: number }) => <Heart size={size} fill="currentColor" />;

export default PatientDashboard;
