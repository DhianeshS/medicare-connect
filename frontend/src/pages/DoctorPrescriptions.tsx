import React, { useState } from 'react';
import { Pill, Plus, Trash2, ShieldCheck, ClipboardList, Send } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';

interface PrescribedMedication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

const DoctorPrescriptions: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState('101');
  const [diagnosis, setDiagnosis] = useState('Suspected Viral Fever');
  const [notes, setNotes] = useState('Rest well, drink plenty of fluids.');
  const [medications, setMedications] = useState<PrescribedMedication[]>([
    { id: 1, name: 'Paracetamol', dosage: '650mg', frequency: '1-0-1', duration: '5 Days', instructions: 'Take after meals' }
  ]);

  const [newMed, setNewMed] = useState({
    name: '',
    dosage: '500mg',
    frequency: '1-0-1',
    duration: '5 Days',
    instructions: 'Take after meals'
  });

  const handleAddMedication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMed.name) return;
    
    setMedications([
      ...medications,
      { ...newMed, id: Date.now() }
    ]);
    
    setNewMed({
      name: '',
      dosage: '500mg',
      frequency: '1-0-1',
      duration: '5 Days',
      instructions: 'Take after meals'
    });
  };

  const handleRemoveMedication = (id: number) => {
    setMedications(medications.filter(m => m.id !== id));
  };

  const handleDispatch = () => {
    if (medications.length === 0) {
      alert("Please add at least one medication before dispatching.");
      return;
    }
    alert(`PRESCRIPTION DISPATCHED SUCCESSFULLY:\nPatient ID: ${selectedPatient}\nDiagnosis: ${diagnosis}\nMedications Prescribed: ${medications.length} items\nElectronic signature applied: Dr. Arjun Sharma.`);
  };

  return (
    <DashboardLayout title="Prescription Management Hub">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 animate-fade-in">
        
        {/* Prescription Designer Roster Form */}
        <div className="lg:col-span-2 space-y-8">
          <div className="card !rounded-[2.5rem] p-10 border-none shadow-xl shadow-slate-100 bg-white">
            <h3 className="text-2xl font-black text-secondary-navy mb-8">Clinical Rx Designer</h3>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Active Patient</label>
                  <select 
                    value={selectedPatient}
                    onChange={(e) => setSelectedPatient(e.target.value)}
                    className="input-field bg-slate-50 border-none cursor-pointer py-3.5 !rounded-xl"
                  >
                    <option value="101">Ramesh Kumar (ID: #MC-0101)</option>
                    <option value="102">Lakshmi Devi (ID: #MC-0102)</option>
                    <option value="103">Suresh Raj (ID: #MC-0103)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Clinical Diagnosis</label>
                  <input 
                    type="text" 
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    className="input-field py-3.5"
                    placeholder="Enter diagnosed condition"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Physician Consult Notes</label>
                <textarea 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="input-field min-h-[100px] py-4"
                  placeholder="Enter lifestyle recommendations or general clinical remarks..."
                />
              </div>

              {/* Meds List Table */}
              <div className="pt-6 border-t border-slate-100">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Active Meds in Prescription</h4>
                <div className="space-y-3">
                  {medications.map(med => (
                    <div key={med.id} className="flex justify-between items-center p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100 group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-primary-teal border border-slate-100 shrink-0">
                          <Pill size={22} />
                        </div>
                        <div>
                          <p className="text-sm font-black text-secondary-navy leading-none mb-1">{med.name} <span className="text-xs text-slate-400 font-bold ml-2">({med.dosage})</span></p>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{med.frequency} • {med.duration} • {med.instructions}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleRemoveMedication(med.id)}
                        className="p-3 bg-red-50 hover:bg-red-600 text-red-500 hover:text-white rounded-xl transition-all shadow-sm"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  {medications.length === 0 && (
                    <div className="text-center py-10 font-bold text-slate-300 italic">No medications added yet. Use the selector below.</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Medication Selector & Dispatch Column */}
        <div className="space-y-8">
          
          {/* Add Med Selector */}
          <div className="card !rounded-[3rem] p-8 bg-white shadow-xl shadow-slate-100 border-none space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-teal/10 text-primary-teal flex items-center justify-center">
                <Plus size={20} />
              </div>
              <div>
                <h3 className="text-sm font-black text-secondary-navy leading-none">Add Medication</h3>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">E-Pharmacology Database</p>
              </div>
            </div>

            <form onSubmit={handleAddMedication} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Medication Name</label>
                <input 
                  type="text" 
                  value={newMed.name}
                  onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                  placeholder="e.g. Lisinopril"
                  className="input-field py-3 text-xs" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Dosage</label>
                  <input 
                    type="text" 
                    value={newMed.dosage}
                    onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
                    placeholder="e.g. 500mg"
                    className="input-field py-3 text-xs" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Frequency</label>
                  <input 
                    type="text" 
                    value={newMed.frequency}
                    onChange={(e) => setNewMed({ ...newMed, frequency: e.target.value })}
                    placeholder="e.g. 1-0-1"
                    className="input-field py-3 text-xs" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Duration</label>
                  <input 
                    type="text" 
                    value={newMed.duration}
                    onChange={(e) => setNewMed({ ...newMed, duration: e.target.value })}
                    placeholder="e.g. 5 Days"
                    className="input-field py-3 text-xs" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Instructions</label>
                  <input 
                    type="text" 
                    value={newMed.instructions}
                    onChange={(e) => setNewMed({ ...newMed, instructions: e.target.value })}
                    placeholder="Take after meals"
                    className="input-field py-3 text-xs" 
                  />
                </div>
              </div>
              <button 
                type="submit" 
                disabled={!newMed.name}
                className="btn-primary w-full !py-3 flex items-center justify-center gap-2 text-xs uppercase tracking-widest disabled:bg-slate-100 disabled:text-slate-300"
              >
                <Plus size={16} /> Add to Prescription
              </button>
            </form>
          </div>

          {/* Electronic Dispatch Card */}
          <div className="card !rounded-[2.5rem] p-8 bg-secondary-navy text-white relative overflow-hidden shadow-2xl shadow-secondary-navy/10 space-y-6">
            <div className="relative z-10 space-y-6">
              <div className="flex justify-between items-center">
                <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">Secure Signatory</h4>
                <ShieldCheck size={20} className="text-emerald-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black">Electronic Signature</h3>
                <p className="text-[10px] text-white/60 font-bold uppercase tracking-widest leading-relaxed">
                  Prescription is digitally signed by Dr. Arjun Sharma and will be transmitted to the integrated pharmacy registry for patient pickup.
                </p>
              </div>
              <button 
                onClick={handleDispatch}
                className="w-full bg-primary-teal hover:bg-[#009E86] text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-primary-teal/20 flex items-center justify-center gap-2 text-xs uppercase tracking-widest hover:scale-105 active:scale-95"
              >
                <Send size={14} /> Finalize & Dispatch Rx
              </button>
            </div>
            <ClipboardList size={180} className="absolute -bottom-10 -right-10 text-white/5 rotate-12" />
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};

export default DoctorPrescriptions;
