import React from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare, 
  Send, 
  Globe
} from 'lucide-react';

const ContactPage: React.FC = () => {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-secondary-navy mb-4">Get In Touch</h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Have questions about our platform or need technical assistance? Our team is here to support you 24/7.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-20 px-4">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="card p-8">
              <h3 className="text-xl font-bold text-secondary-navy mb-8">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-blue-50 p-3 rounded-2xl text-primary-blue h-fit">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Email Us</p>
                    <p className="text-sm font-bold text-secondary-navy">support@medicareconnect.com</p>
                    <p className="text-xs text-slate-500">Fast response within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-green-50 p-3 rounded-2xl text-success h-fit">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Call Us</p>
                    <p className="text-sm font-bold text-secondary-navy">+1 (800) 555-0199</p>
                    <p className="text-xs text-slate-500">Mon-Fri from 8am to 6pm</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-amber-50 p-3 rounded-2xl text-warning h-fit">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Visit Us</p>
                    <p className="text-sm font-bold text-secondary-navy">123 Health Plaza, medical District</p>
                    <p className="text-xs text-slate-500">San Francisco, CA 94103</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-8 bg-secondary-navy text-white">
              <h3 className="text-xl font-bold mb-6">Social Connect</h3>
              <div className="flex gap-4">
                <button className="bg-white/10 p-3 rounded-xl hover:bg-primary-blue transition-all"><Globe size={20} /></button>
                <button className="bg-white/10 p-3 rounded-xl hover:bg-primary-blue transition-all"><Globe size={20} /></button>
                <button className="bg-white/10 p-3 rounded-xl hover:bg-primary-blue transition-all"><Globe size={20} /></button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="card p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-blue-50 p-2 rounded-lg text-primary-blue">
                  <MessageSquare size={24} />
                </div>
                <h3 className="text-2xl font-bold text-secondary-navy">Send us a message</h3>
              </div>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                    <input type="text" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                    <input type="email" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-all" placeholder="john@example.com" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Subject</label>
                  <select className="w-full px-4 py-3.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-all appearance-none bg-white">
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Patient Service</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Message</label>
                  <textarea rows={6} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-all resize-none" placeholder="Tell us more about how we can help..."></textarea>
                </div>

                <button type="submit" className="w-full btn-primary py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30">
                  <Send size={18} /> Send Message
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;
