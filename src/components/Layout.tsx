import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Home, Phone } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl md:text-3xl font-bold neon-text">Jeans Zone</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 rtl:space-x-reverse">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-md transition-all duration-300 flex items-center gap-2 ${isActive('/') ? 'bg-accent text-white text-shadow-neon-white' : 'hover:bg-accent/50'}`}
            >
              <Home size={18} />
              <span>الرئيسية</span>
            </Link>
            <Link 
              to="/products" 
              className={`px-4 py-2 rounded-md transition-all duration-300 flex items-center gap-2 ${isActive('/products') ? 'bg-accent text-white text-shadow-neon-white' : 'hover:bg-accent/50'}`}
            >
              <ShoppingBag size={18} />
              <span>المنتجات</span>
            </Link>
            <Link 
              to="/contact" 
              className={`px-4 py-2 rounded-md transition-all duration-300 flex items-center gap-2 ${isActive('/contact') ? 'bg-accent text-white text-shadow-neon-white' : 'hover:bg-accent/50'}`}
            >
              <Phone size={18} />
              <span>تواصل معنا</span>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-accent/50"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden bg-background border-b border-border/40 animate-fadeIn">
            <div className="container mx-auto px-4 py-2 flex flex-col">
              <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 rounded-md transition-all duration-300 flex items-center gap-2 ${isActive('/') ? 'bg-accent text-white text-shadow-neon-white' : 'hover:bg-accent/50'}`}
              >
                <Home size={18} />
                <span>الرئيسية</span>
              </Link>
              <Link 
                to="/products" 
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 rounded-md transition-all duration-300 flex items-center gap-2 ${isActive('/products') ? 'bg-accent text-white text-shadow-neon-white' : 'hover:bg-accent/50'}`}
              >
                <ShoppingBag size={18} />
                <span>المنتجات</span>
              </Link>
              <Link 
                to="/contact" 
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 rounded-md transition-all duration-300 flex items-center gap-2 ${isActive('/contact') ? 'bg-accent text-white text-shadow-neon-white' : 'hover:bg-accent/50'}`}
              >
                <Phone size={18} />
                <span>تواصل معنا</span>
              </Link>
            </div>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold neon-text">متجر الجينز</h2>
              <p className="text-sm text-foreground/70">أفضل متجر لبيع الجينز في مصر</p>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 rtl:space-x-reverse text-sm">
              <Link to="/" className="hover:text-shadow-neon-white py-1">الرئيسية</Link>
              <Link to="/products" className="hover:text-shadow-neon-white py-1">المنتجات</Link>
              <Link to="/contact" className="hover:text-shadow-neon-white py-1">تواصل معنا</Link>
            </div>
          </div>
          <div className="mt-6 text-center text-sm text-foreground/60">
            &copy; {new Date().getFullYear()} متجر الجينز - جميع الحقوق محفوظة
          </div>
        </div>
      </footer>
    </div>
  );
}
