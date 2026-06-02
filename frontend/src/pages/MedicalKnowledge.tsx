import React, { useState, useEffect } from 'react';
import { Search, BookOpen, AlertTriangle, Stethoscope, ChevronRight, Info, ShieldAlert, Pill } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import api from '../services/api';

interface Medicine {
  id: number;
  name: string;
  type: string;
  commonUses: string;
  sideEffects: string;
  precautions: string;
  prescriptionRequired: boolean;
}

interface Disease {
  id: number;
  name: string;
  overview: string;
  causes: string;
  symptoms: string[];
  firstAidMeasures: string;
  preventionTips: string;
  whenToVisitDoctor: string;
  specialistType: string;
  commonlyPrescribedMedicines: Medicine[];
}

const MedicalKnowledge: React.FC = () => {
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDiseases();
  }, []);

  const fetchDiseases = async () => {
    try {
      const response = await api.get('/diseases');
      setDiseases(response.data);
    } catch (error) {
      console.error("Error fetching diseases:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDiseases = diseases.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.symptoms.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <DashboardLayout title="Medical Knowledge Center">
      <div className="space-y-10">
        
        {/* Disclaimer Banner */}
        <div className="bg-amber-50 border-2 border-amber-100 p-6 rounded-[2rem] flex items-start gap-4 shadow-sm animate-fade-in">
          <div className="bg-amber-100 p-3 rounded-2xl text-amber-600">
             <ShieldAlert size={24} />
          </div>
          <div>
            <h4 className="text-amber-800 font-black uppercase text-xs tracking-widest mb-1">Important Disclaimer</h4>
            <p className="text-amber-700 text-sm font-bold leading-relaxed">
              The medicines and information listed below are for educational purposes only. Patients should consult a licensed healthcare professional before taking any medication or making medical decisions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* List/Search Column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-teal transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Search disease or symptom..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-12"
              />
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {loading ? (
                <div className="text-center py-10 font-bold text-slate-400">Loading records...</div>
              ) : (
                filteredDiseases.map(disease => (
                  <div 
                    key={disease.id}
                    onClick={() => setSelectedDisease(disease)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer group ${
                      selectedDisease?.id === disease.id 
                        ? 'bg-primary-teal text-white border-primary-teal shadow-xl shadow-primary-teal/20' 
                        : 'bg-white border-slate-100 hover:border-primary-teal/30 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className={`font-black ${selectedDisease?.id === disease.id ? 'text-white' : 'text-secondary-navy'}`}>
                          {disease.name}
                        </h4>
                        <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${
                          selectedDisease?.id === disease.id ? 'text-white/70' : 'text-slate-400'
                        }`}>
                          {disease.specialistType}
                        </p>
                      </div>
                      <ChevronRight size={18} className={selectedDisease?.id === disease.id ? 'text-white' : 'text-slate-300'} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-2">
            {selectedDisease ? (
              <div className="card !rounded-[2.5rem] p-10 border-none shadow-2xl shadow-slate-100 space-y-10 animate-fade-in">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-4xl font-black text-secondary-navy mb-2">{selectedDisease.name}</h2>
                    <div className="flex items-center gap-2 text-primary-teal font-black text-sm uppercase tracking-widest">
                       <Stethoscope size={18} /> Recommened: {selectedDisease.specialistType}
                    </div>
                  </div>
                  <button className="btn-primary">Consult Doctor</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="flex items-center gap-2 font-black text-secondary-navy">
                      <Info size={18} className="text-primary-teal" /> Overview
                    </h4>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">{selectedDisease.overview}</p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="flex items-center gap-2 font-black text-secondary-navy">
                      <AlertTriangle size={18} className="text-amber-500" /> Symptoms
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedDisease.symptoms.map((s, i) => (
                        <span key={i} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-50 pt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <div className="bg-primary-teal/5 p-6 rounded-3xl border border-primary-teal/10">
                      <h4 className="font-black text-primary-teal mb-4 uppercase text-xs tracking-widest">First Aid Measures</h4>
                      <p className="text-sm text-slate-600 font-bold leading-relaxed">{selectedDisease.firstAidMeasures}</p>
                    </div>
                    <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
                      <h4 className="font-black text-emerald-600 mb-4 uppercase text-xs tracking-widest">Prevention Tips</h4>
                      <p className="text-sm text-emerald-700 font-bold leading-relaxed">{selectedDisease.preventionTips}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="font-black text-secondary-navy uppercase text-xs tracking-widest">Commonly Prescribed Medicines</h4>
                    <div className="space-y-4">
                      {selectedDisease.commonlyPrescribedMedicines.map(med => (
                        <div key={med.id} className="p-4 bg-white border border-slate-100 shadow-sm rounded-2xl group transition-all hover:shadow-lg">
                           <div className="flex items-center gap-3 mb-2">
                              <div className="p-2 bg-primary-teal/10 rounded-xl text-primary-teal">
                                <Pill size={18} />
                              </div>
                              <h5 className="font-black text-secondary-navy group-hover:text-primary-teal transition-colors">{med.name}</h5>
                              {med.prescriptionRequired && (
                                <span className="ml-auto bg-amber-50 text-amber-600 text-[10px] font-black px-2 py-0.5 rounded ring-1 ring-amber-100">Rx Required</span>
                              )}
                           </div>
                           <p className="text-[11px] text-slate-400 font-bold leading-relaxed">{med.commonUses}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 p-8 rounded-[2rem] border border-red-100">
                  <h4 className="font-black text-red-600 mb-2 uppercase text-xs tracking-widest flex items-center gap-2">
                    <ShieldAlert size={18} /> When to visit a doctor?
                  </h4>
                  <p className="text-sm text-red-700 font-bold">{selectedDisease.whenToVisitDoctor}</p>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-20 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 animate-pulse">
                 <div className="bg-slate-200 p-8 rounded-full mb-6">
                    <BookOpen size={48} className="text-slate-400" />
                 </div>
                 <h3 className="text-2xl font-black text-secondary-navy">Medical Encyclopedia</h3>
                 <p className="text-slate-500 mt-2 max-w-sm font-bold">Select a disease from the list to view detailed symptoms, first aid, and treatment guides.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default MedicalKnowledge;
