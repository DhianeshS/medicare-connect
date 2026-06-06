import React, { useState, useEffect } from 'react';
import { UserPlus, Search, Filter, MoreVertical, Edit, Trash2, Mail, Phone, Calendar, X } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import api from '../services/api';

const AdminDoctorManagement: React.FC = () => {
    const [doctors, setDoctors] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isOnboardModalOpen, setIsOnboardModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        specialization: 'Cardiology',
        qualification: '',
        experienceYears: '',
        consultationFee: '',
        clinicAddress: '',
        clinicPhone: '',
        availableWorkingHours: 'Mon-Fri: 09:00 - 17:00',
        availabilityStatus: 'AVAILABLE',
        bio: ''
    });

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.specialization || !formData.qualification || !formData.experienceYears || !formData.consultationFee) {
            setError('Please fill in all required fields.');
            return;
        }

        setLoading(true);
        try {
            const response = await api.post('/admin/doctors', {
                ...formData,
                experienceYears: parseInt(formData.experienceYears),
                consultationFee: parseFloat(formData.consultationFee)
            });

            setSuccess('Doctor onboarded successfully!');
            
            const createdDoctor = {
                ...response.data,
                id: response.data?.id || (doctors.length + 1),
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                specialization: formData.specialization,
                qualification: formData.qualification,
                experienceYears: parseInt(formData.experienceYears),
                consultationFee: parseFloat(formData.consultationFee),
                clinicAddress: formData.clinicAddress,
                clinicPhone: formData.clinicPhone,
                availableWorkingHours: formData.availableWorkingHours,
                availabilityStatus: formData.availabilityStatus,
                status: formData.availabilityStatus
            };
            setDoctors(prev => [createdDoctor, ...prev]);

            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                password: '',
                specialization: 'Cardiology',
                qualification: '',
                experienceYears: '',
                consultationFee: '',
                clinicAddress: '',
                clinicPhone: '',
                availableWorkingHours: 'Mon-Fri: 09:00 - 17:00',
                availabilityStatus: 'AVAILABLE',
                bio: ''
            });

            setTimeout(() => {
                setIsOnboardModalOpen(false);
                setSuccess(null);
            }, 1500);

        } catch (err: any) {
            console.error("Error onboarding doctor:", err);
            setError(err.response?.data?.message || 'Failed to onboard doctor. Please try again.');
        } finally {
            setLoading(false);
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
                        <button 
                            onClick={() => setIsOnboardModalOpen(true)}
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3.5 bg-primary-teal text-white font-black rounded-2xl shadow-xl shadow-primary-teal/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
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
                                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${(doctor.status === 'AVAILABLE' || doctor.availabilityStatus === 'AVAILABLE') ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                        {doctor.availabilityStatus || doctor.status || 'AVAILABLE'}
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

            {/* Onboard Doctor Modal */}
            {isOnboardModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-secondary-navy/40 backdrop-blur-md animate-fade-in">
                    <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl p-10 relative max-h-[90vh] overflow-y-auto">
                        <button onClick={() => setIsOnboardModalOpen(false)} className="absolute top-8 right-8 p-3 text-slate-300 hover:text-slate-600 rounded-2xl bg-slate-50 transition-all">
                            <X size={24} />
                        </button>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="bg-primary-teal p-4 rounded-3xl text-white">
                                <UserPlus size={32} />
                            </div>
                            <div>
                                <h3 className="text-3xl font-black text-secondary-navy">Onboard Doctor</h3>
                                <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">Medical Credential Registration Authority</p>
                            </div>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold border border-red-100 animate-shake">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="mb-6 p-4 bg-emerald-50 text-emerald-600 rounded-2xl text-xs font-bold border border-emerald-100">
                                {success}
                            </div>
                        )}

                        <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">First Name <span className="text-red-500">*</span></label>
                                <input type="text" name="firstName" required value={formData.firstName} onChange={handleInputChange} className="input-field py-4" placeholder="Dr. Arjun" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Last Name <span className="text-red-500">*</span></label>
                                <input type="text" name="lastName" required value={formData.lastName} onChange={handleInputChange} className="input-field py-4" placeholder="Sharma" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email <span className="text-red-500">*</span></label>
                                <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="input-field py-4" placeholder="arjun.sharma@medicare.com" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password <span className="text-red-500">*</span></label>
                                <input type="password" name="password" required value={formData.password} onChange={handleInputChange} className="input-field py-4" placeholder="••••••••" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Specialization <span className="text-red-500">*</span></label>
                                <select name="specialization" value={formData.specialization} onChange={handleInputChange} className="input-field py-4 bg-white">
                                    <option value="Cardiology">Cardiology</option>
                                    <option value="Dermatology">Dermatology</option>
                                    <option value="Neurology">Neurology</option>
                                    <option value="Pediatrics">Pediatrics</option>
                                    <option value="Orthopedics">Orthopedics</option>
                                    <option value="General Medicine">General Medicine</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Qualification <span className="text-red-500">*</span></label>
                                <input type="text" name="qualification" required value={formData.qualification} onChange={handleInputChange} className="input-field py-4" placeholder="MD, DM - Cardiology" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Experience (Years) <span className="text-red-500">*</span></label>
                                <input type="number" name="experienceYears" required value={formData.experienceYears} onChange={handleInputChange} className="input-field py-4" placeholder="12" min="0" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Consultation Fee (INR) <span className="text-red-500">*</span></label>
                                <input type="number" name="consultationFee" required value={formData.consultationFee} onChange={handleInputChange} className="input-field py-4" placeholder="800" min="0" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                                <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="input-field py-4" placeholder="+91 98765 00001" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Available Working Hours</label>
                                <input type="text" name="availableWorkingHours" value={formData.availableWorkingHours} onChange={handleInputChange} className="input-field py-4" placeholder="Mon-Fri: 09:00 - 15:00" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Clinic Phone</label>
                                <input type="text" name="clinicPhone" value={formData.clinicPhone} onChange={handleInputChange} className="input-field py-4" placeholder="+91 11 2345 6789" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Initial Availability Status</label>
                                <select name="availabilityStatus" value={formData.availabilityStatus} onChange={handleInputChange} className="input-field py-4 bg-white">
                                    <option value="AVAILABLE">Available</option>
                                    <option value="LIMITED">Limited</option>
                                    <option value="ABSENT">Absent</option>
                                    <option value="ON_LEAVE">On Leave</option>
                                </select>
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Clinic Address</label>
                                <input type="text" name="clinicAddress" value={formData.clinicAddress} onChange={handleInputChange} className="input-field py-4" placeholder="Block A, Apollo Hospital, New Delhi" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Biography / Professional Profile</label>
                                <textarea name="bio" value={formData.bio} onChange={handleInputChange} className="input-field min-h-[80px] py-4" placeholder="Write a short summary about the physician's backgrounds and clinical highlights..." />
                            </div>

                            <div className="flex gap-4 pt-6 border-t border-slate-100 md:col-span-2">
                                <button type="button" onClick={() => setIsOnboardModalOpen(false)} className="flex-1 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-black rounded-2xl transition-all uppercase tracking-widest text-xs">
                                    Cancel
                                </button>
                                <button type="submit" disabled={loading} className="flex-1 py-4 bg-primary-teal hover:bg-teal-600 text-white font-black rounded-2xl shadow-xl shadow-primary-teal/20 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                                    {loading ? (
                                        <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                                    ) : 'Onboard Doctor'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
};

export default AdminDoctorManagement;
