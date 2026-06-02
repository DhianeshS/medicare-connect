import React, { useState, useEffect, useRef } from 'react';
import { 
  Video, 
  Mic, 
  MicOff,
  VideoOff,
  MessageSquare, 
  Settings, 
  Maximize2,
  Send,
  AlertTriangle,
  Heart
} from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';

const Telemedicine: React.FC = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Dr. Gregory House', text: 'Please stay still while I review your previous lab results.', time: '10:05 AM', isPatient: false },
    { id: 2, sender: 'You', text: 'Sure, I have those ready if you need a clarification.', time: '10:06 AM', isPatient: true },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
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

    const newMessage = {
      id: Date.now(),
      sender: 'You',
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isPatient: true
    };
    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  const handleSOS = () => {
    const confirmSOS = window.confirm("URGENT: Triggering SOS will immediately dispatch emergency services to your registered GPS coordinates and alert the on-call trauma team. Proceed?");
    if (confirmSOS) {
      alert("EMERGENCY SIGNAL DISPATCHED. A trauma coordinator is being patched into this call. Support is on the way. STICK TO THE CALL.");
    }
  };

  return (
    <DashboardLayout title="Clinical Tele-Consultation">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 h-[80vh]">
        
        {/* Video Call Area */}
        <div className="lg:col-span-3 card !bg-slate-900 overflow-hidden relative group !rounded-[3rem] shadow-2xl">
          {/* Main Doctor Feed */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=1200" 
              alt="Doctor Feed" 
              className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
            
            <div className="absolute top-10 left-10 flex items-center gap-4">
                <div className="bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/10 flex items-center gap-3">
                    <div className="w-3 h-3 bg-primary-teal rounded-full animate-pulse"></div>
                    <div>
                        <p className="text-white text-sm font-black tracking-tight leading-none uppercase">Dr. Gregory House</p>
                        <p className="text-white/40 text-[9px] font-black uppercase tracking-widest mt-1">Diagnostics Lead</p>
                    </div>
                </div>
            </div>
          </div>

          {/* Patient Preview */}
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
            <div className="absolute bottom-4 left-4 text-[10px] font-black text-white bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">YOU (PREVIEW)</div>
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
            
            <button 
                onClick={handleSOS}
                className="w-20 h-20 rounded-full bg-emergency text-white flex items-center justify-center shadow-2xl shadow-red-500/40 hover:scale-110 active:scale-90 transition-all group"
            >
                <AlertTriangle size={32} className="group-hover:rotate-12 transition-transform" />
            </button>

            <button className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all"><Settings size={24} /></button>
            <button className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all"><Maximize2 size={24} /></button>
          </div>

          {/* SOS Label */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-black text-red-500 uppercase tracking-[0.5em] animate-pulse">
            Emergency Dispatch System Active
          </div>
        </div>

        {/* Sidebar Controls/Chat/Records */}
        <div className="flex flex-col gap-10">
          <div className="card !rounded-[3rem] flex-1 p-8 flex flex-col shadow-2xl shadow-slate-100 border-none bg-white">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-teal/10 text-primary-teal flex items-center justify-center">
                    <MessageSquare size={20} />
                </div>
                <div>
                    <h3 className="text-sm font-black text-secondary-navy leading-none">Console Chat</h3>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">End-to-end Encrypted</p>
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-6 mb-6 pr-2 custom-scrollbar">
              {messages.map(msg => (
                <div key={msg.id} className={`flex flex-col ${msg.isPatient ? 'items-end' : 'items-start'}`}>
                  <div className={`p-4 rounded-2xl text-xs font-bold max-w-[90%] shadow-sm ${
                    msg.isPatient 
                    ? 'bg-primary-teal text-white rounded-tr-none' 
                    : 'bg-slate-50 text-slate-600 rounded-tl-none border border-slate-100'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[9px] font-black text-slate-300 uppercase mt-2 tracking-widest">{msg.time}</span>
                </div>
              ))}
              <div ref={chatEndRef}></div>
            </div>

            <form onSubmit={handleSendMessage} className="relative group">
              <input 
                type="text" 
                placeholder="Type your clinical input..." 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full pl-6 pr-14 py-5 rounded-[2rem] bg-slate-50 text-xs font-bold border-none outline-none focus:ring-4 focus:ring-primary-teal/5 transition-all" 
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-primary-teal text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary-teal/20">
                <Send size={18} />
              </button>
            </form>
          </div>

          <div className="card !rounded-[3rem] p-8 bg-secondary-navy text-white relative overflow-hidden">
            <div className="relative z-10">
                <div className="flex justify-between items-center mb-6">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Patient Vitals</h4>
                    <Heart size={16} className="text-red-500 animate-pulse" />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-white/60 uppercase">Pulse Rate</span>
                    <span className="text-sm font-black text-primary-teal">72 BPM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-white/60 uppercase">Blood O2</span>
                    <span className="text-sm font-black text-primary-teal">98.5%</span>
                  </div>
                </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Telemedicine;
