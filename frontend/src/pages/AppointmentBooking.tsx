import React, { useState, useEffect } from 'react';
import { Search, Calendar, MapPin, Star, ChevronRight, CheckCircle2, Stethoscope, XCircle } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { useLocation } from 'react-router-dom';
import { doctorService, diseaseService, appointmentService } from '../services/api';

interface Doctor {
  id: number;
  firstName: string;
  lastName: string;
  specialization: string;
  qualification: string;
  availabilityStatus: string;
  consultationFee: number;
  experienceYears: number;
  clinicAddress: string;
  availableWorkingHours: string;
}

const getLocalYYYYMMDD = (d: Date) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const AppointmentBooking: React.FC = () => {
  const location = useLocation();
  const preSelectedDoctorId = location.state?.preSelectedDoctorId;

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingSlot, setBookingSlot] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());

  const [diseases, setDiseases] = useState<{ id: number; name: string }[]>([]);
  const [selectedDisease, setSelectedDisease] = useState('');
  const [customDisease, setCustomDisease] = useState('');
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<{
    doctorName: string;
    date: string;
    time: string;
    disease: string;
  } | null>(null);
  const [bookingError, setBookingError] = useState('');

  const specialties = ['All', 'Cardiology', 'Pediatrics', 'Dermatology', 'Neurology', 'General Medicine', 'Gynecology'];

  useEffect(() => {
    fetchDoctors();
    fetchDiseases();
  }, []);

  const fetchDiseases = async () => {
    try {
      const response = await diseaseService.getDiseases();
      setDiseases(response.data);
    } catch (error) {
      console.error("Error fetching diseases, using fallback:", error);
      setDiseases([
        { id: 1, name: 'Fever' },
        { id: 2, name: 'Common Cold' },
        { id: 3, name: 'Diarrhea' }
      ]);
    }
  };

  const handleBookAppointment = async () => {
    if (!selectedDoctor || !bookingDate || !bookingSlot) return;
    
    const finalDisease = selectedDisease === 'Other' ? customDisease : (selectedDisease || 'General Consult');
    if (!finalDisease) {
      setBookingError("Please specify a disease or reason for booking.");
      return;
    }
    
    setIsBooking(true);
    setBookingError('');
    
    try {
      await appointmentService.bookAppointment({
        doctorId: selectedDoctor.id,
        appointmentDate: bookingDate,
        appointmentTime: bookingSlot,
        reason: finalDisease
      });
      
      setBookingSuccess({
        doctorName: `Dr. ${selectedDoctor.firstName} ${selectedDoctor.lastName}`,
        date: bookingDate,
        time: bookingSlot,
        disease: finalDisease
      });
      
      // Clear inputs
      setBookingDate('');
      setBookingSlot('');
      setSelectedDisease('');
      setCustomDisease('');
    } catch (error: any) {
      console.error("Booking error:", error);
      setBookingError(error.response?.data?.message || "Failed to confirm reservation. Please try again.");
    } finally {
      setIsBooking(false);
    }
  };

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await doctorService.getDoctors();
      setDoctors(response.data);
      
      const selectedId = preSelectedDoctorId || (response.data && response.data[0]?.id);
      if (selectedId && response.data) {
        const found = response.data.find((d: any) => d.id === selectedId);
        if (found) setSelectedDoctor(found);
      }
    } catch (error) {
      console.error("Error fetching doctors, using premium fallback roster:", error);
      const mockDoctors: Doctor[] = [
        {
          id: 1,
          firstName: 'Arjun',
          lastName: 'Sharma',
          specialization: 'Cardiology',
          qualification: 'MD, DM - Senior Cardiologist',
          availabilityStatus: 'AVAILABLE',
          consultationFee: 800,
          experienceYears: 12,
          clinicAddress: 'Hospital Block A, Delhi',
          availableWorkingHours: 'Mon-Fri: 09:00 - 15:00'
        },
        {
          id: 2,
          firstName: 'Priya',
          lastName: 'Nair',
          specialization: 'Dermatology',
          qualification: 'MD - Chief Dermatologist',
          availabilityStatus: 'AVAILABLE',
          consultationFee: 700,
          experienceYears: 8,
          clinicAddress: 'Hospital Block B, Delhi',
          availableWorkingHours: 'Mon-Thu: 10:00 - 16:00'
        },
        {
          id: 3,
          firstName: 'Vikram',
          lastName: 'Reddy',
          specialization: 'Neurology',
          qualification: 'MD, DM - Senior Neurologist',
          availabilityStatus: 'AVAILABLE',
          consultationFee: 1000,
          experienceYears: 15,
          clinicAddress: 'Hospital Block C, Delhi',
          availableWorkingHours: 'Tue-Fri: 09:00 - 14:00'
        },
        {
          id: 4,
          firstName: 'Sarah',
          lastName: 'Connor',
          specialization: 'Pediatrics',
          qualification: 'MD - Pediatric Lead',
          availabilityStatus: 'AVAILABLE',
          consultationFee: 600,
          experienceYears: 10,
          clinicAddress: 'Hospital Block D, Delhi',
          availableWorkingHours: 'Mon-Sat: 09:00 - 13:00'
        }
      ];
      setDoctors(mockDoctors);
      
      const selectedId = preSelectedDoctorId || 1;
      const found = mockDoctors.find(d => d.id === selectedId);
      if (found) {
        setSelectedDoctor(found);
      } else {
        setSelectedDoctor(mockDoctors[0]);
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredDoctors = doctors.filter(dr => 
    (selectedSpecialty === 'All' || dr.specialization === selectedSpecialty) &&
    ((dr.firstName + ' ' + dr.lastName).toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

  const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];

  const calendarDays = [];
  const totalDays = daysInMonth(currentDate.getMonth(), currentDate.getFullYear());
  const startOffset = firstDayOfMonth(currentDate.getMonth(), currentDate.getFullYear());

  for (let i = 0; i < startOffset; i++) calendarDays.push(null);
  for (let i = 1; i <= totalDays; i++) calendarDays.push(i);

  const handleDateSelect = (day: number) => {
    const d = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setBookingDate(getLocalYYYYMMDD(d));
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <DashboardLayout title="Clinical Consultation Booking">
      <div className="space-y-10">
        
        {/* Search & Specialty Filter */}
        <div className="card !rounded-[2.5rem] p-10 border-none shadow-xl shadow-slate-100 space-y-8 animate-fade-in bg-white">
            <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="relative flex-1 w-full group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-teal transition-all" size={24} />
                    <input 
                        type="text" 
                        placeholder="Search Indian specialists by name or specialty..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-16 pr-6 py-5 rounded-[2rem] bg-slate-50 border-none outline-none focus:ring-4 focus:ring-primary-teal/5 transition-all text-sm font-bold" 
                    />
                </div>
                <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-2 scrollbar-hide">
                    <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                        {specialties.slice(0, 4).map(spec => (
                            <button 
                                key={spec}
                                onClick={() => setSelectedSpecialty(spec)}
                                className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                                    selectedSpecialty === spec 
                                    ? 'bg-primary-teal text-white shadow-lg shadow-primary-teal/20' 
                                    : 'text-slate-400 hover:text-primary-teal'
                                }`}
                            >
                                {spec}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Doctor List */}
            <div className="lg:col-span-2 space-y-6 max-h-[1000px] overflow-y-auto pr-4 custom-scrollbar">
                {loading ? (
                    <div className="text-center py-20 font-black text-slate-400 animate-pulse uppercase tracking-[0.2em]">Syncing Provider Network...</div>
                ) : (
                    filteredDoctors.map(dr => (
                        <div 
                            key={dr.id} 
                            onClick={() => setSelectedDoctor(dr)}
                            className={`card !rounded-[2.5rem] p-8 border-none transition-all cursor-pointer group ${
                                selectedDoctor?.id === dr.id 
                                ? 'bg-primary-teal text-white shadow-2xl shadow-primary-teal/30 scale-[1.02]' 
                                : 'bg-white shadow-xl shadow-slate-100 hover:shadow-2xl hover:scale-[1.01]'
                            }`}
                        >
                            <div className="flex gap-8 items-start">
                                <div className="w-28 h-28 rounded-[2rem] overflow-hidden bg-white shadow-lg border-4 border-slate-50 p-1 shrink-0">
                                    <img src={`https://ui-avatars.com/api/?name=${dr.firstName}+${dr.lastName}&background=00B69B&color=fff&bold=true`} className="w-full h-full object-cover rounded-[1.5rem]" alt="Doctor" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${selectedDoctor?.id === dr.id ? 'text-white/70' : 'text-primary-teal'}`}>{dr.specialization}</p>
                                            <h3 className="text-2xl font-black tracking-tight">Dr. {dr.firstName} {dr.lastName}</h3>
                                            <p className={`text-xs font-bold mt-1 ${selectedDoctor?.id === dr.id ? 'text-white/70' : 'text-slate-400'}`}>{dr.qualification} • {dr.experienceYears} Yrs Exp</p>
                                        </div>
                                        <div className={`p-2 rounded-xl flex items-center gap-1 ${selectedDoctor?.id === dr.id ? 'bg-white/10 text-white' : 'bg-amber-50 text-amber-500'}`}>
                                            <Star size={16} fill="currentColor" /> <span className="text-xs font-black">4.9</span>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-8 grid grid-cols-2 gap-4">
                                        <div className="flex items-center gap-3">
                                            <MapPin size={18} className={selectedDoctor?.id === dr.id ? 'text-white/70' : 'text-primary-teal'} />
                                            <span className="text-[10px] font-black uppercase tracking-widest truncate">{dr.clinicAddress || 'Hospital Main Block'}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Calendar size={18} className={selectedDoctor?.id === dr.id ? 'text-white/70' : 'text-primary-teal'} />
                                            <span className="text-[10px] font-black uppercase tracking-widest">{dr.availableWorkingHours || 'Mon-Fri'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Booking Config Column */}
            <div className="lg:col-span-1 space-y-6">
                <div className="lg:sticky lg:top-28 lg:max-h-[calc(100vh-140px)] lg:overflow-y-auto custom-scrollbar space-y-6 pr-2">
                    {selectedDoctor ? (
                        <div className="card !rounded-[2.5rem] p-8 border-none shadow-2xl shadow-slate-100 bg-white space-y-6">
                            <h3 className="text-2xl font-black text-secondary-navy tracking-tight leading-none mb-4">Clinical Booking</h3>
                            
                            <div className="space-y-6">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                                    </label>
                                    <div className="flex gap-2">
                                        <button onClick={handlePrevMonth} className="p-2 hover:bg-slate-100 rounded-lg transition-all"><ChevronRight className="rotate-180" size={16} /></button>
                                        <button onClick={handleNextMonth} className="p-2 hover:bg-slate-100 rounded-lg transition-all"><ChevronRight size={16} /></button>
                                    </div>
                                </div>
                                
                                {selectedDoctor.availabilityStatus === 'ON_LEAVE' ? (
                                    <div className="bg-red-50 border-2 border-dashed border-red-200 p-10 rounded-[2.5rem] text-center space-y-4">
                                        <XCircle size={48} className="text-red-500 mx-auto" />
                                        <h4 className="text-lg font-black text-red-600">Provider on Leave</h4>
                                        <p className="text-[10px] text-red-500 font-bold leading-relaxed px-4 uppercase tracking-widest">Unavailable for consultations</p>
                                    </div>
                                ) : (
                                    <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 shadow-inner">
                                        <div className="grid grid-cols-7 gap-3 mb-6">
                                            {['S','M','T','W','T','F','S'].map((day, i) => (
                                                <div key={i} className="text-[10px] font-black text-slate-300 text-center">{day}</div>
                                            ))}
                                        </div>
                                        <div className="grid grid-cols-7 gap-3">
                                            {calendarDays.map((day, i) => (
                                                <div 
                                                    key={i} 
                                                    onClick={() => day && handleDateSelect(day)}
                                                    className={`h-11 flex items-center justify-center rounded-2xl text-[11px] font-black transition-all ${
                                                        !day ? 'opacity-0 pointer-events-none' :
                                                        (bookingDate === getLocalYYYYMMDD(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))
                                                            ? 'bg-primary-teal text-white shadow-xl shadow-primary-teal/20 scale-110' : 
                                                            (day % 5 === 0 ? 'bg-slate-200 text-slate-400 opacity-40 cursor-not-allowed border border-transparent' : 'bg-white text-secondary-navy hover:shadow-xl hover:scale-110 cursor-pointer border border-slate-100')
                                                        )
                                                    }`}
                                                >
                                                    {day}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Available Slots</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {timeSlots.map(slot => (
                                        <button 
                                            key={slot}
                                            onClick={() => setBookingSlot(slot)}
                                            className={`p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                                                bookingSlot === slot
                                                ? 'bg-primary-teal text-white border-primary-teal shadow-lg shadow-primary-teal/20'
                                                : 'bg-white border-slate-100 text-slate-400 hover:border-primary-teal/30 hover:text-primary-teal'
                                            }`}
                                        >
                                            {slot}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Disease / Reason</label>
                                <select 
                                    value={selectedDisease}
                                    onChange={(e) => {
                                        setSelectedDisease(e.target.value);
                                        if (e.target.value !== 'Other') {
                                            setCustomDisease('');
                                        }
                                    }}
                                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-4 focus:ring-primary-teal/5 transition-all text-xs font-bold text-secondary-navy"
                                >
                                    <option value="">-- Select Disease / Condition --</option>
                                    {diseases.map(d => (
                                        <option key={d.id} value={d.name}>{d.name}</option>
                                    ))}
                                    <option value="Other">Other / Custom Symptoms...</option>
                                </select>
                                
                                {selectedDisease === 'Other' && (
                                    <input 
                                        type="text"
                                        placeholder="Please specify your condition/symptoms..."
                                        value={customDisease}
                                        onChange={(e) => setCustomDisease(e.target.value)}
                                        className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-4 focus:ring-primary-teal/5 transition-all text-xs font-bold text-secondary-navy mt-3"
                                    />
                                )}
                            </div>

                            {bookingError && (
                                <div className="text-red-500 text-xs font-bold px-2 py-1 bg-red-50 rounded-xl border border-red-100">
                                    {bookingError}
                                </div>
                            )}

                            <button 
                                disabled={!bookingDate || !bookingSlot || isBooking}
                                onClick={handleBookAppointment}
                                className="btn-primary w-full !py-5 rounded-[2rem] flex items-center justify-center gap-3 disabled:bg-slate-100 disabled:text-slate-400 shadow-xl shadow-primary-teal/20 hover:scale-105 active:scale-95 transition-all"
                            >
                                {isBooking ? (
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <CheckCircle2 size={24} /> Confirm Reservation
                                    </>
                                )}
                            </button>
                        </div>
                    ) : (
                        <div className="h-[600px] flex flex-col items-center justify-center p-12 text-center bg-white rounded-[3rem] shadow-xl shadow-slate-100 border-none group">
                            <div className="bg-slate-50 p-10 rounded-[2.5rem] mb-8 group-hover:scale-110 transition-transform">
                                <Stethoscope size={64} className="text-primary-teal" />
                            </div>
                            <h3 className="text-2xl font-black text-secondary-navy leading-none">Select Specialist</h3>
                            <p className="text-xs text-slate-400 mt-4 font-bold leading-relaxed">Choose a medical professional to initialize the clinical booking sequence.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>

      {/* Booking Success Modal */}
      {bookingSuccess && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] p-10 max-w-md w-full shadow-2xl border border-slate-100 text-center space-y-8 animate-scale-up">
            <div className="bg-emerald-50 text-emerald-500 w-24 h-24 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
              <CheckCircle2 size={48} />
            </div>
            
            <div className="space-y-3">
              <h3 className="text-3xl font-black text-secondary-navy tracking-tight">Appointment Confirmed!</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Clinical Reservation Successful</p>
            </div>
            
            <div className="bg-slate-50 rounded-[2rem] p-6 border border-slate-100 text-left space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-bold uppercase tracking-wider">Physician</span>
                <span className="text-secondary-navy font-black">{bookingSuccess.doctorName}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-bold uppercase tracking-wider">Date</span>
                <span className="text-secondary-navy font-black">{bookingSuccess.date}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-bold uppercase tracking-wider">Time Slot</span>
                <span className="text-secondary-navy font-black">{bookingSuccess.time}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-bold uppercase tracking-wider">Medical Case</span>
                <span className="text-primary-teal font-black uppercase tracking-wider">{bookingSuccess.disease}</span>
              </div>
            </div>
            
            <button 
              onClick={() => setBookingSuccess(null)}
              className="w-full bg-primary-teal hover:bg-[#009E86] text-white font-black py-4 rounded-2xl shadow-xl shadow-primary-teal/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AppointmentBooking;
