
import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import ContactForm from '../components/ContactForm';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Contact = () => {
  return (
    <Layout>
      <div className="space-y-12">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h1 
            className="text-3xl md:text-4xl font-bold mb-4 neon-text"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            تواصل معنا
          </motion.h1>
          <motion.p 
            className="text-foreground/70 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            نحن هنا لمساعدتك. يمكنك التواصل معنا عبر أي من الوسائل التالية أو إرسال رسالة مباشرة وسنرد عليك في أقرب وقت ممكن.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="neon-card p-6 space-y-6">
              <h2 className="text-2xl font-bold mb-4">معلومات الاتصال</h2>
              
              <div className="flex items-start space-x-4 rtl:space-x-reverse">
                <div className="bg-primary/20 p-3 rounded-full">
                  <Phone size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">أرقام الهاتف</h3>
                  <p className="text-foreground/70">+201155343496</p>
                  <p className="text-foreground/70">+201000464429</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 rtl:space-x-reverse">
                <div className="bg-primary/20 p-3 rounded-full">
                  <Mail size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">البريد الإلكتروني</h3>
                  <p className="text-foreground/70">hmdyans47@gmail.com</p>
                  <p className="text-foreground/70">support@jeansstore.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 rtl:space-x-reverse">
                <div className="bg-primary/20 p-3 rounded-full">
                  <MapPin size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">العنوان</h3>
                  <p className="text-foreground/70">
                    الفيوم _ المسله
                  </p>
                </div>
              </div>
            </div>
            
            <div className="neon-card p-6">
              <h2 className="text-2xl font-bold mb-4">تابعنا على وسائل التواصل الاجتماعي</h2>
              <div className="flex space-x-4 rtl:space-x-reverse">
                <a 
                  href="https://www.facebook.com/profile.php?id=100010571233408&locale=ar_AR" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-secondary p-3 rounded-full hover:bg-secondary/70 transition-colors"
                >
                  <Facebook size={24} />
                </a>
                <a 
                  href="https://www.instagram.com/anashamdy9999?igsh=dTd1OGxibDBibG05" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-secondary p-3 rounded-full hover:bg-secondary/70 transition-colors"
                >
                  <Instagram size={24} />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-secondary p-3 rounded-full hover:bg-secondary/70 transition-colors"
                >
                  <Twitter size={24} />
                </a>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-4">أرسل لنا رسالة</h2>
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
