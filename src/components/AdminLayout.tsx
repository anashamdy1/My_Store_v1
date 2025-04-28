
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Package, ShoppingBag, Users, LogOut } from 'lucide-react';
import supabase from '../lib/supabaseClient';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate('/admin/login');
      }
    };
    
    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    {
      name: 'إدارة المنتجات',
      path: '/admin/products',
      icon: <Package size={20} />,
    },
    {
      name: 'إدارة الطلبات',
      path: '/admin/orders',
      icon: <ShoppingBag size={20} />,
    },
    {
      name: 'إدارة العملاء',
      path: '/admin/customers',
      icon: <Users size={20} />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile header */}
      <header className="md:hidden border-b border-border/40 bg-sidebar sticky top-0 z-50">
        <div className="px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold neon-text">لوحة التحكم</h1>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md hover:bg-sidebar-accent"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile sidebar */}
        {isMobileMenuOpen && (
          <nav className="bg-sidebar border-b border-border/40 animate-fadeIn">
            <div className="p-4 flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-md transition-all duration-300 flex items-center gap-3 ${
                    isActive(item.path)
                      ? 'bg-sidebar-accent text-white text-shadow-neon-white'
                      : 'hover:bg-sidebar-accent/50'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="px-4 py-3 rounded-md text-red-400 hover:bg-sidebar-accent/50 transition-all duration-300 flex items-center gap-3 w-full text-right"
              >
                <LogOut size={20} />
                <span>تسجيل الخروج</span>
              </button>
            </div>
          </nav>
        )}
      </header>

      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:block bg-sidebar border-l border-border/40 transition-all duration-300 sticky top-0 h-screen ${
          isSidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="p-4 flex justify-between items-center">
          <h1 className={`font-bold neon-text transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
            لوحة التحكم
          </h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md hover:bg-sidebar-accent"
          >
            {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-md transition-all duration-300 ${
                    isActive(item.path)
                      ? 'bg-sidebar-accent text-white text-shadow-neon-white'
                      : 'hover:bg-sidebar-accent/50'
                  }`}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  <span
                    className={`mr-3 transition-opacity ${
                      isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden'
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-3 rounded-md text-red-400 hover:bg-sidebar-accent/50 transition-all duration-300"
              >
                <span className="flex-shrink-0">
                  <LogOut size={20} />
                </span>
                <span
                  className={`mr-3 transition-opacity ${
                    isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden'
                  }`}
                >
                  تسجيل الخروج
                </span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}
