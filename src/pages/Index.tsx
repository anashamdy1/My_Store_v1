
import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Phone } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Index = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-12 py-6">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20 z-0"></div>
          <div className="container mx-auto relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-12">
              <motion.div 
                className="flex-1 text-center md:text-right"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 neon-text">
                  أفضل مكان لشراء بناطيل الجينز
                </h1>
                <p className="text-lg md:text-xl text-foreground/80 mb-8">
                  تسوق أحدث موديلات الجينز بأسعار مناسبة وجودة عالية،
                  مع خدمة توصيل سريعة لجميع أنحاء مصر
                </p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                    <Link to="/products" className="flex items-center gap-2">
                      <ShoppingBag size={18} />
                      <span>تسوق الآن</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="neon-button">
                    <Link to="/contact" className="flex items-center gap-2">
                      <Phone size={18} />
                      <span>تواصل معنا</span>
                    </Link>
                  </Button>
                </div>
              </motion.div>
              <motion.div 
                className="flex-1"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1565084888279-aca607ecce0c?auto=format&fit=crop&w=800" 
                  alt="جينز عصري" 
                  className="w-full h-auto rounded-lg shadow-lg border border-white/10" 
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center neon-text">لماذا تختار متجر الجينز؟</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                className="neon-card p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">أسعار تنافسية</h3>
                <p className="text-foreground/70">نقدم أفضل الأسعار في السوق مع ضمان الجودة العالية</p>
              </motion.div>
              
              <motion.div 
                className="neon-card p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">توصيل سريع</h3>
                <p className="text-foreground/70">توصيل إلى جميع محافظات مصر خلال 2-5 أيام عمل</p>
              </motion.div>
              
              <motion.div 
                className="neon-card p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">جودة ممتازة</h3>
                <p className="text-foreground/70">منتجاتنا مصنوعة من أفضل الخامات لضمان الراحة والمتانة</p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12">
          <div className="container mx-auto">
            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg p-8 md:p-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4 neon-text">ابدأ التسوق الآن</h2>
                <p className="text-lg text-foreground/80 mb-6 max-w-2xl mx-auto">
                  اكتشف تشكيلتنا المميزة من بناطيل الجينز العصرية. تصاميم متنوعة وأحجام متعددة تناسب الجميع.
                </p>
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link to="/products" className="flex items-center gap-2">
                    <ShoppingBag size={18} />
                    <span>عرض المنتجات</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
