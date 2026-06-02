import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle, XCircle, Search, HelpCircle } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';

interface AppointmentSlot {
  id: number;
  time: string;
  patientName: string;
  problem: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  date: string;
}

const DoctorSchedule: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [appointments, setAppointments] = useState<AppointmentSlot[]>([
    { id: 1, time: '09:00 AM', patientName: 'Anita Sharma', problem: 'General Anxiety follow-up', status: 'CONFIRMED', date: '2026-06-02' },
    { id: 2, time: '10:30 AM', patientName: 'Ramesh Kumar', problem: 'High Fever & chills', status: 'PENDING', date: '2026-06-02' },
    { id: 3, time: '11:00 AM', patientName: 'Lakshmi Devi', problem: 'Severe Chronic Migraine', status: 'CONFIRMED', date: '2026-06-02' },
    { id: 4, time: '11:30 AM', patientName: 'Suresh Raj', problem: 'Routine Diabetes checkup', status: 'PENDING', date: '2026-06-02' },
    { id: 5, time: '02:00 PM', patientName: 'Vikram Singh', problem: 'Hypertension evaluation', status: 'CANCELLED', date: '2026-06-02' }
  ]);

  const handleUpdateStatus = (id: number, newStatus: 'CONFIRMED' | 'CANCELLED') => {
    const updated = appointments.map(appt => 
      appt.id === id ? { ...appt, status: newStatus } : appt
    );
    setAppointments(updated);
    alert(`Appointment status updated to ${newStatus} successfully.`);
  };

  const filteredAppts = appointments.filter(a => 
    a.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.problem.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: appointments.length,
    pending: appointments.filter(a => a.status === 'PENDING').length,
    confirmed: appointments.filter(a => a.status === 'CONFIRMED').length,
  };

  return (
    <DashboardLayout title="Booking Schedule Manager">
      <div className="space-y-8 animate-fade-in">
        
        {/* Roster Overview Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card !p-8 border-none bg-slate-900 text-white !rounded-[2rem] shadow-xl shadow-slate-900/10">
            <p className="text-white/70 text-xs font-black uppercase tracking-widest mb-1">Today's Roster</p>
            <h3 className="text-4xl font-black">{stats.total} Total Slots</h3>
            <div className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase text-slate-400">
              <Calendar size={14} /> Daily Slot Telemetry
            </div>
          </div>
          <div className="card !p-8 border-none bg-primary-teal text-white !rounded-[2rem] shadow-xl shadow-primary-teal/10">
            <p className="text-white/70 text-xs font-black uppercase tracking-widest mb-1">Confirmed Consultations</p>
            <h3 className="text-4xl font-black">{stats.confirmed} Booked</h3>
            <div className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase">
              <CheckCircle size={14} /> Operations Synchronized
            </div>
          </div>
          <div className="card !p-8 border-none bg-white shadow-xl shadow-slate-100/50 !rounded-[2rem]">
            <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Action Required</p>
            <h3 className="text-4xl font-black text-warning">{stats.pending} Pending</h3>
            <div className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase text-warning">
               Slots Requiring Confirmation
            </div>
          </div>
        </div>

        {/* Schedule Table Card */}
        <div className="card !rounded-[2.5rem] p-10 border-none shadow-xl shadow-slate-100 bg-white">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
            <div>
              <h3 className="text-2xl font-black text-secondary-navy">Active Booking Queue</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Real-time Physician Roster</p>
            </div>
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-teal transition-all" size={18} />
              <input 
                type="text" 
                placeholder="Search patient or symptom..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-12 py-3 !rounded-xl !text-xs bg-slate-50 border-none"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredAppts.map((appt) => (
              <div key={appt.id} className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-[2rem] border border-slate-50 hover:bg-slate-50 transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-lg overflow-hidden flex items-center justify-center font-black text-xl text-primary-teal border border-slate-100 shrink-0">
                  {appt.patientName.charAt(0)}
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h4 className="text-lg font-black text-secondary-navy group-hover:text-primary-teal transition-colors">
                    Mr./Ms. {appt.patientName}
                  </h4>
                  <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mt-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {appt.problem} • Date: {appt.date}
                    </p>
                    <span className={`text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
                      appt.status === 'CONFIRMED' ? 'bg-emerald-50 text-emerald-600' :
                      appt.status === 'CANCELLED' ? 'bg-red-50 text-red-600' :
                      'bg-amber-50 text-amber-600 animate-pulse'
                    }`}>
                      {appt.status}
                    </span>
                  </div>
                </div>

                <div className="text-center px-10 border-y md:border-y-0 md:border-x border-slate-100 py-4 md:py-0">
                  <Clock size={20} className="mx-auto text-primary-teal mb-2" />
                  <p className="text-sm font-black text-secondary-navy whitespace-nowrap">{appt.time}</p>
                </div>

                <div className="flex gap-2">
                  {appt.status === 'PENDING' && (
                    <>
                      <button 
                        onClick={() => handleUpdateStatus(appt.id, 'CONFIRMED')}
                        className="py-3 px-5 bg-emerald-50 hover:bg-emerald-600 text-emerald-600 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm flex items-center gap-1.5"
                      >
                        <CheckCircle size={14} /> Confirm
                      </button>
                      <button 
                        onClick={() => handleUpdateStatus(appt.id, 'CANCELLED')}
                        className="py-3 px-5 bg-red-50 hover:bg-red-600 text-red-500 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm flex items-center gap-1.5"
                      >
                        <XCircle size={14} /> Reject
                      </button>
                    </>
                  )}
                  {appt.status === 'CONFIRMED' && (
                    <button 
                      onClick={() => handleUpdateStatus(appt.id, 'CANCELLED')}
                      className="py-3 px-5 bg-red-50 hover:bg-red-600 text-red-500 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm flex items-center gap-1.5"
                    >
                      <XCircle size={14} /> Cancel Slot
                    </button>
                  )}
                  {appt.status === 'CANCELLED' && (
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic py-3 px-5 flex items-center gap-1">
                      <HelpCircle size={14} /> Cancelled Slot
                    </span>
                  )}
                </div>
              </div>
            ))}
            {filteredAppts.length === 0 && (
              <div className="text-center py-10 font-bold text-slate-400">No scheduled slots matched your search criteria.</div>
            )}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default DoctorSchedule;
