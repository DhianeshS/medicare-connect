import React from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  ClipboardList, 
  Pill, 
  FileText, 
  Users, 
  Video, 
  Settings,
  LogOut,
  Bell,
  Search,
  Activity,
  Heart,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';

interface SidebarProps {
  role: string;
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const { logout } = useAuth();
  
  const commonLinks = [
    { name: 'Dashboard', icon: <LayoutDashboard size={22} />, path: '/dashboard' },
  ];

  const patientLinks = [
    ...commonLinks,
    { name: 'Appointments', icon: <Calendar size={22} />, path: '/dashboard/appointments' },
    { name: 'Medical History', icon: <ClipboardList size={22} />, path: '/dashboard/records' },
    { name: 'My Medications', icon: <Pill size={22} />, path: '/dashboard/medications' },
    { name: 'Family Group', icon: <Users size={22} />, path: '/dashboard/family' },
    { name: 'Telemedicine', icon: <Video size={22} />, path: '/dashboard/telemedicine' },
    { name: 'Health Analytics', icon: <Activity size={22} />, path: '/dashboard/analytics' },
    { name: 'Medical Knowledge', icon: <ClipboardList size={22} />, path: '/dashboard/knowledge' },
    { name: 'AI Symptom Check', icon: <Heart size={22} />, path: '/dashboard/symptoms' },
    { name: 'Help & First Aid', icon: <Activity size={22} />, path: '/dashboard/help' },
  ];

  const doctorLinks = [
    ...commonLinks,
    { name: 'My Patients', icon: <Users size={22} />, path: '/dashboard/patients' },
    { name: 'Booking Schedule', icon: <Calendar size={22} />, path: '/dashboard/schedule' },
    { name: 'Patient Consultation', icon: <Video size={22} />, path: '/dashboard/consult' },
    { name: 'Prescription Mgr', icon: <FileText size={22} />, path: '/dashboard/prescriptions' },
  ];

  const adminLinks = [
    ...commonLinks,
    { name: 'Hospital Staff', icon: <Users size={22} />, path: '/dashboard/manage-doctors' },
    { name: 'Security Audit', icon: <FileText size={22} />, path: '/dashboard/logs' },
    { name: 'Portal Config', icon: <Settings size={22} />, path: '/dashboard/settings' },
  ];

  const links = role === 'ROLE_PATIENT' ? patientLinks : role === 'ROLE_DOCTOR' ? doctorLinks : adminLinks;

  return (
    <div className="w-80 bg-white h-screen border-r border-slate-100 flex flex-col fixed left-0 top-0 pt-10 pb-6 shadow-2xl shadow-slate-200/50 z-20">
      <div className="px-8 mb-12 flex items-center gap-3">
        <div className="bg-primary-teal p-2 rounded-xl text-white shadow-lg shadow-primary-teal/20">
          <LayoutDashboard size={26} />
        </div>
        <h1 className="text-2xl font-black tracking-tight text-secondary-navy">MediCare</h1>
      </div>

      <nav className="flex-1 px-6 space-y-2 overflow-y-auto">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-4">Main Menu</p>
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === '/dashboard'}
            className={({ isActive }) => 
              `flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all font-bold group ${
                isActive 
                  ? 'bg-primary-teal text-white shadow-xl shadow-primary-teal/20' 
                  : 'text-slate-500 hover:bg-primary-teal/5 hover:text-primary-teal'
              }`
            }
          >
            <span className="shrink-0 transition-transform group-hover:scale-110">
              {link.icon}
            </span>
            <span className="text-sm">{link.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="px-6 space-y-4">
        <div className="bg-slate-50 rounded-[2rem] p-6 border border-slate-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center mb-3">
                <MessageSquare className="text-primary-teal" size={24} />
            </div>
            <p className="text-sm font-black text-secondary-navy mb-1">Need Support?</p>
            <p className="text-xs text-slate-500 font-medium mb-3">Our team is here 24/7</p>
            <button className="w-full py-2 bg-white border border-slate-200 text-primary-teal text-xs font-black rounded-full hover:bg-primary-teal hover:text-white transition-all shadow-sm">
                Get Help
            </button>
        </div>

        <button 
          onClick={logout}
          className="flex items-center gap-4 w-full px-6 py-4 rounded-2xl text-red-500 hover:bg-red-50 transition-all font-black"
        >
          <LogOut size={22} />
          <span className="text-sm">Log out</span>
        </button>
      </div>
    </div>
  );
};

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="h-24 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-10 sticky top-0 z-30">
      <div>
        <h2 className="text-3xl font-black text-secondary-navy">{title}</h2>
        <p className="text-xs font-bold text-slate-400 mt-0.5">Welcome back, {user?.firstName}</p>
      </div>
      
      <div className="flex items-center gap-8">
        <div className="relative group hidden xl:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary-teal transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search records, doctors..." 
            className="pl-12 pr-6 py-3 bg-slate-50 border border-slate-100 focus:bg-white focus:border-primary-teal rounded-2xl text-sm w-96 transition-all outline-none font-medium"
          />
        </div>
        
        <div className="flex items-center gap-4">
            <button className="relative p-3 text-slate-400 hover:text-primary-teal hover:bg-primary-teal/5 rounded-2xl transition-all">
            <Bell size={24} />
            <span className="absolute top-3 right-3 w-3 h-3 bg-emergency rounded-full border-2 border-white animate-pulse"></span>
            </button>
            
            <div className="flex items-center gap-4 pl-6 border-l border-slate-100 cursor-pointer group" onClick={() => navigate('/dashboard/settings')}>
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-black text-secondary-navy group-hover:text-primary-teal transition-colors leading-none mb-1">
                        {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{user?.role.replace('ROLE_', '')}</p>
                </div>
                <div className="bg-primary-teal/10 w-12 h-12 rounded-2xl overflow-hidden border-2 border-white shadow-xl shadow-primary-teal/10 p-0.5">
                    <img className="w-full h-full object-cover rounded-xl" src={`https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=00B69B&color=fff&bold=true`} alt="Avatar" />
                </div>
            </div>
        </div>
      </div>
    </header>
  );
};

export const DashboardLayout: React.FC<{ children: React.ReactNode, title: string }> = ({ children, title }) => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-white">
      <Sidebar role={user?.role || ''} />
      <div className="pl-80">
        <Header title={title} />
        <main className="p-10 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
};
