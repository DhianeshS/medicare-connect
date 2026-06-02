import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  FilePlus, 
  CheckCircle, 
  Search, 
  Users,
  Stethoscope,
  Clipboard,
  History,
  FileText,
  Video,
  X,
  Plus
} from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';

const DoctorDashboard: React.FC = () => {
    const { user } = useAuth();
    const [notifications] = useState([
        { id: 1, type: 'BOOKING', message: 'New appointment: Ramesh Kumar', time: '5m ago' },
        { id: 2, type: 'REPORT', message: 'Report uploaded: Lakshmi Devi', time: '15m ago' }
    ]);

    const [appointments, setAppointments] = useState([
        { id: 1, name: 'Ramesh Kumar', time: '10:30 AM', problem: 'Fever & Chills', status: 'In Waiting', color: 'emerald', symptoms: 'High temp, headache', diagnosis: 'Suspected Viral' },
        { id: 2, name: 'Lakshmi Devi', time: '11:00 AM', problem: 'Migraine', status: 'Scheduled', color: 'blue', symptoms: 'Severe head pain', diagnosis: 'Migraine' },
        { id: 3, name: 'Suresh Raj', time: '11:30 AM', problem: 'Diabetes Check', status: 'Emergency', color: 'red', symptoms: 'Fatigue, thirst', diagnosis: 'Type 2 Diabetes' }
    ]);

    const [selectedAppt, setSelectedAppt] = useState<any>(null);
    const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
    const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
    const [isAvailabilityModalOpen, setIsAvailabilityModalOpen] = useState(false);
    const [doctorStatus, setDoctorStatus] = useState('AVAILABLE');
    const [isAllset, setIsAllset] = useState(false);

    const handleStatusUpdate = async (newStatus: string) => {
        setDoctorStatus(newStatus);
        if (user?.id) {
            try {
                // In demo, we just update local state, but here is the API hook
                // await doctorService.updateDoctor(user.id, { availabilityStatus: newStatus });
            } catch (error) {
                console.error("Failed to update status:", error);
            }
        }
        setIsAvailabilityModalOpen(false);
    };

    useEffect(() => {
        // Show welcome alert for doctor bypass
        setIsAllset(true);
        const timer = setTimeout(() => setIsAllset(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    const handleUpdateConsultation = (e: React.FormEvent) => {
        e.preventDefault();
        const updated = appointments.map(a => a.id === selectedAppt.id ? selectedAppt : a);
        setAppointments(updated);
        setIsConsultModalOpen(false);
    };

  return (
    <DashboardLayout title="Physician Central Command">
      
      {/* Welcome Alert */}
      {isAllset && (
        <div className="fixed top-24 right-10 z-[100] animate-bounce-in">
            <div className="bg-primary-teal text-white p-6 rounded-[2rem] shadow-2xl flex items-center gap-4 border border-white/20 backdrop-blur-md">
                <div className="bg-white/20 p-3 rounded-2xl">
                    <CheckCircle size={24} />
                </div>
                <div>
                   <h4 className="font-black text-sm tracking-tight">Clinical Access Granted</h4>
                   <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest mt-0.5">Welcome back, Dr. {user?.lastName}</p>
                </div>
                <button onClick={() => setIsAllset(false)} className="ml-4 opacity-50 hover:opacity-100 transition-opacity">
                    <X size={18} />
                </button>
            </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Physician Profile Quick Look */}
        <div className="lg:col-span-1 space-y-6">
            <div className="card !rounded-[2rem] p-8 border-none shadow-xl shadow-slate-100 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-24 bg-primary-teal/10"></div>
                <div className="relative z-10">
                    <div className="w-24 h-24 rounded-[2.5rem] border-4 border-white shadow-xl mx-auto mb-4 overflow-hidden bg-white">
                        <img className="w-full h-full object-cover" src={`https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=00B69B&color=fff&bold=true`} alt="Doctor" />
                    </div>
                    <h3 className="text-xl font-black text-secondary-navy">Dr. {user?.firstName} {user?.lastName}</h3>
                    <p className="text-[10px] font-black text-primary-teal uppercase tracking-widest mt-1">Senior Cardiologist • MD, DM</p>
                    
                    <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-50">
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Experience</p>
                            <p className="text-lg font-black text-secondary-navy">12 Yrs</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Consultations</p>
                            <p className="text-lg font-black text-secondary-navy">4.8k+</p>
                        </div>
                    </div>

                    <button onClick={() => setIsAvailabilityModalOpen(true)} className="btn-primary w-full mt-8 !py-4">Update Availability</button>
                    <button className="w-full mt-3 py-4 text-xs font-black text-slate-400 hover:text-primary-teal transition-all uppercase tracking-widest">Edit Clinical Profile</button>
                </div>
            </div>

            {/* Notification Center */}
            <div className="card !rounded-[2rem] p-8 border-none shadow-xl shadow-slate-100">
                <div className="flex justify-between items-center mb-6">
                    <h4 className="text-sm font-black text-secondary-navy uppercase tracking-widest">Notifications</h4>
                    <span className="bg-red-50 text-red-600 w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-black">2</span>
                </div>
                <div className="space-y-4">
                    {notifications.map(n => (
                        <div key={n.id} className="p-4 bg-slate-50 rounded-2xl flex gap-3 items-start group hover:bg-primary-teal/5 transition-all cursor-pointer">
                            <div className="bg-white p-2 rounded-xl text-primary-teal shadow-sm group-hover:bg-primary-teal group-hover:text-white transition-all">
                                {n.type === 'BOOKING' ? <Calendar size={14} /> : <FileText size={14} />}
                            </div>
                            <div className="flex-1">
                                <p className="text-xs font-bold text-secondary-navy leading-tight">{n.message}</p>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">{n.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="lg:col-span-3 space-y-8">
            
            {/* Clinical Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Active Patients', value: '1,280', icon: <Users size={20} />, color: 'teal' },
                    { label: 'Today Appts', value: '14', icon: <Calendar size={20} />, color: 'blue' },
                    { label: 'Telemedicine', value: '05', icon: <Video size={20} />, color: 'indigo' },
                    { label: 'Pending Reports', value: '23', icon: <FileText size={20} />, color: 'amber' }
                ].map((stat, i) => (
                    <div key={i} className="card !rounded-[1.5rem] p-6 border-none shadow-xl shadow-slate-100 group hover:bg-primary-teal transition-all hover:-translate-y-1">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-2xl bg-slate-50 group-hover:bg-white/20 transition-all text-primary-teal group-hover:text-white`}>
                                {stat.icon}
                            </div>
                            <span className="text-[10px] font-black text-emerald-500 group-hover:text-white transition-all">↑ 12%</span>
                        </div>
                        <h3 className="text-2xl font-black text-secondary-navy group-hover:text-white transition-all">{stat.value}</h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 group-hover:text-white/60 transition-all">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Quick Actions Panel */}
            <div className="card !rounded-[2rem] p-8 border-none shadow-xl shadow-secondary-navy/5 bg-secondary-navy">
                <h4 className="text-xs font-black text-white/50 uppercase tracking-[0.2em] mb-6">Clinical Quick Actions</h4>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                    {[
                        { label: 'View Today', icon: <Calendar size={22} />, action: () => {} },
                        { label: 'Create Rx', icon: <FilePlus size={22} />, action: () => setIsPrescriptionModalOpen(true) },
                        { label: 'Patient History', icon: <History size={22} />, action: () => {} },
                        { label: 'Availability', icon: <Clock size={22} />, action: () => {} },
                        { label: 'Upload Report', icon: <Clipboard size={22} />, action: () => {} },
                        { label: 'Consult Video', icon: <Video size={22} />, action: () => {} }
                    ].map((btn, i) => (
                        <button key={i} onClick={btn.action} className="flex flex-col items-center gap-3 p-4 bg-white/5 hover:bg-primary-teal rounded-2xl transition-all group">
                            <div className="text-white group-hover:scale-110 transition-transform">{btn.icon}</div>
                            <span className="text-[9px] font-black text-white/70 uppercase tracking-widest text-center group-hover:text-white">{btn.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Appointment Queue */}
            <div className="card !rounded-[2.5rem] p-10 border-none shadow-xl shadow-slate-100">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-black text-secondary-navy">Appointment Queue</h3>
                    <div className="flex gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input type="text" placeholder="Search patient..." className="input-field pl-10 py-2.5 !rounded-xl !text-xs w-64" />
                        </div>
                    </div>
                </div>
                
                <div className="space-y-4">
                    {appointments.map((appt, i) => (
                        <div key={i} className="flex items-center gap-6 p-6 rounded-[2rem] border border-slate-50 hover:bg-slate-50 transition-all group">
                            <div className="w-16 h-16 rounded-2xl bg-white shadow-lg overflow-hidden flex items-center justify-center font-black text-xl text-primary-teal border border-slate-100">
                                {appt.name.charAt(0)}
                            </div>
                            <div className="flex-1">
                                <h4 className="text-lg font-black text-secondary-navy group-hover:text-primary-teal transition-all">Mr. {appt.name}</h4>
                                <div className="flex items-center gap-4 mt-1">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{appt.problem} • Clinical Record #MC-0{i+1}</p>
                                    <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest bg-${appt.color}-50 text-${appt.color}-600`}>{appt.status}</span>
                                </div>
                                <p className="text-[9px] text-slate-400 font-bold mt-2 truncate max-w-xs italic">Dx: {appt.diagnosis}</p>
                            </div>
                            <div className="text-center px-10 border-x border-slate-100">
                                <Clock size={20} className="mx-auto text-primary-teal mb-2" />
                                <p className="text-sm font-black text-secondary-navy">{appt.time}</p>
                            </div>
                            <div className="flex gap-3">
                                <button 
                                    onClick={() => { setSelectedAppt(appt); setIsConsultModalOpen(true); }}
                                    className="btn-primary !py-3 !px-6 !text-[10px] flex items-center gap-2"
                                >
                                    <Stethoscope size={14} /> Edit Diagnoses
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
      </div>

      {/* Consultation Edit Modal */}
      {isConsultModalOpen && selectedAppt && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-secondary-navy/40 backdrop-blur-md animate-fade-in">
            <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl p-10 relative">
                <button onClick={() => setIsConsultModalOpen(false)} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 rounded-xl transition-all">
                    <X size={24} />
                </button>
                <div className="mb-8">
                    <h3 className="text-2xl font-black text-secondary-navy">Consultation Detail</h3>
                    <p className="text-sm text-slate-500 font-bold">Patient: Mr. {selectedAppt.name}</p>
                </div>
                <form onSubmit={handleUpdateConsultation} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Symptoms Identified</label>
                        <textarea 
                            value={selectedAppt.symptoms} 
                            onChange={(e) => setSelectedAppt({...selectedAppt, symptoms: e.target.value})}
                            className="input-field min-h-[100px] py-4"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Clinical Diagnosis (Disease)</label>
                        <input 
                            type="text"
                            value={selectedAppt.diagnosis} 
                            onChange={(e) => setSelectedAppt({...selectedAppt, diagnosis: e.target.value})}
                            className="input-field py-4"
                        />
                    </div>
                    <button type="submit" className="btn-primary w-full py-5">Update Clinical Record</button>
                </form>
            </div>
        </div>
      )}

      {/* Prescription Manager Modal */}
      {isPrescriptionModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-secondary-navy/40 backdrop-blur-md animate-fade-in">
            <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl p-12 relative overflow-hidden">
                <button onClick={() => setIsPrescriptionModalOpen(false)} className="absolute top-8 right-8 p-3 text-slate-300 hover:text-slate-600 rounded-2xl bg-slate-50 transition-all">
                    <X size={24} />
                </button>
                <div className="flex items-center gap-4 mb-10">
                    <div className="bg-primary-teal p-4 rounded-3xl text-white">
                        <FilePlus size={32} />
                    </div>
                    <div>
                        <h3 className="text-3xl font-black text-secondary-navy">Prescription Manager</h3>
                        <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">Digital Healthcare Authority</p>
                    </div>
                </div>
                <div className="space-y-8">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Patient Search</label>
                            <input type="text" placeholder="Search patient ID..." className="input-field py-4" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Medication Name</label>
                            <input type="text" placeholder="e.g. Paracetamol" className="input-field py-4" />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Dosage</label>
                            <input type="text" placeholder="500mg" className="input-field py-3" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Frequency</label>
                            <input type="text" placeholder="1-0-1" className="input-field py-3" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Duration</label>
                            <input type="text" placeholder="5 Days" className="input-field py-3" />
                        </div>
                    </div>
                    <button className="btn-primary w-full py-5 flex items-center justify-center gap-3">
                        <Plus size={20} /> Add Medication to Rx
                    </button>
                    <div className="pt-8 border-t border-slate-100 flex justify-between items-center">
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest italic">Electronic Signature: Dr. {user?.lastName} Signed</p>
                        <button className="bg-secondary-navy text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest">Finalize & Dispatch</button>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Availability Status Modal */}
      {isAvailabilityModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-secondary-navy/40 backdrop-blur-md animate-fade-in">
            <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-10 relative">
                <button onClick={() => setIsAvailabilityModalOpen(false)} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 rounded-xl transition-all">
                    <X size={24} />
                </button>
                <div className="text-center mb-8">
                    <div className="bg-primary-teal/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary-teal">
                        <Clock size={32} />
                    </div>
                    <h3 className="text-2xl font-black text-secondary-navy">Current Availability</h3>
                    <p className="text-sm text-slate-500 font-bold">Update your status for the clinical directory</p>
                </div>
                <div className="space-y-3">
                    {['AVAILABLE', 'LIMITED', 'ON_LEAVE', 'EMERGENCY_ONLY'].map(status => (
                        <button 
                            key={status}
                            onClick={() => handleStatusUpdate(status)}
                            className={`w-full p-5 rounded-2xl text-left font-black text-xs uppercase tracking-widest transition-all flex items-center justify-between ${
                                doctorStatus === status 
                                ? 'bg-primary-teal text-white shadow-lg shadow-primary-teal/20' 
                                : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                            }`}
                        >
                            {status.replace('_', ' ')}
                            {doctorStatus === status && <CheckCircle size={18} />}
                        </button>
                    ))}
                </div>
            </div>
        </div>
      )}

    </DashboardLayout>
  );
};

export default DoctorDashboard;
