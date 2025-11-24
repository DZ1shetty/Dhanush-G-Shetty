import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, User, MessageSquare, FileText, Download, Eye, EyeOff, CheckCircle, Loader2, Sparkles, Terminal, Shield, Wifi } from 'lucide-react';

const InputField = ({ label, name, type = "text", value, onChange, error, icon: Icon, placeholder }) => (
  <div className="relative mb-6 group">
    <label className="text-xs font-bold text-cyan-400 mb-2 ml-1 flex items-center gap-2 uppercase tracking-wider">
      {Icon && <Icon size={12} />}
      {label}
    </label>
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-slate-900/50 border ${error ? 'border-red-500/50' : 'border-white/10'} rounded-lg px-5 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300 group-hover:border-white/20 font-mono text-sm`}
      />
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500/50 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500/50 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500/50 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500/50 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
    {error && <p className="text-red-400 text-xs mt-1 ml-1 font-mono">{error}</p>}
  </div>
);

const TextAreaField = ({ label, name, value, onChange, error, icon: Icon, placeholder }) => (
  <div className="relative mb-6 group">
    <label className="text-xs font-bold text-cyan-400 mb-2 ml-1 flex items-center gap-2 uppercase tracking-wider">
      {Icon && <Icon size={12} />}
      {label}
    </label>
    <div className="relative">
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows="5"
        className={`w-full bg-slate-900/50 border ${error ? 'border-red-500/50' : 'border-white/10'} rounded-lg px-5 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300 resize-none group-hover:border-white/20 font-mono text-sm`}
      />
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500/50 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500/50 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500/50 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500/50 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
    {error && <p className="text-red-400 text-xs mt-1 ml-1 font-mono">{error}</p>}
  </div>
);

const Contact = ({ smoothMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResume, setShowResume] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'NAME_REQUIRED';
    if (!formData.email.trim()) newErrors.email = 'EMAIL_REQUIRED';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'INVALID_FORMAT';
    if (!formData.subject.trim()) newErrors.subject = 'SUBJECT_REQUIRED';
    if (!formData.message.trim()) newErrors.message = 'MESSAGE_REQUIRED';
    else if (formData.message.trim().length < 10) newErrors.message = 'MIN_LENGTH_10';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch("https://formsubmit.co/ajax/dhanushgshetty666@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
      // Fallback for error handling if needed
    } finally {
      setIsSubmitting(false);
    }
  };

  const MotionDiv = smoothMode ? 'div' : motion.div;
  const motionProps = (props) => smoothMode ? {} : props;

  return (
    <div className="max-w-7xl mx-auto px-4 relative">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Resume Section - Cyber Terminal Style */}
        <MotionDiv
          {...motionProps({
            initial: { opacity: 0, x: -50 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            transition: { duration: 0.6 }
          })}
          className="relative group"
        >
          <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/10 p-1 overflow-hidden">
            {/* Terminal Header */}
            <div className="bg-white/5 px-4 py-2 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="text-xs font-mono text-slate-500 flex items-center gap-2">
                <Shield size={10} />
                SECURE_ACCESS_V1.0
              </div>
            </div>

            <div className="p-8">
              <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                  <div className="relative p-4 bg-black/50 rounded-xl border border-cyan-500/30 text-cyan-400">
                    <Terminal size={32} />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white font-mono tracking-tight">RESUME_DATA</h3>
                  <p className="text-slate-400 text-sm font-mono mt-1 text-cyan-300/70">
                    &gt; Access professional credentials
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <a
                  href="/Resume.pdf"
                  download="Resume.pdf"
                  className="relative overflow-hidden flex items-center justify-center gap-3 w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold font-mono tracking-wide transition-all duration-300 group/btn"
                >
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                  <Download className="relative z-10 group-hover/btn:animate-bounce" size={18} />
                  <span className="relative z-10">INITIATE_DOWNLOAD</span>
                </a>
                
                <button
                  onClick={() => setShowResume(!showResume)}
                  className="flex items-center justify-center gap-3 w-full py-4 bg-black/50 hover:bg-white/5 border border-white/10 hover:border-cyan-500/30 text-slate-300 hover:text-white rounded-lg font-mono font-medium transition-all duration-300"
                >
                  {showResume ? <EyeOff size={18} /> : <Eye size={18} />}
                  {showResume ? 'TERMINATE_PREVIEW' : 'EXECUTE_PREVIEW'}
                </button>
              </div>

              {/* Resume Preview Area */}
              <AnimatePresence>
                {showResume && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: '500px', marginTop: 24 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    className="relative rounded-lg overflow-hidden border border-white/10 bg-black"
                  >
                    {/* Scanline Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none z-10 opacity-20" />
                    <iframe
                      src="/Resume.pdf#toolbar=0"
                      className="w-full h-full relative z-0"
                      title="Resume Preview"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Status Bar */}
          <div className="mt-6 flex items-center justify-between px-4 py-3 bg-black/40 rounded-lg border border-white/5 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              SYSTEM_ONLINE
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-xs font-mono">
              <Wifi size={12} />
              ENCRYPTED_CONNECTION
            </div>
          </div>
        </MotionDiv>

        {/* Contact Form Section */}
        <MotionDiv
          {...motionProps({
            initial: { opacity: 0, x: 50 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            transition: { duration: 0.6, delay: 0.2 }
          })}
          className="relative"
        >
          <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl overflow-hidden">
            
            <div className="relative z-10">
              <div className="mb-8 border-b border-white/5 pb-6">
                <h3 className="text-3xl font-bold text-white mb-2 font-mono tracking-tight">
                  <span className="text-cyan-500">&lt;</span>
                  Contact_Me
                  <span className="text-cyan-500">/&gt;</span>
                </h3>
                <p className="text-slate-400 text-sm">Initialize communication protocol.</p>
              </div>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <MotionDiv
                    {...motionProps({
                      initial: { opacity: 0, scale: 0.9 },
                      animate: { opacity: 1, scale: 1 },
                      exit: { opacity: 0, scale: 0.9 }
                    })}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="relative mb-6">
                      <div className="relative w-24 h-24 bg-black/50 border border-green-500/50 text-green-400 rounded-full flex items-center justify-center">
                        <CheckCircle size={48} />
                      </div>
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2 font-mono">TRANSMISSION_SENT</h4>
                    <p className="text-slate-400 font-mono text-sm">
                      &gt; Message successfully queued for delivery.
                    </p>
                  </MotionDiv>
                ) : (
                  smoothMode ? (
                    <form onSubmit={handleSubmit}>
                      <div className="grid md:grid-cols-2 gap-4">
                        <InputField
                          label="IDENTIFIER"
                          name="name"
                          icon={User}
                          value={formData.name}
                          onChange={handleChange}
                          error={errors.name}
                          placeholder="John Doe"
                        />
                        <InputField
                          label="CONTACT_LINK"
                          name="email"
                          type="email"
                          icon={Mail}
                          value={formData.email}
                          onChange={handleChange}
                          error={errors.email}
                          placeholder="john@example.com"
                        />
                      </div>
                      
                      <InputField
                        label="SUBJECT_LINE"
                        name="subject"
                        icon={MessageSquare}
                        value={formData.subject}
                        onChange={handleChange}
                        error={errors.subject}
                        placeholder="Project Inquiry"
                      />
                      
                      <TextAreaField
                        label="DATA_PACKET"
                        name="message"
                        icon={FileText}
                        value={formData.message}
                        onChange={handleChange}
                        error={errors.message}
                        placeholder="Input message content..."
                      />

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-white text-black hover:bg-cyan-400 hover:text-black rounded-lg font-bold font-mono tracking-wider shadow-lg transition-all duration-300 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="animate-spin" size={20} />
                            TRANSMITTING...
                          </>
                        ) : (
                          <>
                            <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                            SEND_TRANSMISSION
                          </>
                        )}
                      </button>
                    </form>
                  ) : (
                    <motion.form
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                    >
                      <div className="grid md:grid-cols-2 gap-4">
                        <InputField
                          label="IDENTIFIER"
                          name="name"
                          icon={User}
                          value={formData.name}
                          onChange={handleChange}
                          error={errors.name}
                          placeholder="John Doe"
                        />
                        <InputField
                          label="CONTACT_LINK"
                          name="email"
                          type="email"
                          icon={Mail}
                          value={formData.email}
                          onChange={handleChange}
                          error={errors.email}
                          placeholder="john@example.com"
                        />
                      </div>
                      
                      <InputField
                        label="SUBJECT_LINE"
                        name="subject"
                        icon={MessageSquare}
                        value={formData.subject}
                        onChange={handleChange}
                        error={errors.subject}
                        placeholder="Project Inquiry"
                      />
                      
                      <TextAreaField
                        label="DATA_PACKET"
                        name="message"
                        icon={FileText}
                        value={formData.message}
                        onChange={handleChange}
                        error={errors.message}
                        placeholder="Input message content..."
                      />

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-white text-black hover:bg-cyan-400 hover:text-black rounded-lg font-bold font-mono tracking-wider shadow-lg transition-all duration-300 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="animate-spin" size={20} />
                            TRANSMITTING...
                          </>
                        ) : (
                          <>
                            <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                            SEND_TRANSMISSION
                          </>
                        )}
                      </button>
                    </motion.form>
                  )
                )}
              </AnimatePresence>
            </div>
          </div>
        </MotionDiv>
      </div>
    </div>
  );
};

export default Contact;
