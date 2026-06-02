import React, { useState, useRef, useEffect } from 'react';
import { Video, Mic, MicOff, VideoOff, Settings, Maximize2, Send, Heart, MessageSquare, Save } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';

interface Message {
  id: number;
  sender: string;
  text: string;
  time: string;
  isDoctor: boolean;
}

const DoctorConsultation: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'You', text: 'Good morning, Ramesh. Please stay still while I review your previous lab results.', time: '10:05 AM', isDoctor: true },
    { id: 2, sender: 'Ramesh Kumar', text: 'Sure doctor, I have those ready if you need clarification.', time: '10:06 AM', isDoctor: false },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [symptoms, setSymptoms] = useState('High fever, mild chills, coughing');
  const [diagnosis, setDiagnosis] = useState('Suspected Viral Infection');
  const [treatment, setTreatment] = useState('Paracetamol 650mg thrice daily, stay hydrated, rest for 3 days.');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isCameraOn && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: isMicOn })
        .then(stream => {
          if (videoRef.current) videoRef.current.srcObject = stream;
        })
        .catch(err => {
          console.error("Camera access denied:", err);
          setIsCameraOn(false);
          alert("Unable to access camera. Please check your system permissions.");
        });
    } else if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  }, [isCameraOn, isMicOn]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      sender: 'You',
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isDoctor: true
    };
    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  const handleSaveEHR = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`EHR Roster Updated Successfully:\nSymptoms: ${symptoms}\nDiagnosis: ${diagnosis}\nTreatment: ${treatment}`);
  };

  return (
    <DashboardLayout title="Physician Consultation Workspace">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 h-[80vh] animate-fade-in">
        
        {/* Doctor Main Video Stream Feed */}
        <div className="lg:col-span-3 card !bg-slate-900 overflow-hidden relative group !rounded-[3rem] shadow-2xl">
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200" 
              alt="Patient Feed" 
              className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
            
            <div className="absolute top-10 left-10 flex items-center gap-4">
                <div className="bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/10 flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <div>
                        <p className="text-white text-sm font-black tracking-tight leading-none uppercase">Mr. Ramesh Kumar</p>
                        <p className="text-white/40 text-[9px] font-black uppercase tracking-widest mt-1">EHR Code: #MC-0101</p>
                    </div>
                </div>
            </div>
          </div>

          {/* Doctor Feed Preview */}
          <div className="absolute top-10 right-10 w-64 aspect-video rounded-[2rem] bg-slate-800 border-2 border-white/20 overflow-hidden shadow-2xl group/preview">
            {isCameraOn ? (
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className="w-full h-full object-cover scale-x-[-1]"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500">
                    <VideoOff size={24} />
                </div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Feed Disabled</p>
              </div>
            )}
            <div className="absolute bottom-4 left-4 text-[10px] font-black text-white bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">DR. ARJUN SHARMA</div>
          </div>

          {/* Controls Overlay */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 p-6 bg-white/10 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 shadow-2xl">
            <button 
                onClick={() => setIsMicOn(!isMicOn)}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isMicOn ? 'bg-white/10 text-white border border-white/20' : 'bg-emergency text-white'}`}
            >
                {isMicOn ? <Mic size={24} /> : <MicOff size={24} />}
            </button>
            <button 
                onClick={() => setIsCameraOn(!isCameraOn)}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isCameraOn ? 'bg-white/10 text-white border border-white/20' : 'bg-emergency text-white'}`}
            >
                {isCameraOn ? <Video size={24} /> : <VideoOff size={24} />}
            </button>

            <button className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all"><Settings size={24} /></button>
            <button className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all"><Maximize2 size={24} /></button>
          </div>
        </div>

        {/* Diagnostic Editor / EHR Input & Chat Panel */}
        <div className="flex flex-col gap-8 h-full overflow-y-auto pr-2 custom-scrollbar">
          
          {/* EHR Inputs */}
          <div className="card !rounded-[3rem] p-8 shadow-2xl shadow-slate-100 border-none bg-white space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-teal/10 text-primary-teal flex items-center justify-center">
                  <Save size={20} />
              </div>
              <div>
                  <h3 className="text-sm font-black text-secondary-navy leading-none">EHR Diagnostic Editor</h3>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Direct Clinical Entry</p>
              </div>
            </div>
            
            <form onSubmit={handleSaveEHR} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Presenting Symptoms</label>
                <textarea 
                  value={symptoms} 
                  onChange={(e) => setSymptoms(e.target.value)}
                  className="input-field py-2 text-xs min-h-[60px]" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Primary Diagnosis</label>
                <input 
                  type="text" 
                  value={diagnosis} 
                  onChange={(e) => setDiagnosis(e.target.value)}
                  className="input-field py-2 text-xs" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Treatment Plan</label>
                <textarea 
                  value={treatment} 
                  onChange={(e) => setTreatment(e.target.value)}
                  className="input-field py-2 text-xs min-h-[60px]" 
                />
              </div>
              <button type="submit" className="btn-primary w-full !py-3 flex items-center justify-center gap-2 text-xs uppercase tracking-widest">
                <Save size={14} /> Update EHR File
              </button>
            </form>
          </div>

          {/* Consultation Chat */}
          <div className="card !rounded-[3rem] flex-1 p-8 flex flex-col shadow-2xl shadow-slate-100 border-none bg-white">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-teal/10 text-primary-teal flex items-center justify-center">
                    <MessageSquare size={20} />
                </div>
                <div>
                    <h3 className="text-sm font-black text-secondary-navy leading-none">Console Chat Feed</h3>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">End-to-end Encrypted</p>
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 custom-scrollbar max-h-[220px]">
              {messages.map(msg => (
                <div key={msg.id} className={`flex flex-col ${msg.isDoctor ? 'items-end' : 'items-start'}`}>
                  <div className={`p-3 rounded-2xl text-[11px] font-bold max-w-[90%] shadow-sm ${
                    msg.isDoctor 
                    ? 'bg-primary-teal text-white rounded-tr-none' 
                    : 'bg-slate-50 text-slate-600 rounded-tl-none border border-slate-100'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[8px] font-black text-slate-300 uppercase mt-1 tracking-widest">{msg.time}</span>
                </div>
              ))}
              <div ref={chatEndRef}></div>
            </div>

            <form onSubmit={handleSendMessage} className="relative group">
              <input 
                type="text" 
                placeholder="Type clinical chat input..." 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full pl-4 pr-12 py-3.5 rounded-[1.5rem] bg-slate-50 text-xs font-bold border-none outline-none focus:ring-4 focus:ring-primary-teal/5 transition-all" 
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-primary-teal text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary-teal/20">
                <Send size={14} />
              </button>
            </form>
          </div>

          {/* Vitals Telemetry */}
          <div className="card !rounded-[2.5rem] p-6 bg-secondary-navy text-white relative overflow-hidden">
            <div className="relative z-10">
                <div className="flex justify-between items-center mb-4">
                    <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">Streaming Vitals</h4>
                    <Heart size={14} className="text-red-500 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-bold text-white/60 uppercase">Pulse Rate</span>
                    <span className="text-xs font-black text-primary-teal">78 BPM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-bold text-white/60 uppercase">Oxygen Saturation</span>
                    <span className="text-xs font-black text-primary-teal">94.0% SpO2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-bold text-white/60 uppercase">Body Temp</span>
                    <span className="text-xs font-black text-amber-400">101.2° F</span>
                  </div>
                </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};

export default DoctorConsultation;
