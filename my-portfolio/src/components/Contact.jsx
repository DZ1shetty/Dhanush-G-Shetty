import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, User, MessageSquare, FileText, Download, Eye, EyeOff, CheckCircle, Loader2 } from 'lucide-react';

const InputField = ({ label, name, type = "text", value, onChange, error, icon: Icon, placeholder }) => (
  <div className="relative mb-5 group">
    <label className="text-[10px] font-mono text-slate-400 mb-2 ml-0.5 flex items-center gap-1.5 uppercase tracking-widest">
      {Icon && <Icon size={10} className="text-slate-400" />}
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full bg-transparent border-b ${
        error ? 'border-red-500/60' : 'border-white/20'
      } py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/70 transition-colors duration-200 font-mono text-sm`}
    />
    {error && <p className="text-red-400 text-[10px] mt-1 font-mono">{error}</p>}
  </div>
);

const TextAreaField = ({ label, name, value, onChange, error, icon: Icon, placeholder }) => (
  <div className="relative mb-5 group">
    <label className="text-[10px] font-mono text-slate-400 mb-2 ml-0.5 flex items-center gap-1.5 uppercase tracking-widest">
      {Icon && <Icon size={10} className="text-slate-400" />}
      {label}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows="4"
      className={`w-full bg-transparent border-b ${
        error ? 'border-red-500/60' : 'border-white/20'
      } py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/70 transition-colors duration-200 resize-none font-mono text-sm`}
    />
    {error && <p className="text-red-400 text-[10px] mt-1 font-mono">{error}</p>}
  </div>
);

const Contact = () => {
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-16 items-start">

        {/* Resume Panel */}
        <div className="space-y-6">
          {/* Section label */}
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-slate-400 select-none">
            <span className="h-[1px] w-4 bg-white/20" />
            RESUME
          </div>

          <div>
            <h3 className="text-xl font-mono font-semibold text-white mb-1">resume_data.pdf</h3>
            <p className="text-slate-400 text-xs font-mono">Professional credentials &amp; experience</p>
          </div>

          <div className="space-y-3">
            <a
              href="/Resume.pdf"
              download="Resume.pdf"
              className="flex items-center justify-between w-full py-3 px-4 border border-white/20 hover:border-cyan-400/50 rounded-lg text-slate-200 hover:text-cyan-400 font-mono text-xs tracking-wider transition-all duration-200 group"
            >
              <span className="flex items-center gap-2">
                <Download className="w-3.5 h-3.5" />
                DOWNLOAD_PDF
              </span>
              <span className="text-slate-400 group-hover:text-cyan-400 transition-colors">→</span>
            </a>

            <button
              onClick={() => setShowResume(!showResume)}
              className="flex items-center justify-between w-full py-3 px-4 border border-white/10 hover:border-white/25 rounded-lg text-slate-300 hover:text-slate-100 font-mono text-xs tracking-wider transition-all duration-200 group"
            >
              <span className="flex items-center gap-2">
                {showResume ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                {showResume ? 'CLOSE_PREVIEW' : 'PREVIEW_RESUME'}
              </span>
              <span className="text-slate-500 group-hover:text-slate-300 transition-colors">{showResume ? '−' : '+'}</span>
            </button>
          </div>

          {/* Resume Preview */}
          <AnimatePresence>
            {showResume && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: '400px' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="relative rounded-lg overflow-hidden border border-white/15 bg-black"
              >
                <iframe
                  src="/Resume.pdf#toolbar=0"
                  className="w-full h-full"
                  title="Resume Preview"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Status */}
          <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 pt-2 border-t border-white/10 select-none">
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            AVAILABLE_FOR_HIRE
          </div>
        </div>

        {/* Contact Form */}
        <div className="space-y-6">
          {/* Section label */}
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-slate-400 select-none">
            <span className="h-[1px] w-4 bg-white/20" />
            CONTACT
          </div>

          <div>
            <h3 className="text-xl font-mono font-semibold text-white mb-1">send_message.sh</h3>
            <p className="text-slate-400 text-xs font-mono">Initialize communication</p>
          </div>

          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="py-12 flex flex-col items-center gap-4 text-center"
              >
                <CheckCircle className="w-8 h-8 text-emerald-400" />
                <div>
                  <p className="font-mono text-sm text-white">TRANSMISSION_SENT</p>
                  <p className="font-mono text-[10px] text-slate-400 mt-1">&gt; Message queued for delivery</p>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-1"
              >
                <div className="grid sm:grid-cols-2 gap-x-6">
                  <InputField
                    label="NAME"
                    name="name"
                    icon={User}
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    placeholder="John Doe"
                  />
                  <InputField
                    label="EMAIL"
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
                  label="SUBJECT"
                  name="subject"
                  icon={MessageSquare}
                  value={formData.subject}
                  onChange={handleChange}
                  error={errors.subject}
                  placeholder="Project inquiry..."
                />

                <TextAreaField
                  label="MESSAGE"
                  name="message"
                  icon={FileText}
                  value={formData.message}
                  onChange={handleChange}
                  error={errors.message}
                  placeholder="Type your message here..."
                />

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-cyan-400/50 text-slate-200 hover:text-cyan-400 rounded-lg font-mono text-xs tracking-wider transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed group"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin w-3.5 h-3.5" />
                        TRANSMITTING...
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        SEND_MESSAGE
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Contact;
