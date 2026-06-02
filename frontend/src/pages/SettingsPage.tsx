import React, { useState, useEffect } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Save, 
  Smartphone, 
  History,
  ShieldCheck,
  FileLock,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { doctorService } from '../services/api';

const SettingsPage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  // Stateful toggles for Settings
  const [analyticsSharing, setAnalyticsSharing] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [pushAlerts, setPushAlerts] = useState(true);

  // Profile form states
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [specialization, setSpecialization] = useState('Cardiology');
  const [qualification, setQualification] = useState('MD, DM');
  const [clinicAddress, setClinicAddress] = useState('H-12, Green Park, Delhi');
  const [clinicPhone, setClinicPhone] = useState('+91 98765 43210');
  const [availableWorkingHours, setAvailableWorkingHours] = useState('Daily: 09:00 - 15:00');
  const [consultationFee, setConsultationFee] = useState(800);
  const [experienceYears, setExperienceYears] = useState(12);

  // Status Alerts
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isDoctor = user?.role === 'ROLE_DOCTOR';

  // Load profile on mount
  useEffect(() => {
    if (!user) return;
    
    // Load local storage values if available (instant responsiveness & offline support)
    const localProfile = localStorage.getItem(`doctor_profile_${user.id}`);
    if (localProfile) {
      try {
        const parsed = JSON.parse(localProfile);
        if (parsed.specialization) setSpecialization(parsed.specialization);
        if (parsed.qualification) setQualification(parsed.qualification);
        if (parsed.clinicAddress) setClinicAddress(parsed.clinicAddress);
        if (parsed.clinicPhone) setClinicPhone(parsed.clinicPhone);
        if (parsed.availableWorkingHours) setAvailableWorkingHours(parsed.availableWorkingHours);
        if (parsed.consultationFee) setConsultationFee(Number(parsed.consultationFee));
        if (parsed.experienceYears) setExperienceYears(Number(parsed.experienceYears));
      } catch (e) {
        console.error("Error parsing local profile", e);
      }
    }

    if (user.role === 'ROLE_DOCTOR') {
      const fetchDoctorProfile = async () => {
        try {
          setIsLoading(true);
          const response = await doctorService.getDoctor(user.id);
          const data = response.data;
          if (data) {
            setFirstName(data.firstName || user.firstName);
            setLastName(data.lastName || user.lastName);
            setSpecialization(data.specialization || 'Cardiology');
            setQualification(data.qualification || 'MD, DM');
            setClinicAddress(data.clinicAddress || 'H-12, Green Park, Delhi');
            setClinicPhone(data.clinicPhone || '+91 98765 43210');
            setAvailableWorkingHours(data.availableWorkingHours || 'Daily: 09:00 - 15:00');
            setConsultationFee(data.consultationFee || 800);
            setExperienceYears(data.experienceYears || 12);
            
            // Sync to local storage
            localStorage.setItem(`doctor_profile_${user.id}`, JSON.stringify({
              specialization: data.specialization,
              qualification: data.qualification,
              clinicAddress: data.clinicAddress,
              clinicPhone: data.clinicPhone,
              availableWorkingHours: data.availableWorkingHours,
              consultationFee: data.consultationFee,
              experienceYears: data.experienceYears,
            }));
          }
        } catch (error) {
          console.log("Offline or server unavailable, using local mock profile", error);
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchDoctorProfile();
    }
  }, [user]);

  // Handle Updates Save
  const handleSave = async () => {
    if (!user) return;
    setIsUpdating(true);
    setAlert(null);

    const updatedProfile = {
      firstName,
      lastName,
      specialization,
      qualification,
      clinicAddress,
      clinicPhone: clinicPhone,
      availableWorkingHours,
      consultationFee: Number(consultationFee),
      experienceYears: Number(experienceYears),
    };

    try {
      // 1. Sync global context user details instantly (updates header & avatar)
      updateUser({ firstName, lastName });

      // 2. Call backend service to update doctor in database
      if (user.role === 'ROLE_DOCTOR') {
        await doctorService.updateDoctor(user.id, updatedProfile);
        
        // Save locally for persistence
        localStorage.setItem(`doctor_profile_${user.id}`, JSON.stringify({
          specialization,
          qualification,
          clinicAddress,
          clinicPhone,
          availableWorkingHours,
          consultationFee,
          experienceYears,
        }));
        
        setAlert({ type: 'success', message: 'Clinical profile successfully updated and synchronized!' });
      } else {
        setAlert({ type: 'success', message: 'Identity credentials updated successfully!' });
      }
    } catch (error) {
      console.log("Error updating profile via API, applying local demo persistence:", error);
      
      // Standalone/Offline mode fallback
      if (user.role === 'ROLE_DOCTOR') {
        localStorage.setItem(`doctor_profile_${user.id}`, JSON.stringify({
          specialization,
          qualification,
          clinicAddress,
          clinicPhone,
          availableWorkingHours,
          consultationFee,
          experienceYears,
        }));
      }
      
      setAlert({ 
        type: 'success', 
        message: 'Profile updated locally in Demo/Offline mode!' 
      });
    } finally {
      setIsUpdating(false);
      // Auto-clear alert after 5 seconds
      setTimeout(() => setAlert(null), 5000);
    }
  };

  return (
    <DashboardLayout title="System & Privacy Settings">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        
        {/* Navigation Tabs */}
        <div className="lg:col-span-1 space-y-2">
            {[
                { id: 'profile', label: 'Clinical Profile', icon: <User size={20} /> },
                { id: 'security', label: 'Security Vault', icon: <Shield size={20} /> },
                { id: 'privacy', label: 'Data Privacy', icon: <FileLock size={20} /> },
                { id: 'notifications', label: 'Alert Center', icon: <Bell size={20} /> }
            ].map(tab => (
                <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-black transition-all ${
                        activeTab === tab.id 
                            ? 'bg-primary-teal text-white shadow-xl shadow-primary-teal/20' 
                            : 'text-slate-500 hover:bg-slate-50'
                    }`}
                >
                    {tab.icon} {tab.label}
                </button>
            ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-8">
            
            {activeTab === 'profile' && (
                <div className="space-y-8 animate-fade-in">
                    <div className="card !rounded-[2.5rem] p-10 border-none shadow-xl shadow-slate-100">
                        {alert && (
                            <div className={`p-4 rounded-2xl mb-8 flex items-center gap-3 text-sm font-bold border animate-fade-in ${
                                alert.type === 'success' 
                                    ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                                    : 'bg-red-50 text-red-600 border-red-100'
                            }`}>
                                {alert.type === 'success' ? <CheckCircle2 size={18} className="text-emerald-500" /> : <AlertCircle size={18} className="text-red-500" />}
                                {alert.message}
                            </div>
                        )}

                        <div className="flex justify-between items-center mb-10">
                            <h3 className="text-2xl font-black text-secondary-navy">Identity Management</h3>
                            <button 
                                onClick={handleSave} 
                                disabled={isUpdating}
                                className="btn-primary flex items-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all"
                            >
                                <Save size={18} /> {isUpdating ? 'Saving...' : 'Push Updates'}
                            </button>
                        </div>

                        {isLoading ? (
                            <div className="text-center py-20 font-black text-slate-400 animate-pulse uppercase tracking-[0.2em]">
                                Syncing Provider Profile...
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Legal First Name</label>
                                    <input 
                                        type="text" 
                                        className="input-field" 
                                        value={firstName} 
                                        onChange={(e) => setFirstName(e.target.value)} 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Legal Last Name</label>
                                    <input 
                                        type="text" 
                                        className="input-field" 
                                        value={lastName} 
                                        onChange={(e) => setLastName(e.target.value)} 
                                    />
                                </div>
                                {isDoctor && (
                                    <>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Clinical Specialization</label>
                                            <input 
                                                type="text" 
                                                className="input-field" 
                                                value={specialization} 
                                                onChange={(e) => setSpecialization(e.target.value)} 
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Professional Qualification</label>
                                            <input 
                                                type="text" 
                                                className="input-field" 
                                                value={qualification} 
                                                onChange={(e) => setQualification(e.target.value)} 
                                            />
                                        </div>
                                        <div className="space-y-2 col-span-full">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Clinic Center Address</label>
                                            <input 
                                                type="text" 
                                                className="input-field" 
                                                value={clinicAddress} 
                                                onChange={(e) => setClinicAddress(e.target.value)} 
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Clinical Contact Phone</label>
                                            <input 
                                                type="text" 
                                                className="input-field" 
                                                value={clinicPhone} 
                                                onChange={(e) => setClinicPhone(e.target.value)} 
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Consultation Hours</label>
                                            <input 
                                                type="text" 
                                                className="input-field" 
                                                placeholder="Mon-Fri: 09:00-14:00" 
                                                value={availableWorkingHours} 
                                                onChange={(e) => setAvailableWorkingHours(e.target.value)} 
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Consultation Fee (₹)</label>
                                            <input 
                                                type="number" 
                                                className="input-field" 
                                                value={consultationFee} 
                                                onChange={(e) => setConsultationFee(Number(e.target.value))} 
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Years of Experience</label>
                                            <input 
                                                type="number" 
                                                className="input-field" 
                                                value={experienceYears} 
                                                onChange={(e) => setExperienceYears(Number(e.target.value))} 
                                            />
                                        </div>
                                    </>
                                )}
                                <div className="space-y-2 col-span-full">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Certified Email Address</label>
                                    <input type="email" className="input-field bg-slate-50" defaultValue={user?.email} disabled />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {activeTab === 'security' && (
                <div className="space-y-8 animate-fade-in">
                    {/* Password Section */}
                    <div className="card !rounded-[2.5rem] p-10 border-none shadow-xl shadow-slate-100">
                        <h3 className="text-2xl font-black text-secondary-navy mb-10">Credential Security</h3>
                        <form className="space-y-6 max-w-lg">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Current Secret Password</label>
                                <input type="password" placeholder="••••••••" className="input-field" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">New Secure Password</label>
                                <input type="password" placeholder="••••••••" className="input-field" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Confirm New Password</label>
                                <input type="password" placeholder="••••••••" className="input-field" />
                            </div>
                            <div className="bg-slate-50 p-6 rounded-2xl">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Password Requirements</p>
                                <ul className="grid grid-cols-2 gap-2">
                                    <li className="text-[10px] font-bold text-emerald-600 flex items-center gap-2"><CheckCircle size={10} /> 8+ Characters</li>
                                    <li className="text-[10px] font-bold text-emerald-600 flex items-center gap-2"><CheckCircle size={10} /> Uppercase Letter</li>
                                    <li className="text-[10px] font-bold text-slate-400 flex items-center gap-2"><History size={10} /> Lowercase Letter</li>
                                    <li className="text-[10px] font-bold text-slate-400 flex items-center gap-2"><History size={10} /> Special Character</li>
                                </ul>
                            </div>
                            <button className="btn-primary px-10">Update Credentials</button>
                        </form>
                    </div>

                    {/* Active Sessions */}
                    <div className="card !rounded-[2.5rem] p-10 border-none shadow-xl shadow-slate-100">
                        <h3 className="text-2xl font-black text-secondary-navy mb-10">Live Access Activity</h3>
                        <div className="space-y-4">
                            {[
                                { device: 'macOS Monterey • Chrome', ip: '192.168.1.1', status: 'Current Session', time: 'Active' },
                                { device: 'iPhone 15 Pro • Mobile App', ip: '42.106.33.12', status: 'Authorized', time: '2 hours ago' }
                            ].map((session, i) => (
                                <div key={i} className="flex justify-between items-center p-6 bg-slate-50 rounded-3xl group hover:bg-white border border-transparent hover:border-slate-100 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-white p-3 rounded-2xl text-slate-400 group-hover:text-primary-teal transition-all">
                                            <Smartphone size={24} />
                                        </div>
                                        <div>
                                            <p className="font-black text-secondary-navy">{session.device}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">IP: {session.ip}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${session.time === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-200 text-slate-600'}`}>
                                            {session.time}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'privacy' && (
                <div className="space-y-8 animate-fade-in">
                    <div className="card !rounded-[2.5rem] p-10 border-none shadow-xl shadow-slate-100 bg-secondary-navy text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black mb-4">Patient Data Protection Notice</h3>
                            <p className="text-sm text-white/70 font-medium leading-relaxed max-w-2xl mb-8">
                                As a clinical provider on MediCare Connect, you are bound by HIPAA-equivalent digital healthcare standards. 
                                Access to patient records is logged, encrypted end-to-end, and restricted to your assigned clinical caseload. 
                                Unauthorized data sharing is strictly prohibited by hospital protocol.
                            </p>
                            <div className="flex gap-4">
                                <button className="bg-primary-teal text-white text-[10px] font-black px-6 py-3 rounded-xl uppercase tracking-widest">Read HIPAA Policy</button>
                                <button className="bg-white/10 text-white text-[10px] font-black px-6 py-3 rounded-xl uppercase tracking-widest">Compliance Cert</button>
                            </div>
                        </div>
                        <ShieldCheck size={180} className="absolute -bottom-10 -right-10 text-white/5 rotate-12" />
                    </div>

                    <div className="card !rounded-[2.5rem] p-10 border-none shadow-xl shadow-slate-100">
                        <h3 className="text-xl font-black text-secondary-navy mb-8">Data Access Permissions</h3>
                        <div className="space-y-6">
                            <div className="flex justify-between items-center p-6 bg-slate-50 rounded-[1.5rem]">
                                <div>
                                    <p className="font-black text-secondary-navy">Clinical Analytics Sharing</p>
                                    <p className="text-xs text-slate-500 font-bold">Share anonymized data for platform research</p>
                                </div>
                                <input 
                                    type="checkbox" 
                                    checked={analyticsSharing}
                                    onChange={() => setAnalyticsSharing(!analyticsSharing)}
                                    className="w-12 h-6 rounded-full bg-slate-300 appearance-none checked:bg-primary-teal transition-all cursor-pointer relative after:content-[''] after:absolute after:w-4 after:h-4 after:bg-white after:rounded-full after:top-1 after:left-1 checked:after:left-7 after:transition-all" 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'notifications' && (
                <div className="space-y-8 animate-fade-in">
                    <div className="card !rounded-[2.5rem] p-10 border-none shadow-xl shadow-slate-100">
                        <h3 className="text-2xl font-black text-secondary-navy mb-10">Alert & Notification Center</h3>
                        <div className="space-y-6">
                            <div className="flex justify-between items-center p-6 bg-slate-50 rounded-[1.5rem]">
                                <div>
                                    <p className="font-black text-secondary-navy">Email Alerts</p>
                                    <p className="text-xs text-slate-500 font-bold">Receive security warnings and clinical reports via email</p>
                                </div>
                                <input 
                                    type="checkbox" 
                                    checked={emailAlerts}
                                    onChange={() => setEmailAlerts(!emailAlerts)}
                                    className="w-12 h-6 rounded-full bg-slate-300 appearance-none checked:bg-primary-teal transition-all cursor-pointer relative after:content-[''] after:absolute after:w-4 after:h-4 after:bg-white after:rounded-full after:top-1 after:left-1 checked:after:left-7 after:transition-all" 
                                />
                            </div>
                            <div className="flex justify-between items-center p-6 bg-slate-50 rounded-[1.5rem]">
                                <div>
                                    <p className="font-black text-secondary-navy">SMS Reminders</p>
                                    <p className="text-xs text-slate-500 font-bold">Receive SMS reminders for upcoming consultations</p>
                                </div>
                                <input 
                                    type="checkbox" 
                                    checked={smsAlerts}
                                    onChange={() => setSmsAlerts(!smsAlerts)}
                                    className="w-12 h-6 rounded-full bg-slate-300 appearance-none checked:bg-primary-teal transition-all cursor-pointer relative after:content-[''] after:absolute after:w-4 after:h-4 after:bg-white after:rounded-full after:top-1 after:left-1 checked:after:left-7 after:transition-all" 
                                />
                            </div>
                            <div className="flex justify-between items-center p-6 bg-slate-50 rounded-[1.5rem]">
                                <div>
                                    <p className="font-black text-secondary-navy">App Push Notifications</p>
                                    <p className="text-xs text-slate-500 font-bold">Real-time clinical SOS notifications and audio alarms</p>
                                </div>
                                <input 
                                    type="checkbox" 
                                    checked={pushAlerts}
                                    onChange={() => setPushAlerts(!pushAlerts)}
                                    className="w-12 h-6 rounded-full bg-slate-300 appearance-none checked:bg-primary-teal transition-all cursor-pointer relative after:content-[''] after:absolute after:w-4 after:h-4 after:bg-white after:rounded-full after:top-1 after:left-1 checked:after:left-7 after:transition-all" 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
      </div>
    </DashboardLayout>
  );
};

const CheckCircle = ({ size }: { size: number }) => <ShieldCheck size={size} />;

export default SettingsPage;
