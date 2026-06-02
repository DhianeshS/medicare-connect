import React, { useState } from 'react';
import { Search, FileText, Video, Users } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { useNavigate } from 'react-router-dom';

interface Patient {
  id: number;
  name: string;
  age: string;
  gender: string;
  bloodGroup: string;
  lastVisit: string;
  diagnosis: string;
  status: 'ONLINE' | 'OFFLINE' | 'CRITICAL';
}

const DoctorPatients: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  const [patients] = useState<Patient[]>([
    { id: 101, name: 'Ramesh Kumar', age: '45 Yrs', gender: 'Male', bloodGroup: 'O+', lastVisit: '2026-06-01', diagnosis: 'Suspected Viral Fever', status: 'ONLINE' },
    { id: 102, name: 'Lakshmi Devi', age: '32 Yrs', gender: 'Female', bloodGroup: 'A-', lastVisit: '2026-05-28', diagnosis: 'Chronic Migraine', status: 'ONLINE' },
    { id: 103, name: 'Suresh Raj', age: '58 Yrs', gender: 'Male', bloodGroup: 'B+', lastVisit: '2026-05-25', diagnosis: 'Type 2 Diabetes', status: 'CRITICAL' },
    { id: 104, name: 'Anita Sharma', age: '29 Yrs', gender: 'Female', bloodGroup: 'AB+', lastVisit: '2026-05-18', diagnosis: 'General Anxiety', status: 'OFFLINE' },
    { id: 105, name: 'Vikram Singh', age: '52 Yrs', gender: 'Male', bloodGroup: 'O-', lastVisit: '2026-05-10', diagnosis: 'Hypertension', status: 'OFFLINE' }
  ]);

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.diagnosis.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout title="My Patients Registry">
      <div className="space-y-8 animate-fade-in">
        
        {/* Roster Overview Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card !p-8 border-none bg-primary-teal text-white !rounded-[2rem] shadow-xl shadow-primary-teal/10">
            <p className="text-white/70 text-xs font-black uppercase tracking-widest mb-1">Total Active Roster</p>
            <h3 className="text-4xl font-black">{patients.length} Patients</h3>
            <div className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase">
              <Users size={14} /> Comprehensive EHR Registry
            </div>
          </div>
          <div className="card !p-8 border-none bg-secondary-navy text-white !rounded-[2rem] shadow-xl shadow-secondary-navy/10">
            <p className="text-white/70 text-xs font-black uppercase tracking-widest mb-1">Active Telemetry</p>
            <h3 className="text-4xl font-black">2 Online</h3>
            <div className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Streaming Patient Signals
            </div>
          </div>
          <div className="card !p-8 border-none bg-white shadow-xl shadow-slate-100/50 !rounded-[2rem]">
            <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Attention Required</p>
            <h3 className="text-4xl font-black text-emergency">1 Critical</h3>
            <div className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase text-emergency">
              High Risk Overrides Enabled
            </div>
          </div>
        </div>

        {/* Patients Table Card */}
        <div className="card !rounded-[2.5rem] p-10 border-none shadow-xl shadow-slate-100 bg-white">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
            <div>
              <h3 className="text-2xl font-black text-secondary-navy">Roster Registry</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Physician EHR Control Console</p>
            </div>
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-teal transition-all" size={18} />
              <input 
                type="text" 
                placeholder="Search patient by name or diagnosis..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-12 py-3 !rounded-xl !text-xs bg-slate-50 border-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-6 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center w-20">Avatar</th>
                  <th className="pb-6 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Patient Details</th>
                  <th className="pb-6 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Diagnostics (Notes)</th>
                  <th className="pb-6 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Blood</th>
                  <th className="pb-6 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Checkup</th>
                  <th className="pb-6 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="pb-6 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Clinical Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredPatients.map(patient => (
                  <tr key={patient.id} className="group hover:bg-slate-50/30 transition-colors">
                    <td className="py-6 px-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary-teal/5 flex items-center justify-center text-primary-teal font-black text-sm group-hover:bg-primary-teal group-hover:text-white transition-all">
                        {patient.name.charAt(0)}
                      </div>
                    </td>
                    <td className="py-6 px-4">
                      <p className="text-xs font-black text-secondary-navy">{patient.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{patient.age} • {patient.gender}</p>
                    </td>
                    <td className="py-6 px-4">
                      <span className="bg-primary-teal/5 text-primary-teal text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-primary-teal/10">
                        {patient.diagnosis}
                      </span>
                    </td>
                    <td className="py-6 px-4 text-center">
                      <span className="text-xs font-black text-secondary-navy bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">{patient.bloodGroup}</span>
                    </td>
                    <td className="py-6 px-4 text-xs font-bold text-slate-500">{patient.lastVisit}</td>
                    <td className="py-6 px-4">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 w-fit ${
                        patient.status === 'ONLINE' ? 'bg-emerald-50 text-emerald-600' :
                        patient.status === 'CRITICAL' ? 'bg-red-50 text-red-600 animate-pulse' :
                        'bg-slate-100 text-slate-400'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          patient.status === 'ONLINE' ? 'bg-emerald-500 animate-pulse' :
                          patient.status === 'CRITICAL' ? 'bg-red-500 animate-ping' :
                          'bg-slate-400'
                        }`}></span>
                        {patient.status}
                      </span>
                    </td>
                    <td className="py-6 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => navigate('/dashboard/consult')}
                          className="p-3 bg-slate-50 text-slate-400 hover:text-white hover:bg-primary-teal rounded-xl transition-all shadow-sm"
                          title="Launch Consultation"
                        >
                          <Video size={16} />
                        </button>
                        <button 
                          onClick={() => navigate('/dashboard/prescriptions')}
                          className="p-3 bg-slate-50 text-slate-400 hover:text-white hover:bg-secondary-navy rounded-xl transition-all shadow-sm"
                          title="Prescription Manager"
                        >
                          <FileText size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default DoctorPatients;
