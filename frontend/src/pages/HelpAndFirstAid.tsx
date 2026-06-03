import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Activity, 
  Droplets, 
  Thermometer, 
  Zap, 
  ShieldAlert,
  FlameKindling,
  Stethoscope,
  Clock,
  ExternalLink
} from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';

const firstAidData = [
  {
    id: 'fever',
    title: 'Fever',
    icon: <Thermometer className="text-primary-teal" />,
    steps: [
      'Maintain hydration with plenty of water and electrolytes.',
      'Get ample rest to allow the body to recover.',
      'Monitor temperature every 4 hours.',
      'Use cold compresses if temperature is high.'
    ],
    color: 'emerald'
  },
  {
    id: 'burns',
    title: 'Minor Burns',
    icon: <FlameKindling className="text-amber-500" />,
    steps: [
      'Hold the burned area under cool running water for 10-20 mins.',
      'Cover with a sterile, non-adhesive dressing or dressing.',
      'Do not apply ice, butter, or ointments to the burn.',
      'Take appropriate pain relievers if necessary.'
    ],
    color: 'amber'
  },
  {
    id: 'cuts',
    title: 'Cuts & Wounds',
    icon: <Droplets className="text-red-500" />,
    steps: [
      'Clean the wound thoroughly with clean water.',
      'Apply antiseptic solution to prevent infection.',
      'Cover with a clean, dry bandage.',
      'Apply gentle pressure to stop any minor bleeding.'
    ],
    color: 'red'
  },
  {
    id: 'headache',
    title: 'Headache',
    icon: <Zap className="text-indigo-500" />,
    steps: [
      'Rest in a quiet, dark room.',
      'Drink water to stay hydrated.',
      'Avoid bright screens and loud noises.',
      'Gentle head massages may help relieve tension.'
    ],
    color: 'indigo'
  },
  {
    id: 'cold',
    title: 'Cold & Cough',
    icon: <Droplets className="text-blue-500" />,
    steps: [
      'Consume warm fluids like herbal tea or soup.',
      'Practice steam inhalation safely twice a day.',
      'Take adequate rest to boost immunity.',
      'Gargle with warm salt water for sore throat relief.'
    ],
    color: 'blue'
  }
];

const HelpAndFirstAid: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [openId, setOpenId] = useState<string | null>(null);
    const [sosActivated, setSosActivated] = useState(false);

    const filteredData = firstAidData.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <DashboardLayout title="Support & First Aid Center">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Urgent Disclaimer */}
        <div className="bg-red-50 border-2 border-red-100 p-8 rounded-[2.5rem] flex items-start gap-6 shadow-xl shadow-red-500/5 animate-fade-in text-red-700">
            <div className="bg-white p-4 rounded-2xl shadow-lg text-red-600">
                <ShieldAlert size={32} />
            </div>
            <div>
                <h4 className="text-lg font-black uppercase tracking-widest mb-1">Medical Warning</h4>
                <p className="font-bold leading-relaxed">
                    This information is for educational purposes only. If you are experiencing a medical emergency, please call your local emergency number immediately or consult a licensed healthcare professional.
                </p>
            </div>
        </div>

        {/* Search & Intro */}
        <div className="text-center space-y-6">
            <h2 className="text-4xl font-black text-secondary-navy tracking-tight">How can we help you today?</h2>
            <div className="relative max-w-xl mx-auto group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-teal transition-all" size={24} />
                <input 
                    type="text" 
                    placeholder="Search symptoms or conditions..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-field pl-16 py-6 !rounded-[2rem] !text-lg shadow-xl shadow-slate-100" 
                />
            </div>
        </div>

        {/* First Aid Grid/Accordion */}
        <div className="space-y-4">
            {filteredData.map((item) => (
                <div 
                    key={item.id} 
                    className={`card !rounded-[2rem] border-none shadow-xl transition-all overflow-hidden ${
                        openId === item.id ? 'bg-white ring-2 ring-primary-teal' : 'bg-white hover:bg-slate-50'
                    }`}
                >
                    <button 
                        onClick={() => setOpenId(openId === item.id ? null : item.id)}
                        className="w-full flex items-center justify-between p-8 text-left"
                    >
                        <div className="flex items-center gap-6">
                            <div className={`p-4 rounded-2xl bg-slate-50 shadow-sm`}>
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-black text-secondary-navy">{item.title}</h3>
                        </div>
                        {openId === item.id ? <ChevronUp className="text-slate-300" /> : <ChevronDown className="text-slate-300" />}
                    </button>
                    
                    {openId === item.id && (
                        <div className="px-8 pb-10 animate-fade-in">
                            <div className="pl-16 space-y-4">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Recommended Immediate Actions</h4>
                                {item.steps.map((step, i) => (
                                    <div key={i} className="flex items-center gap-4 group">
                                        <div className="w-2 h-2 rounded-full bg-primary-teal"></div>
                                        <p className="text-sm font-bold text-slate-600 group-hover:text-secondary-navy transition-colors">{step}</p>
                                    </div>
                                ))}
                                
                                <div className="mt-10 flex gap-4">
                                    <button className="btn-primary !py-3 !px-8 flex items-center gap-2">
                                        <Stethoscope size={18} /> Book Consultation
                                    </button>
                                    <button className="py-3 px-8 bg-slate-50 text-slate-500 font-black rounded-xl hover:bg-primary-teal/10 hover:text-primary-teal transition-all flex items-center gap-2">
                                        <Clock size={18} /> Emergency Contact
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div 
                onClick={() => setSosActivated(true)}
                className="card !rounded-[2.5rem] p-10 bg-secondary-navy text-white relative overflow-hidden group hover:scale-[1.02] transition-all cursor-pointer"
            >
                <div className="relative z-10">
                    <h3 className="text-2xl font-black mb-2">Emergency Services</h3>
                    <p className="text-sm text-white/60 font-medium mb-6">Connect with 24/7 emergency clinical support.</p>
                    <button className="flex items-center gap-2 bg-primary-teal text-white px-6 py-3 rounded-xl font-black shadow-lg shadow-primary-teal/20">
                        Launch SOS Hub <ArrowUpRight size={18} />
                    </button>
                </div>
                <Activity size={120} className="absolute -bottom-10 -right-10 text-white/5 rotate-12 group-hover:rotate-0 transition-all" />
            </div>

            <div className="card !rounded-[2.5rem] p-10 bg-white border-2 border-slate-100 flex flex-col justify-center">
                <h3 className="text-xl font-black text-secondary-navy mb-2">Technical Support</h3>
                <p className="text-sm text-slate-500 font-bold mb-6">Need help with your medical records or portal access?</p>
                <div className="flex gap-4">
                    <button className="text-primary-teal font-black text-xs uppercase tracking-widest hover:underline flex items-center gap-2">
                         Open Ticket <ExternalLink size={14} />
                    </button>
                    <button className="text-slate-400 font-black text-xs uppercase tracking-widest hover:underline">
                         Knowledge Base
                    </button>
                </div>
            </div>
        </div>

      </div>

      {/* SOS Activation Modal */}
      {sosActivated && (
        <div className="fixed inset-0 bg-red-950/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] p-10 max-w-md w-full shadow-2xl border-2 border-red-100 text-center space-y-8 animate-scale-up">
            <div className="bg-red-50 text-red-600 w-24 h-24 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-lg shadow-red-600/10 animate-pulse">
              <ShieldAlert size={48} />
            </div>
            
            <div className="space-y-3">
              <h3 className="text-3xl font-black text-red-600 tracking-tight">SOS Active!</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Priority Trauma Dispatch Initialized</p>
            </div>
            
            <div className="bg-red-50/50 rounded-[2rem] p-6 border border-red-50 text-left space-y-4">
              <p className="text-xs text-red-700 font-bold leading-relaxed text-center">
                Critical Alert: Emergency trauma protocols have been activated. Your clinical profile and GPS coordinates are now streaming to the nearest response unit.
              </p>
              <div className="w-full h-1 bg-red-100 rounded-full overflow-hidden">
                <div className="h-full bg-red-600 animate-[pulse_1.5s_infinite] w-full"></div>
              </div>
            </div>
            
            <button 
              onClick={() => setSosActivated(false)}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-red-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Cancel SOS Protocol
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

const ArrowUpRight = ({ size }: { size: number }) => <ExternalLink size={size} />;

export default HelpAndFirstAid;
