import React, { useState, useEffect } from 'react';
import { Search, Filter, Activity, Calendar, User, Eye } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';

const AuditLogs: React.FC = () => {
    const [logs, setLogs] = useState<any[]>([]);

    useEffect(() => {
        // Mocking logs for now as per design
        setLogs([
            { id: 1, action: 'USER_LOGIN', user: 'admin@medicareconnect.com', entity: 'Auth', timestamp: '2026-06-01 10:15:22', ip: '192.168.1.1' },
            { id: 2, action: 'DOCTOR_ADDED', user: 'admin@medicareconnect.com', entity: 'Doctor', timestamp: '2026-06-01 11:20:05', ip: '192.168.1.1' },
            { id: 3, action: 'APPOINTMENT_BOOKED', user: 'patient@example.com', entity: 'Appointment', timestamp: '2026-06-01 12:45:10', ip: '192.168.1.45' },
        ]);
    }, []);

    return (
        <DashboardLayout title="System Activity Audit">
            <div className="space-y-8">
                
                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="card !p-8 border-none bg-primary-teal text-white !rounded-[2rem]">
                        <p className="text-white/70 text-xs font-black uppercase tracking-widest mb-1">Total Actions Logged</p>
                        <h3 className="text-4xl font-black">12.4k+</h3>
                        <div className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase">
                            <Activity size={14} /> High Security Monitoring Active
                        </div>
                    </div>
                    <div className="card !p-8 border-none bg-slate-900 text-white !rounded-[2rem]">
                        <p className="text-white/70 text-xs font-black uppercase tracking-widest mb-1">Active Admin Sessions</p>
                        <h3 className="text-4xl font-black">04</h3>
                        <div className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase text-emerald-400">
                             Secure • IP-Encrypted
                        </div>
                    </div>
                </div>

                <div className="card !rounded-[2.5rem] p-0 border-none shadow-xl shadow-slate-100 overflow-hidden">
                    <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-50/30">
                        <h3 className="text-xl font-black text-secondary-navy">Live Audit Stream</h3>
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input type="text" placeholder="Filter by user or action..." className="input-field pl-10 py-2.5 !rounded-xl" />
                            </div>
                            <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-primary-teal transition-all">
                                <Filter size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50">
                                <tr>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Timestamp</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Initiator</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Action Type</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Entity</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">IP Address</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Details</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {logs.map(log => (
                                    <tr key={log.id} className="hover:bg-slate-50/30 transition-colors">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2 text-slate-400 font-bold text-xs">
                                                <Calendar size={14} /> {log.timestamp}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                                    <User size={14} />
                                                </div>
                                                <span className="text-sm font-bold text-secondary-navy">{log.user}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="px-3 py-1 rounded-lg bg-primary-teal/10 text-primary-teal text-[10px] font-black uppercase tracking-widest">
                                                {log.action}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-sm font-bold text-slate-600">{log.entity}</td>
                                        <td className="px-8 py-5 text-sm font-mono text-slate-400">{log.ip}</td>
                                        <td className="px-8 py-5">
                                            <button className="p-2 text-slate-300 hover:text-primary-teal hover:bg-white rounded-lg transition-all shadow-sm">
                                                <Eye size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
};

export default AuditLogs;
