import React from 'react';
import { 
  Users, 
  Plus, 
  ChevronRight, 
  Heart, 
  Shield, 
  MoreVertical
} from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';

const FamilyRecords: React.FC = () => {
  const family = [
    { name: 'Robert Jenkins', relation: 'Father', age: 65, bg: 'O+', lastUpdate: '2 days ago', status: 'Healthy' },
    { name: 'Sarah Jenkins', relation: 'Spouse', age: 34, bg: 'A+', lastUpdate: '14 mins ago', status: 'Critical' },
    { name: 'Emily Jenkins', relation: 'Daughter', age: 8, bg: 'O+', lastUpdate: '1 month ago', status: 'Healthy' },
  ];

  return (
    <DashboardLayout title="Family Health Management">
      <div className="space-y-8">
        
        {/* Intro Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h2 className="text-2xl font-bold text-secondary-navy">Your Family Circle</h2>
            <p className="text-sm text-slate-500">Manage healthcare records and emergency settings for your loved ones.</p>
          </div>
          <button className="btn-primary py-3 px-6 rounded-xl flex items-center gap-2 shadow-lg shadow-blue-500/20">
            <Plus size={18} /> Add Family Member
          </button>
        </div>

        {/* Family Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {family.map((member, i) => (
            <div key={i} className={`card p-6 border-none shadow-xl transition-all hover:scale-[1.02] cursor-pointer relative overflow-hidden ${
              member.status === 'Critical' ? 'ring-2 ring-emergency/50 bg-red-50/30' : 'bg-white'
            }`}>
              {member.status === 'Critical' && (
                <div className="absolute top-0 right-0 bg-emergency text-white px-3 py-1 text-[10px] font-bold rounded-bl-xl animate-pulse">
                  CRITICAL ACTION REQUIRED
                </div>
              )}
              
              <div className="flex justify-between items-start mb-6">
                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-primary-blue">
                  <Users size={32} />
                </div>
                <button className="text-slate-300 hover:text-slate-500 p-1"><MoreVertical size={20} /></button>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-secondary-navy mb-1">{member.name}</h3>
                <div className="flex items-center gap-2 text-xs font-bold text-primary-blue bg-blue-50 w-fit px-2 py-1 rounded-md">
                  {member.relation}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Age</p>
                  <p className="text-sm font-bold text-secondary-navy">{member.age} Years</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Blood Group</p>
                  <p className="text-sm font-bold text-secondary-navy">{member.bg}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${member.status === 'Healthy' ? 'bg-success' : 'bg-emergency'}`}></div>
                  <p className="text-xs font-medium text-slate-500">{member.lastUpdate}</p>
                </div>
                <button className="text-primary-blue font-bold text-xs flex items-center gap-1 hover:gap-2 transition-all">
                  View Records <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}

          {/* Add Member Slot */}
          <div className="card p-6 border-2 border-dashed border-slate-200 bg-slate-50/50 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-slate-50 transition-all">
            <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 mb-4">
              <Plus size={24} />
            </div>
            <h4 className="text-sm font-bold text-slate-600">Add New Member</h4>
            <p className="text-[10px] text-slate-400 mt-1">Include family medical history</p>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
          <div className="card p-8 flex gap-6 items-start bg-gradient-to-br from-white to-blue-50">
            <div className="bg-primary-blue rounded-2xl p-3 text-white">
              <Heart size={24} />
            </div>
            <div>
              <h4 className="font-bold text-secondary-navy mb-2">Linked Emergencies</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Add family members to your emergency contact circle. In case of an SOS, they will be notified instantly with your location.
              </p>
            </div>
          </div>
          <div className="card p-8 flex gap-6 items-start bg-gradient-to-br from-white to-green-50">
            <div className="bg-success rounded-2xl p-3 text-white">
              <Shield size={24} />
            </div>
            <div>
              <h4 className="font-bold text-secondary-navy mb-2">Proxy Management</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Manage appointments and download prescriptions for minors or elderly family members who cannot use the app independently.
              </p>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default FamilyRecords;
