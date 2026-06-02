import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowRight, 
  FileText, 
  Users, 
  Stethoscope, 
  Activity, 
  LayoutDashboard,
  Menu,
  X,
  ChevronDown,
  Play,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Form states
  const [demoName, setDemoName] = useState('');
  const [demoEmail, setDemoEmail] = useState('');
  const [demoHospital, setDemoHospital] = useState('');
  const [demoPhone, setDemoPhone] = useState('');
  const [demoLocation, setDemoLocation] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [demoError, setDemoError] = useState('');

  const features = [
    { icon: <Users size={20} className="text-primary-teal" />, text: "Patient Lifecycle Management (OPD to Discharge)" },
    { icon: <Activity size={20} className="text-primary-teal" />, text: "IPD/OPD Patient Management" },
    { icon: <FileText size={20} className="text-primary-teal" />, text: "Inventory, Pharmacy, & Lab Integrations" },
    { icon: <FileText size={20} className="text-primary-teal" />, text: "Billing & Accounting" },
    { icon: <Stethoscope size={20} className="text-primary-teal" />, text: "Reporting, Audit & Compliance" },
    { icon: <Activity size={20} className="text-primary-teal" />, text: "360° Clinical & Smart Nursing Module" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-primary-teal/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-primary-teal p-2 rounded-xl text-white group-hover:rotate-6 transition-transform">
              <LayoutDashboard size={24} />
            </div>
            <span className="text-2xl font-bold tracking-tight text-secondary-navy">
              MediCare <span className="text-primary-teal">Connect</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <Link to="/" className="nav-link font-bold text-primary-teal bg-primary-teal/5 px-4 py-2 rounded-full">Home</Link>
            <div className="flex items-center gap-1 nav-link cursor-pointer">Solutions <ChevronDown size={14} /></div>
            <div className="flex items-center gap-1 nav-link cursor-pointer">Company <ChevronDown size={14} /></div>
            <div className="flex items-center gap-1 nav-link cursor-pointer">Resources <ChevronDown size={14} /></div>
            <Link to="/contact" className="nav-link">Contact</Link>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <button className="flex items-center gap-2 px-6 py-2 rounded-full border border-primary-teal/20 text-primary-teal font-bold hover:bg-primary-teal/5 transition-all">
              <FileText size={18} /> Brochure
            </button>
            <button 
              onClick={() => navigate('/register')}
              className="btn-primary flex items-center gap-2"
            >
              Get Free Demo <ArrowRight size={18} />
            </button>
            <Link to="/login" className="flex items-center gap-1 font-bold text-slate-600 hover:text-primary-teal transition-colors ml-4">
              <ArrowRight size={18} className="rotate-[-45deg]" /> Login
            </Link>
          </div>

          <button className="lg:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-100 p-6 space-y-4 animate-fade-in">
             <Link to="/" className="block font-bold text-primary-teal">Home</Link>
             <div className="block font-medium text-slate-600">Solutions</div>
             <div className="block font-medium text-slate-600">Company</div>
             <div className="block font-medium text-slate-600">Resources</div>
             <Link to="/contact" className="block font-medium text-slate-600">Contact</Link>
             <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
               <button 
                 onClick={() => { navigate('/register'); setIsMenuOpen(false); }}
                 className="w-full btn-primary py-4"
               >
                 Get Free Demo
               </button>
               <button 
                 onClick={() => { navigate('/login'); setIsMenuOpen(false); }}
                 className="w-full py-4 bg-slate-50 border border-slate-200 text-slate-600 font-black rounded-2xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
               >
                 <ArrowRight size={18} className="rotate-[-45deg]" /> Login to Portal
               </button>
             </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 hero-gradient overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="flex-1 animate-fade-in">
            <span className="feature-tag">Trusted by 500+ Hospitals, Labs, & Clinics Across India</span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.1]">
              India's #1 Hospital <br />
              Management <br />
              <span className="text-primary-teal">Software (HMS & HIS)</span>
            </h1>
            <p className="text-lg text-slate-500 mb-10 max-w-xl leading-relaxed">
              The complete cloud-based Hospital Management Software with EMR, OPD/IPD billing, and pharmacy management. MediCare Connect empowers Hospitals, Clinics, and Labs to automate operations, enhance patient care, and achieve digital excellence.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 bg-primary-teal/[0.03] p-8 rounded-[2rem] border border-primary-teal/5">
              <div className="col-span-full mb-2">
                <h4 className="font-bold text-secondary-navy">All-in-one cloud platform for:</h4>
              </div>
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-3 group">
                  <div className="shrink-0 transition-transform group-hover:scale-110">
                    {f.icon}
                  </div>
                  <span className="text-sm font-semibold text-slate-700 leading-tight">
                    {f.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-6">
              <button 
                onClick={() => document.getElementById('demo-form-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-primary-teal text-white p-4 rounded-full shadow-xl shadow-primary-teal/20 hover:scale-110 transition-all flex items-center gap-2 font-bold px-8"
              >
                 <Play size={20} fill="white" /> Book Demo
              </button>
            </div>
          </div>

          {/* Registration Form / Demo Request */}
          <div id="demo-form-section" className="w-full lg:w-[500px] animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 p-10 relative">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-secondary-navy mb-2">
                  Request a <span className="text-primary-teal">Free Demo</span>
                </h2>
                <p className="text-slate-500 text-sm">Experience MediCare Connect firsthand. Schedule your personalized demo.</p>
              </div>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setDemoError('');
                  if (!demoName || !demoEmail || !demoHospital || !demoLocation || !demoPhone) {
                    setDemoError('Please fill out all required fields.');
                    return;
                  }
                  const ans = securityAnswer.trim();
                  if (ans !== '19' && ans !== '21') {
                    setDemoError('Security check failed! Hint: 9 + 10 = 19');
                    return;
                  }
                  
                  const firstName = demoName.split(' ')[0] || 'Demo';
                  const lastName = demoName.split(' ').slice(1).join(' ') || 'Patient';
                  
                  // Auto-login into the Patient Bypass
                  login({
                    id: 99,
                    email: demoEmail,
                    firstName: firstName,
                    lastName: lastName,
                    role: 'ROLE_PATIENT'
                  }, 'demo-token');

                  // Save custom patient info in localStorage so it reflects inside settings
                  localStorage.setItem(`patient_demo_info`, JSON.stringify({
                    hospital: demoHospital,
                    location: demoLocation,
                    phone: demoPhone
                  }));

                  navigate('/dashboard');
                }} 
                className="space-y-6"
              >
                {demoError && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-bold border border-red-100 flex items-center gap-2 animate-shake">
                    <AlertCircle size={16} /> {demoError}
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1 mb-1.5 block">Your Name *</label>
                  <input 
                    type="text" 
                    required
                    value={demoName}
                    onChange={(e) => setDemoName(e.target.value)}
                    className="input-field" 
                    placeholder="Enter your full name" 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase ml-1 mb-1.5 block">Hospital Name *</label>
                    <input 
                      type="text" 
                      required
                      value={demoHospital}
                      onChange={(e) => setDemoHospital(e.target.value)}
                      className="input-field" 
                      placeholder="Hospital/Clinic" 
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase ml-1 mb-1.5 block">Location *</label>
                    <input 
                      type="text" 
                      required
                      value={demoLocation}
                      onChange={(e) => setDemoLocation(e.target.value)}
                      className="input-field" 
                      placeholder="City, State" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase ml-1 mb-1.5 block">Email Address *</label>
                    <input 
                      type="email" 
                      required
                      value={demoEmail}
                      onChange={(e) => setDemoEmail(e.target.value)}
                      className="input-field" 
                      placeholder="name@work.com" 
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase ml-1 mb-1.5 block">Phone Number *</label>
                    <input 
                      type="tel" 
                      required
                      value={demoPhone}
                      onChange={(e) => setDemoPhone(e.target.value)}
                      className="input-field" 
                      placeholder="+91 ..." 
                    />
                  </div>
                </div>

                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                   <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-bold text-slate-600">Security Check: What is 9 + 10?</span>
                   </div>
                   <input 
                     type="text" 
                     required
                     value={securityAnswer}
                     onChange={(e) => setSecurityAnswer(e.target.value)}
                     className="w-full bg-white border border-slate-200 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-primary-teal/20" 
                     placeholder="Enter answer" 
                   />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-primary-teal hover:bg-[#009E86] text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-primary-teal/20 active:scale-[0.98]"
                >
                  Request Your Free Demo
                </button>
              </form>

              {/* Chat pulse */}
              <div className="absolute -bottom-6 -right-6">
                <div className="w-16 h-16 bg-[#10B981] rounded-full flex items-center justify-center text-white shadow-2xl animate-bounce">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button for the demo style */}
      <div 
        onClick={() => document.getElementById('demo-form-section')?.scrollIntoView({ behavior: 'smooth' })}
        className="fixed bottom-10 left-10 z-40 bg-primary-teal text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 font-bold hover:scale-105 transition-all cursor-pointer border border-white/20"
      >
        <LayoutDashboard size={20} />
        Book Demo
      </div>
    </div>
  );
};

export default LandingPage;
