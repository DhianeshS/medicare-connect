import React, { useState, useEffect } from 'react';
import { UserPlus, Search, Filter, MoreVertical, Edit, Trash2, Mail, Phone, Calendar } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import api from '../services/api';

const AdminDoctorManagement: React.FC = () => {
    const [doctors, setDoctors] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await api.get('/doctors');
            setDoctors(response.data);
        } catch (error) {
            console.error("Error fetching doctors:", error);
        }
    };

    const filteredDoctors = doctors.filter(d => 
        (d.firstName + ' ' + d.lastName).toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.specialization.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <DashboardLayout title="Doctor Management">
            <div className="space-y-8">
                
                {/* Actions Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="relative w-full md:w-96 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-teal transition-colors" size={20} />
                        <input 
                            type="text" 
                            placeholder="Search by name or specialty..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input-field pl-12"
                        />
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-50 text-slate-600 font-black rounded-2xl border border-slate-100 hover:bg-slate-100 transition-all">
                            <Filter size={18} /> Filters
                        </button>
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3.5 bg-primary-teal text-white font-black rounded-2xl shadow-xl shadow-primary-teal/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                            <UserPlus size={18} /> Onboard Doctor
                        </button>
                    </div>
                </div>

                {/* Doctors List */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredDoctors.map(doctor => (
                        <div key={doctor.id} className="card !rounded-[2rem] p-8 border-none hover:shadow-2xl transition-all group relative overflow-hidden">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-20 h-20 rounded-[2rem] overflow-hidden border-4 border-slate-50 shadow-lg">
                                    <img className="w-full h-full object-cover" src={`https://ui-avatars.com/api/?name=${doctor.firstName}+${doctor.lastName}&background=00B69B&color=fff&bold=true`} alt="Doctor" />
                                </div>
                                <button className="p-2 text-slate-300 hover:text-primary-teal hover:bg-slate-50 rounded-xl transition-all">
                                    <MoreVertical size={20} />
                                </button>
                            </div>

                            <div className="mb-6">
                                <h4 className="text-xl font-black text-secondary-navy truncate">Dr. {doctor.firstName} {doctor.lastName}</h4>
                                <div className="mt-1 flex items-center gap-2">
                                    <span className="bg-primary-teal/10 text-primary-teal text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">{doctor.specialization}</span>
                                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${doctor.status === 'AVAILABLE' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                        {doctor.status}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-4 pt-6 border-t border-slate-50">
                                <div className="flex items-center gap-3 text-slate-500 font-bold text-sm">
                                    <Mail size={16} className="text-slate-300" /> {doctor.email || 'doctor@hospital.com'}
                                </div>
                                <div className="flex items-center gap-3 text-slate-500 font-bold text-sm">
                                    <Phone size={16} className="text-slate-300" /> {doctor.phone || '+91 98765 43210'}
                                </div>
                                <div className="flex items-center gap-3 text-slate-500 font-bold text-sm">
                                    <Calendar size={16} className="text-slate-300" /> Consulted 1.2k+ Patients
                                </div>
                            </div>

                            <div className="mt-8 flex gap-3">
                                <button className="flex-1 py-3 bg-slate-50 hover:bg-primary-teal/10 text-slate-600 hover:text-primary-teal font-black text-xs rounded-xl transition-all flex items-center justify-center gap-2">
                                    <Edit size={14} /> Edit Profile
                                </button>
                                <button className="p-3 bg-red-50 hover:bg-red-600 text-red-500 hover:text-white rounded-xl transition-all shadow-sm">
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </DashboardLayout>
    );
};

export default AdminDoctorManagement;
