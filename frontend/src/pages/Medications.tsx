import React, { useState } from 'react';
import { 
  Pill, 
  Plus, 
  Clock, 
  ChevronRight, 
  Calendar
} from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';

const Medications: React.FC = () => {
  const [activeMeds, setActiveMeds] = useState([
    { id: 1, name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', time: '08:00 AM', status: 'Active', refills: 2, iconColor: 'blue' },
    { id: 2, name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', time: '09:00 AM, 09:00 PM', status: 'Active', refills: 1, iconColor: 'green' },
    { id: 3, name: 'Atorvastatin', dosage: '20mg', frequency: 'Every night', time: '10:00 PM', status: 'Active', refills: 5, iconColor: 'purple' },
  ]);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [newMedName, setNewMedName] = useState('');
  const [newMedTime, setNewMedTime] = useState('08:00 AM');

  const handleRefill = (medName: string) => {
    alert(`Securely dispatching refill request for ${medName} to your primary pharmacy network. Expect a confirmation SMS within 15 minutes.`);
  };

  const handleAddReminder = () => {
    if (!newMedName) return;
    const newMed = {
      id: Date.now(),
      name: newMedName,
      dosage: 'As prescribed',
      frequency: 'Daily',
      time: newMedTime,
      status: 'Active',
      refills: 3,
      iconColor: 'amber' as any
    };
    setActiveMeds([...activeMeds, newMed]);
    setIsReminderModalOpen(false);
    setNewMedName('');
    alert('Medication reminder synchronized successfully across all connected devices.');
  };

  const handleMarkTaken = (id: number) => {
    alert(`Entry logged in digital health journal for medication ID: ${id}. Biometric tracking updated.`);
  };

  return (
    <DashboardLayout title="Medication Authority">
      <div className="space-y-10">
        
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl font-black text-secondary-navy tracking-tight">Clinical Rx Management</h2>
            <p className="text-sm text-slate-500 font-bold mt-2">Track daily dosages, synchronize reminders, and request digital pharmacy refills.</p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <button 
                onClick={() => handleRefill('All Active Medications')}
                className="flex-1 md:flex-none py-4 px-8 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 border-slate-100 text-slate-400 hover:border-primary-teal hover:text-primary-teal transition-all"
            >
                Refill Queue
            </button>
            <button 
                onClick={() => setIsReminderModalOpen(true)}
                className="flex-1 md:flex-none btn-primary !py-4 px-8 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary-teal/20 flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all"
            >
              <Plus size={20} /> Add Medication
            </button>
          </div>
        </div>

        {/* Medication Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {activeMeds.map((med) => (
            <div key={med.id} className="card !rounded-[2.5rem] p-8 group hover:shadow-2xl transition-all border-none bg-white shadow-xl shadow-slate-100 flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-primary-teal/20"></div>
              
              <div className="w-20 h-20 rounded-[2rem] bg-slate-50 text-primary-teal flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner border border-slate-100">
                <Pill size={36} />
              </div>

              <h3 className="text-2xl font-black text-secondary-navy group-hover:text-primary-teal transition-colors tracking-tight">{med.name}</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2 mb-8">{med.dosage} • {med.frequency}</p>

              <div className="w-full space-y-3 mb-8">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 border border-slate-50">
                   <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Next Intake</span>
                   <span className="text-xs font-black text-secondary-navy">{med.time.split(',')[0]}</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 border border-slate-50">
                   <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Refills Pending</span>
                   <span className={`text-xs font-black ${med.refills < 2 ? 'text-emergency' : 'text-primary-teal'}`}>{med.refills} Units</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 w-full">
                <button 
                   onClick={() => handleMarkTaken(med.id)}
                   className="py-4 rounded-2xl bg-primary-teal text-white text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-primary-teal/20 hover:scale-105 active:scale-95 transition-all"
                >
                  Confirm
                </button>
                <button 
                   onClick={() => handleRefill(med.name)}
                   className="py-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-widest hover:border-primary-teal hover:text-primary-teal transition-all"
                >
                  Refill
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Reminder Modal */}
        {isReminderModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-secondary-navy/40 backdrop-blur-md animate-fade-in">
                <div className="bg-white w-full max-w-md rounded-[3rem] shadow-2xl p-10 relative overflow-hidden">
                    <button onClick={() => setIsReminderModalOpen(false)} className="absolute top-8 right-8 p-3 text-slate-300 hover:text-slate-600 rounded-2xl bg-slate-50 transition-all">
                        <Plus className="rotate-45" size={24} />
                    </button>
                    <div className="mb-10 text-center">
                        <div className="bg-primary-teal/10 w-20 h-20 rounded-[2.5rem] flex items-center justify-center text-primary-teal mx-auto mb-6">
                            <Clock size={36} />
                        </div>
                        <h3 className="text-2xl font-black text-secondary-navy leading-none">Global Reminder</h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Clinical intake synchronization</p>
                    </div>
                    <div className="space-y-6">
                        <div className="space-y-2">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Medication Identity</label>
                             <input 
                                type="text" 
                                placeholder="e.g. Amlodipine" 
                                value={newMedName}
                                onChange={(e) => setNewMedName(e.target.value)}
                                className="input-field py-4" 
                             />
                        </div>
                        <div className="space-y-2">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Intake Schedule (Time)</label>
                             <input 
                                type="text" 
                                placeholder="09:30 AM" 
                                value={newMedTime}
                                onChange={(e) => setNewMedTime(e.target.value)}
                                className="input-field py-4" 
                             />
                        </div>
                        <button 
                            onClick={handleAddReminder}
                            className="btn-primary w-full !py-5 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-primary-teal/20 hover:scale-102 active:scale-98 transition-all"
                        >
                            Activate Reminder
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* Bottom Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
          <div className="card p-8 flex gap-6 items-start">
            <div className="bg-blue-50 p-3 rounded-2xl text-primary-blue">
              <Calendar size={24} />
            </div>
            <div>
              <h4 className="font-bold text-secondary-navy mb-2">Refill History</h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                View your previous refill requests and pharmacy pickup statuses.
              </p>
              <button className="text-primary-blue font-bold text-xs flex items-center gap-1 hover:gap-2 transition-all">
                View History <ChevronRight size={14} />
              </button>
            </div>
          </div>
          <div className="card p-8 bg-secondary-navy text-white flex gap-6 items-start">
            <div className="bg-white/10 p-3 rounded-2xl text-white">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-bold mb-2">Pharmacy Integration</h4>
              <p className="text-xs text-blue-100 leading-relaxed">
                MediCare Connect is linked with major pharmacies. Your prescriptions are sent automatically to your preferred location.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const ShieldCheck = ({ size }: { size: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>;

export default Medications;
