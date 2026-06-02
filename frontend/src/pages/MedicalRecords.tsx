import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Download, 
  ShieldCheck,
  Search,
  Plus,
  Loader2
} from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';

const MedicalRecords: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [records, setRecords] = useState([
    { id: 1, type: 'Diagnosis', title: 'Hypertension Screening', doctor: 'Dr. Sarah Connor', date: 'May 12, 2026', hospital: 'Main Hospital', attachment: true },
    { id: 2, type: 'Lab Result', title: 'Routine Blood Panel', doctor: 'Dr. Gregory House', date: 'April 20, 2026', hospital: 'Diagnostics Lab', attachment: true },
    { id: 3, type: 'Prescription', title: 'Seasonal Allergy Meds', doctor: 'Dr. Emily Blunt', date: 'April 05, 2026', hospital: 'Community Clinic', attachment: false },
    { id: 4, type: 'Treatment', title: 'Knee Physiotherapy', doctor: 'Dr. Meredith Grey', date: 'March 15, 2026', hospital: 'Garey Memorial', attachment: true },
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    // Simulate upload delay
    setTimeout(() => {
      const newRecord = {
        id: Date.now(),
        type: 'External Upload',
        title: file.name,
        doctor: 'Self-Uploaded',
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        hospital: 'External Source',
        attachment: true
      };
      setRecords([newRecord, ...records]);
      setIsUploading(false);
    }, 2000);
  };

  const handleDownload = (title: string) => {
    alert(`Initiating secure clinical download for: ${title}\nThis file is encrypted for patient privacy.`);
  };

  const filteredRecords = records.filter(r => 
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.hospital.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout title="Clinical Repository">
      <div className="space-y-10">
        
        {/* Actions Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="relative flex-1 w-full max-w-xl group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-blue transition-all" size={24} />
            <input 
              type="text" 
              placeholder="Search records by clinical provider or title..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-6 py-5 rounded-[2rem] bg-white border-none shadow-xl shadow-slate-100 outline-none focus:ring-4 focus:ring-primary-blue/5 transition-all text-sm font-bold"
            />
          </div>
          
          <input 
             type="file" 
             ref={fileInputRef} 
             className="hidden" 
             onChange={handleFileUpload}
             accept=".pdf,.jpg,.png"
          />
          
          <button 
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
            className="btn-primary !py-5 px-10 rounded-[2rem] flex items-center gap-3 w-full md:w-auto justify-center disabled:opacity-50 transition-all hover:scale-105 active:scale-95"
          >
            {isUploading ? <Loader2 className="animate-spin" size={24} /> : <Plus size={24} />}
            {isUploading ? 'Encrypting & Syncing...' : 'Upload Clinical Record'}
          </button>
        </div>

        {/* Categories */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {['Registry (All)', 'Clinical Diagnoses', 'Lab Diagnostics', 'Digital Prescriptions', 'Immunization Logs'].map((cat, i) => (
            <button key={i} className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
              i === 0 ? 'bg-primary-teal text-white shadow-lg shadow-primary-teal/20' : 'bg-white text-slate-400 border border-slate-100 hover:border-primary-teal hover:text-primary-teal'
            }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Records Table */}
        <div className="card !rounded-[2.5rem] overflow-hidden border-none shadow-2xl shadow-slate-100/50 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 text-slate-400 uppercase text-[10px] font-black tracking-[0.2em] border-b border-slate-100">
                  <th className="px-10 py-6">Clinical Document</th>
                  <th className="px-10 py-6">Classification</th>
                  <th className="px-10 py-6">Medical Professional</th>
                  <th className="px-10 py-6">Registry Date</th>
                  <th className="px-10 py-6">Health Facility</th>
                  <th className="px-10 py-6 text-right">Access</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredRecords.map(record => (
                  <tr key={record.id} className="group hover:bg-slate-50/50 transition-all duration-300">
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-5">
                        <div className="bg-primary-teal/10 text-primary-teal p-4 rounded-2xl group-hover:scale-110 transition-transform">
                          <FileText size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-black text-secondary-navy leading-none mb-1">{record.title}</p>
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">ID: MC-{record.id.toString().slice(-4)}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <span className="text-[10px] font-black text-slate-500 bg-slate-100 px-4 py-2 rounded-xl uppercase tracking-widest">
                        {record.type}
                      </span>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                         <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-black text-slate-500">
                             {record.doctor.charAt(0)}
                         </div>
                         {record.doctor}
                      </div>
                    </td>
                    <td className="px-10 py-6 text-xs font-bold text-slate-500 tracking-tight">{record.date}</td>
                    <td className="px-10 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">{record.hospital}</td>
                    <td className="px-10 py-6 text-right">
                      {record.attachment ? (
                        <button 
                            onClick={() => handleDownload(record.title)}
                            className="p-4 text-primary-teal hover:bg-primary-teal hover:text-white rounded-2xl transition-all shadow-xl shadow-transparent hover:shadow-primary-teal/20" title="Secure Download"
                        >
                          <Download size={24} />
                        </button>
                      ) : (
                        <span className="text-[10px] font-black text-slate-300 uppercase italic tracking-widest">No Digital File</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Permanent Record Banner */}
        <div className="card bg-success/5 border-success/20 flex gap-6 p-8 items-start">
          <div className="bg-success text-white p-3 rounded-2xl">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h4 className="text-lg font-bold text-secondary-navy mb-2">Permanent Digital Vault</h4>
            <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
              All records in MediCare Connect are cryptographically signed and stored in our secure permanent vault. These records are non-deletable and can be shared instantly with any doctor in our network for accurate diagnosis.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MedicalRecords;
