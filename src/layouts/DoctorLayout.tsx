import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  Users, Calendar, MessageSquare, FileText, Settings, 
  Menu, X, ChevronRight 
} from 'lucide-react';

const DoctorLayout = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="flex h-screen flex-col">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-30 bg-neutral-900 bg-opacity-50 lg:hidden" 
            onClick={toggleSidebar}
          ></div>
        )}
        
        {/* Sidebar */}
        <aside 
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-md transition-transform duration-300 lg:relative lg:translate-x-0 lg:w-64 xl:w-72 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          style={{ top: '56px' }} // Account for header height on mobile
        >
          <div className="flex h-full flex-col">
            {/* Mobile sidebar header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100 lg:hidden">
              <span className="font-heading font-medium text-primary-800">Menú</span>
              <button onClick={toggleSidebar} className="p-1 text-neutral-500 hover:text-primary-600">
                <X size={20} />
              </button>
            </div>
            
            {/* Doctor profile summary */}
            <div className="flex items-center space-x-3 border-b border-neutral-100 px-4 py-4 lg:py-5">
              <div className="h-10 w-10 lg:h-12 lg:w-12 flex-shrink-0 overflow-hidden rounded-full">
                {user?.profileImage ? (
                  <img src={user.profileImage} alt={user.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-primary-100 text-primary-600">
                    <span className="text-lg lg:text-xl font-medium">
                      {user?.name?.charAt(0) || 'D'}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1 overflow-hidden">
                <h3 className="truncate text-sm lg:text-base font-medium text-neutral-900">{user?.name || 'Doctor'}</h3>
                <p className="truncate text-xs lg:text-sm text-neutral-500">Doctor</p>
              </div>
            </div>
            
            {/* Navigation links */}
            <nav className="flex-1 space-y-1 px-2 py-4 overflow-y-auto">
              <Link
                to="/doctor"
                className="flex items-center rounded-md px-3 py-3 lg:py-2 text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <Users size={20} className="mr-3 text-neutral-400" />
                <span className="text-sm lg:text-base">Dashboard</span>
              </Link>
              <Link
                to="/doctor/patients"
                className="flex items-center rounded-md px-3 py-3 lg:py-2 text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <Users size={20} className="mr-3 text-neutral-400" />
                <span className="text-sm lg:text-base">Pacientes</span>
              </Link>
              <Link
                to="/doctor/appointments"
                className="flex items-center rounded-md px-3 py-3 lg:py-2 text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <Calendar size={20} className="mr-3 text-neutral-400" />
                <span className="text-sm lg:text-base">Citas</span>
              </Link>
              <Link
                to="/doctor/treatments"
                className="flex items-center rounded-md px-3 py-3 lg:py-2 text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <FileText size={20} className="mr-3 text-neutral-400" />
                <span className="text-sm lg:text-base">Tratamientos</span>
              </Link>
              <Link
                to="/doctor/messages"
                className="flex items-center rounded-md px-3 py-3 lg:py-2 text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <MessageSquare size={20} className="mr-3 text-neutral-400" />
                <span className="text-sm lg:text-base">Mensajes</span>
              </Link>
              <Link
                to="/doctor/reports"
                className="flex items-center rounded-md px-3 py-3 lg:py-2 text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <FileText size={20} className="mr-3 text-neutral-400" />
                <span className="text-sm lg:text-base">Informes</span>
              </Link>
              <Link
                to="/doctor/settings"
                className="flex items-center rounded-md px-3 py-3 lg:py-2 text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <Settings size={20} className="mr-3 text-neutral-400" />
                <span className="text-sm lg:text-base">Configuración</span>
              </Link>
            </nav>
          </div>
        </aside>
        
        {/* Mobile sidebar toggle button */}
        <button
          onClick={toggleSidebar}
          className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 text-white shadow-lg hover:bg-primary-600 lg:hidden"
        >
          <Menu size={24} />
        </button>
        
        {/* Main content */}
        <main className="flex-1 overflow-auto bg-neutral-50 p-3 sm:p-4 lg:p-6">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default DoctorLayout;