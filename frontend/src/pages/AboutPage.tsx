import React from 'react';
import { 
  Heart, 
  Activity, 
  Zap, 
  Video, 
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  const features = [
    { name: 'Appointment Booking', desc: 'Secure and instant scheduling with top specialists.', icon: <Calendar size={20} /> },
    { name: 'Medical History Tracking', desc: 'Complete access to your digital health records.', icon: <FileText size={20} /> },
    { name: 'Prescription Management', desc: 'Track and download your digital prescriptions.', icon: <Pill size={20} /> },
    { name: 'Medication Reminders', desc: 'Never miss a dose with our smart alerts.', icon: <Clock size={20} /> },
    { name: 'Telemedicine', desc: 'Consult with doctors from the comfort of your home.', icon: <Video size={20} /> },
    { name: 'Family Health', desc: 'Manage healthcare for your entire family.', icon: <Users size={20} /> },
    { name: 'Health Analytics', desc: 'Visual charts for monitoring your vital signs.', icon: <Activity size={20} /> },
    { name: 'Emergency SOS', desc: 'Instant assistance during medical emergencies.', icon: <AlertCircle size={20} /> }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary-blue/5 to-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white p-4 rounded-3xl shadow-xl shadow-blue-500/10 text-primary-blue animate-fade-in">
              <Activity size={48} />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-secondary-navy mb-6 tracking-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Empowering Patients Through <br /> <span className="text-primary-blue">Connected Healthcare</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto mb-10 leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            MediCare Connect was created to empower patients by giving them complete control over their healthcare information while simplifying access to healthcare services.
          </p>
          <div className="flex justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Link to="/register" className="btn-primary py-4 px-10 rounded-2xl shadow-lg shadow-blue-500/30">Get Started Now</Link>
            <Link to="/contact" className="btn-secondary py-4 px-10 rounded-2xl">Contact Us</Link>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-6xl mx-auto py-24 px-4 border-t border-slate-100">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-secondary-navy">Our Mission</h2>
            <div className="w-20 h-1.5 bg-primary-blue rounded-full"></div>
            <p className="text-lg text-slate-500 leading-relaxed italic">
              "To create a patient-first healthcare ecosystem where healthcare is accessible, secure, connected, and efficient."
            </p>
            <div className="space-y-4">
              {[
                { title: 'Accessibility', desc: 'Breaking down barriers to healthcare access.' },
                { title: 'Security', desc: 'Protecting patient data with enterprise-grade encryption.' },
                { title: 'Connectivity', desc: 'Ensuring seamless communication between patients and doctors.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="bg-blue-50 p-1.5 rounded-full text-primary-blue shrink-0">
                    <Zap size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-secondary-navy">{item.title}</h4>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-slate-100 overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800" alt="Mission" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -left-8 card p-6 bg-white shadow-2xl border-none hidden md:block">
              <div className="flex items-center gap-3 mb-2">
                <Heart className="text-emergency" size={24} fill="currentColor" />
                <span className="text-3xl font-bold text-secondary-navy">10k+</span>
              </div>
              <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Trusted by Patients</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-slate-50 py-24 px-4">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-secondary-navy mb-4">Core Platform Features</h2>
          <p className="text-slate-500">Everything you need to manage your healthcare journey in one place.</p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={i} className="card p-8 group hover:bg-primary-blue transition-all duration-300">
              <div className="bg-primary-blue/10 p-3 rounded-2xl text-primary-blue mb-4 group-hover:bg-white/20 group-hover:text-white transition-all w-fit">
                {f.icon}
              </div>
              <h4 className="text-lg font-bold text-secondary-navy mb-2 group-hover:text-white transition-all">{f.name}</h4>
              <p className="text-sm text-slate-500 leading-relaxed group-hover:text-blue-100 transition-all">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Vision Statement */}
      <div className="py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto bg-secondary-navy rounded-3xl p-16 text-white relative overflow-hidden shadow-2xl">
          <Activity size={120} className="absolute -top-4 -right-4 text-white/5" />
          <h2 className="text-4xl font-bold mb-6">Our Vision</h2>
          <p className="text-2xl text-blue-100 leading-relaxed max-w-2xl mx-auto">
            Providing a patient-first ecosystem where healthcare is accessible, secure, connected, and efficient for everyone.
          </p>
        </div>
      </div>
    </div>
  );
};

// Internal mocks
const Calendar = ({ size }: { size: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const FileText = ({ size }: { size: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>;
const Pill = ({ size }: { size: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>;
const Clock = ({ size }: { size: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const Users = ({ size }: { size: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;

export default AboutPage;
