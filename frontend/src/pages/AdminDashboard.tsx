import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Search, 
  ArrowUpRight, 
  Eye, 
  Activity,
  AlertCircle,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';

const AdminDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activePatients] = useState([
    { id: 1, firstName: 'Ramesh', lastName: 'Kumar', email: 'ramesh@test.com', status: 'ONLINE', age: '45 Yrs', phone: '+91 98765 0011' },
    { id: 2, firstName: 'Lakshmi', lastName: 'Devi', email: 'lakshmi@test.com', status: 'IDLE', age: '32 Yrs', phone: '+91 98765 0021' },
    { id: 3, firstName: 'Suresh', lastName: 'Raj', email: 'suresh@test.com', status: 'ONLINE', age: '58 Yrs', phone: '+91 98765 0031' },
    { id: 4, firstName: 'Anita', lastName: 'Sharma', email: 'anita@test.com', status: 'ONLINE', age: '29 Yrs', phone: '+91 98765 0041' }
  ]);

  return (
    <DashboardLayout title="Hospital Governance Hub">
      <div className="space-y-10">
        
        {/* Real-time System Telemetry */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
                { label: 'Total Patients', value: '45,231', trend: '+5.2%', icon: <Users size={20} /> },
                { label: 'Active Doctors', value: '124', trend: '+2.1%', icon: <ShieldCheck size={20} /> },
                { label: 'Daily Bookings', value: '382', trend: '-1.4%', icon: <Calendar size={20} /> },
                { label: 'System Uptime', value: '99.98%', trend: 'Stable', icon: <Activity size={20} /> }
            ].map((stat, i) => (
                <div key={i} className="card !rounded-[2rem] p-8 border-none shadow-xl shadow-slate-100 bg-white group hover:bg-secondary-navy transition-all duration-500">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 rounded-2xl bg-slate-50 text-primary-teal group-hover:bg-white/10 group-hover:text-white transition-all">
                            {stat.icon}
                        </div>
                        <span className={`text-[10px] font-black tracking-widest ${stat.trend.includes('-') ? 'text-red-500' : 'text-emerald-500'} group-hover:text-white/80`}>{stat.trend}</span>
                    </div>
                    <h3 className="text-3xl font-black text-secondary-navy group-hover:text-white transition-all">{stat.value}</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 group-hover:text-white/60">{stat.label}</p>
                </div>
            ))}
        </div>

        {/* Active Patients Monitoring with Clinical Context */}
        <div className="card !rounded-[2.5rem] p-10 border-none shadow-xl shadow-slate-100 bg-white">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                <div>
                    <h3 className="text-2xl font-black text-secondary-navy">Active Patients Monitoring</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Live Telemetry Control</p>
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:flex-none">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input 
                            type="text" 
                            placeholder="Search clinical registry..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input-field pl-10 py-3 !rounded-xl !text-xs w-full md:w-64 bg-slate-50 border-none" 
                        />
                    </div>
                    <div className="bg-emerald-50 text-emerald-600 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                         <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                         12 Active
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-50">
                            <th className="pb-6 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center w-20">Avatar</th>
                            <th className="pb-6 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Patient Profile</th>
                            <th className="pb-6 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Demographics</th>
                            <th className="pb-6 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Login Time</th>
                            <th className="pb-6 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Activity</th>
                            <th className="pb-6 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                            <th className="pb-6 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Activity</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {activePatients.filter(p => (p.firstName + ' ' + p.lastName).toLowerCase().includes(searchTerm.toLowerCase())).map((patient) => (
                            <tr key={patient.id} className="group hover:bg-slate-50/50 transition-colors">
                                <td className="py-6 px-4">
                                    <div className="w-12 h-12 rounded-2xl bg-primary-teal/5 flex items-center justify-center text-primary-teal font-black text-sm group-hover:bg-primary-teal group-hover:text-white transition-all">
                                        {patient.firstName.charAt(0)}
                                    </div>
                                </td>
                                <td className="py-6 px-4">
                                    <p className="text-xs font-black text-secondary-navy">{patient.firstName} {patient.lastName}</p>
                                    <p className="text-[10px] text-slate-400 font-bold">{patient.email}</p>
                                </td>
                                <td className="py-6 px-4">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{patient.age}</p>
                                    <p className="text-[9px] text-slate-400 font-bold uppercase">{patient.phone}</p>
                                </td>
                                <td className="py-6 px-4 text-xs font-bold text-slate-500">10:15 AM</td>
                                <td className="py-6 px-4 text-xs font-bold text-slate-400">2 mins ago</td>
                                <td className="py-6 px-4">
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 w-fit ${
                                        patient.status === 'ONLINE' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                                    }`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${patient.status === 'ONLINE' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
                                        {patient.status}
                                    </span>
                                </td>
                                <td className="py-6 px-4 text-right">
                                    <button className="p-3 bg-slate-50 text-slate-400 hover:text-primary-teal hover:bg-primary-teal/5 rounded-xl transition-all group">
                                        <Eye size={18} className="group-hover:scale-110 transition-transform" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Clinical Provider Leave & Availability Monitor */}
        <div className="card !rounded-[2.5rem] p-10 border-none shadow-xl shadow-slate-100 bg-white">
             <div className="flex justify-between items-center mb-10">
                <div>
                   <h3 className="text-2xl font-black text-secondary-navy">Physician Governance</h3>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Real-time Clinical Availability</p>
                </div>
                <button className="btn-primary !py-3 !px-6 !text-[10px]">Generate Leave Report</button>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { name: 'Dr. Arjun Sharma', spec: 'Cardiology', status: 'AVAILABLE', color: 'emerald' },
                    { name: 'Dr. Priya Nair', spec: 'Dermatology', status: 'ON_LEAVE', color: 'red' },
                    { name: 'Dr. Vikram Reddy', spec: 'Orthopedics', status: 'LIMITED', color: 'amber' }
                ].map((dr, i) => (
                    <div key={i} className="p-6 rounded-[2rem] border border-slate-50 bg-slate-50/30 flex items-center gap-4 hover:bg-white hover:shadow-xl transition-all group">
                        <div className={`w-14 h-14 rounded-2xl bg-${dr.color}-50 text-${dr.color}-600 flex items-center justify-center shrink-0`}>
                            <Stethoscope size={24} />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-black text-secondary-navy">{dr.name}</h4>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{dr.spec}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border border-${dr.color}-200 bg-${dr.color}-50 text-${dr.color}-600`}>
                            {dr.status.replace('_', ' ')}
                        </span>
                    </div>
                ))}
             </div>
        </div>

        {/* SOS Management Center */}
        <div className="card !rounded-[2.5rem] p-10 border-none bg-red-600 text-white relative overflow-hidden shadow-2xl shadow-red-200">
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="max-w-xl">
                    <div className="flex items-center gap-3 mb-4">
                         <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                            <AlertCircle size={24} />
                         </div>
                         <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Priority Emergency Broadcast</span>
                    </div>
                    <h3 className="text-4xl font-black mb-4">Clinical SOS Monitor</h3>
                    <p className="text-white/70 text-sm leading-relaxed font-bold">
                        Global emergency override system. Activating this protocol will notify all on-duty cardio surgeons and anesthesiologists across the primary block.
                    </p>
                </div>
                <div className="flex gap-4 shrink-0">
                    <button className="bg-white text-red-600 font-black px-10 py-5 rounded-2xl hover:scale-105 transition-all shadow-xl shadow-black/10 flex items-center gap-3">
                        DISPATCH AMBULANCE <ArrowUpRight size={20} />
                    </button>
                </div>
            </div>
            <Activity size={240} className="absolute -bottom-20 -right-20 text-white/10 rotate-12" />
        </div>

      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
