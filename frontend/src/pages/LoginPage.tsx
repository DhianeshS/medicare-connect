import React, { useState } from 'react';
import { Eye, EyeOff, LayoutDashboard, Lock, Mail, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/api';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Demo Mode / Bypass Logic
      if (email === 'admin@medicareconnect.com' && password === 'Admin@123') {
        login({ id: 1, email, firstName: 'Hospital', lastName: 'Controller', role: 'ROLE_ADMIN' }, 'demo-token');
        navigate('/dashboard');
        return;
      }
      
      if (email === 'sarah@medicare.com' && password === 'Doctor@123') {
        login({ id: 2, email, firstName: 'Sarah', lastName: 'Johnson', role: 'ROLE_DOCTOR' }, 'demo-token');
        navigate('/dashboard');
        return;
      }

      if (email === 'ramesh@test.com' && password === 'Patient@123') {
        login({ id: 3, email, firstName: 'Ramesh', lastName: 'Kumar', role: 'ROLE_PATIENT' }, 'demo-token');
        navigate('/dashboard');
        return;
      }

      const { data } = await authService.login({ email, password });
      
      login({
        id: data.id,
        email: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role
      }, data.token);
      
      navigate('/dashboard');
    } catch (err: any) {
      // Final Fallback for demo accounts if API fails
      if (email === 'admin@medicareconnect.com' || email === 'sarah@medicare.com' || email === 'ramesh@test.com') {
         let role: "ROLE_ADMIN" | "ROLE_PATIENT" | "ROLE_DOCTOR" = 'ROLE_PATIENT';
         if (email.includes('admin')) role = 'ROLE_ADMIN';
         else if (email.includes('sarah')) role = 'ROLE_DOCTOR';
         
         const firstName = role === 'ROLE_ADMIN' ? 'Hospital' : (role === 'ROLE_DOCTOR' ? 'Sarah' : 'Ramesh');
         const lastName = role === 'ROLE_ADMIN' ? 'Controller' : (role === 'ROLE_DOCTOR' ? 'Johnson' : 'Kumar');
         
         login({ id: 99, email, firstName, lastName, role }, 'demo-token');
         navigate('/dashboard');
         return;
      }
      setError(err.response?.data?.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center p-4">
      {/* Brand Header */}
      <div className="mb-10 flex items-center gap-3 animate-fade-in cursor-pointer" onClick={() => navigate('/')}>
        <div className="bg-primary-teal p-2.5 rounded-2xl text-white shadow-lg shadow-primary-teal/20">
          <LayoutDashboard size={32} />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-secondary-navy">
          MediCare <span className="text-primary-teal">Connect</span>
        </h1>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-lg bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="bg-primary-teal/5 p-10 text-center border-b border-slate-100">
          <h2 className="text-3xl font-black text-secondary-navy">Welcome Back</h2>
          <p className="text-slate-500 mt-2 font-medium">Access your personalized healthcare portal</p>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-bold border border-red-100 flex items-center gap-2 animate-shake">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase ml-1 mb-1.5 block">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field pl-12"
                placeholder="name@work.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center mb-1.5 ml-1">
              <label className="text-xs font-black text-slate-400 uppercase block">Password</label>
              <button type="button" className="text-xs font-bold text-primary-teal hover:underline">
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type={showPassword ? 'text' : 'password'} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pl-12 pr-14"
                placeholder="••••••••"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary-teal transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-1">
            <input 
              type="checkbox" 
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-5 h-5 rounded-lg border-slate-200 text-primary-teal focus:ring-primary-teal/20 transition-all cursor-pointer"
            />
            <label htmlFor="remember" className="text-sm font-bold text-slate-500 cursor-pointer">Remember my session</label>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-primary-teal hover:bg-[#009E86] text-white font-black py-5 rounded-2xl shadow-xl shadow-primary-teal/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex justify-center items-center disabled:opacity-70 disabled:hover:scale-100"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              'Sign Into Portal'
            )}
          </button>
        </form>

        <div className="p-10 bg-slate-50 text-center border-t border-slate-100 flex flex-col items-center gap-6">
          <div className="mt-8 space-y-3">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center mb-4">Express Demo Access</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button 
                  onClick={() => { setEmail('sarah@medicare.com'); setPassword('Doctor@123'); }}
                  className="w-full py-3 bg-primary-teal/5 text-primary-teal rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary-teal hover:text-white transition-all border border-primary-teal/10"
                >
                  Doctor Bypass
                </button>
                <button 
                  onClick={() => { setEmail('admin@medicareconnect.com'); setPassword('Admin@123'); }}
                  className="w-full py-3 bg-secondary-navy text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-secondary-navy/90 transition-all shadow-lg shadow-secondary-navy/20"
                >
                  Admin Bypass
                </button>
                <button 
                  onClick={() => { setEmail('ramesh@test.com'); setPassword('Patient@123'); }}
                  className="w-full py-3 bg-blue-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20"
                >
                  Patient Bypass
                </button>
            </div>
          </div>

          <p className="text-sm font-bold text-slate-500 leading-none">
            New to the platform? {' '}
            <Link to="/register" className="text-primary-teal hover:underline font-black">
              Create Free Account
            </Link>
          </p>
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            Demo credentials are pre-provisioned for medical staff.
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-12 flex items-center gap-6 text-slate-400 text-xs font-bold uppercase tracking-widest">
         <span>&copy; 2026 MediCare Connect</span>
         <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
         <span className="hover:text-primary-teal cursor-pointer">Security Policy</span>
         <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
         <span className="hover:text-primary-teal cursor-pointer">Support</span>
      </div>
    </div>
  );
};

export default LoginPage;
