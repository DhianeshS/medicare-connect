import React, { useState } from 'react';
import { UserPlus, Mail, Lock, User, Phone, LayoutDashboard, AlertCircle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/api';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      await authService.register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone
      });
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center py-12 px-4">
      {/* Brand Header */}
      <div className="mb-10 flex items-center gap-3 animate-fade-in cursor-pointer" onClick={() => navigate('/')}>
        <div className="bg-primary-teal p-2.5 rounded-2xl text-white shadow-lg shadow-primary-teal/20">
          <LayoutDashboard size={32} />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-secondary-navy">
          MediCare <span className="text-primary-teal">Connect</span>
        </h1>
      </div>

      <div className="w-full max-w-3xl bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="bg-primary-teal/5 p-12 text-center border-b border-slate-100">
          <h2 className="text-3xl font-black text-secondary-navy">Join MediCare Connect</h2>
          <p className="text-slate-500 mt-2 font-medium">Create your secure patient account to access our digital health platform</p>
        </div>

        <form onSubmit={handleSubmit} className="p-12">
          {error && (
            <div className="bg-red-50 text-red-600 p-5 rounded-2xl text-sm font-bold border border-red-100 mb-8 flex items-center gap-3 animate-shake">
              <AlertCircle size={20} /> {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase ml-1 mb-1.5 block">First Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text" name="firstName" required
                  value={formData.firstName} onChange={handleChange}
                  className="input-field pl-12"
                  placeholder="John"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase ml-1 mb-1.5 block">Last Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text" name="lastName" required
                  value={formData.lastName} onChange={handleChange}
                  className="input-field pl-12"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase ml-1 mb-1.5 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="email" name="email" required
                  value={formData.email} onChange={handleChange}
                  className="input-field pl-12"
                  placeholder="name@work.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase ml-1 mb-1.5 block">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="tel" name="phone" required
                  value={formData.phone} onChange={handleChange}
                  className="input-field pl-12"
                  placeholder="+91 ..."
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase ml-1 mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="password" name="password" required
                  value={formData.password} onChange={handleChange}
                  className="input-field pl-12"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase ml-1 mb-1.5 block">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="password" name="confirmPassword" required
                  value={formData.confirmPassword} onChange={handleChange}
                  className="input-field pl-12"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div className="mt-12">
            <button 
              type="submit" disabled={isLoading}
              className="w-full bg-primary-teal hover:bg-[#009E86] text-white font-black py-5 rounded-2xl shadow-xl shadow-primary-teal/20 transition-all hover:scale-[1.01] active:scale-[0.99] flex justify-center items-center gap-3 disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <UserPlus size={22} />
                  Initiate Secure Registration
                </>
              )}
            </button>
          </div>
        </form>

        <div className="p-10 bg-slate-50 text-center border-t border-slate-100 flex flex-col items-center gap-4">
          <p className="text-sm font-bold text-slate-500">
            Existing portal member? {' '}
            <Link to="/login" className="text-primary-teal hover:underline font-black">
              Sign In Instead
            </Link>
          </p>
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest max-w-md">
            By registering, you agree to our privacy policy and clinical data terms of service.
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
