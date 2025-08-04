import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Menu, X, Bell, User, LogOut, Settings, Heart
} from 'lucide-react';
import Button from './ui/Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-accent-500" />
              <span className="text-lg sm:text-xl font-heading font-bold text-primary-800">GyneCare</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex items-center space-x-6 xl:space-x-8">
              {isAuthenticated ? (
                <>
                  <li>
                    <Link 
                      to={user?.role === 'doctor' ? '/doctor' : '/patient'} 
                      className="text-neutral-700 hover:text-primary-600 transition text-sm xl:text-base"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to={user?.role === 'doctor' ? '/doctor/appointments' : '/patient/appointments'} 
                      className="text-neutral-700 hover:text-primary-600 transition text-sm xl:text-base"
                    >
                      Citas
                    </Link>
                  </li>
                  {user?.role === 'doctor' && (
                    <li>
                      <Link to="/doctor/treatments" className="text-neutral-700 hover:text-primary-600 transition text-sm xl:text-base">
                        Tratamientos
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link 
                      to={user?.role === 'doctor' ? '/doctor/messages' : '/patient/messages'} 
                      className="text-neutral-700 hover:text-primary-600 transition text-sm xl:text-base"
                    >
                      Mensajes
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/" className="text-neutral-700 hover:text-primary-600 transition text-sm xl:text-base">
                      Inicio
                    </Link>
                  </li>
                  <li>
                    <Link to="/#features" className="text-neutral-700 hover:text-primary-600 transition text-sm xl:text-base">
                      Características
                    </Link>
                  </li>
                  <li>
                    <Link to="/#about" className="text-neutral-700 hover:text-primary-600 transition text-sm xl:text-base">
                      Acerca de
                    </Link>
                  </li>
                  <li>
                    <Link to="/#contact" className="text-neutral-700 hover:text-primary-600 transition text-sm xl:text-base">
                      Contacto
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
          
          {/* User actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => alert('Notificaciones - Funcionalidad en desarrollo')}
                  className="relative p-1 sm:p-2 text-neutral-500 hover:text-primary-600 transition"
                >
                  <Bell size={18} className="sm:w-5 sm:h-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-accent-500"></span>
                </button>
                
                <div className="relative group">
                  <button className="flex items-center space-x-2">
                    <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full overflow-hidden">
                      {user?.profileImage ? (
                        <img 
                          src={user.profileImage} 
                          alt={user.name} 
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-primary-100 flex items-center justify-center text-primary-600">
                          <User size={16} className="sm:w-4 sm:h-4" />
                        </div>
                      )}
                    </div>
                  </button>
                  
                  <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-1">
                      <Link
                        to={user?.role === 'doctor' ? '/doctor' : '/patient/profile'}
                        className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 transition"
                      >
                        <User size={16} className="mr-2" />
                        {user?.role === 'doctor' ? 'Dashboard' : 'Perfil'}
                      </Link>
                      <Link
                        to={user?.role === 'doctor' ? '/doctor/settings' : '/patient/settings'}
                        className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 transition"
                      >
                        <Settings size={16} className="mr-2" />
                        Configuración
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="flex w-full items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 transition"
                      >
                        <LogOut size={16} className="mr-2" />
                        Cerrar Sesión
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="hidden sm:block">
                  <Button variant="outline" size="sm">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link to="/register" className="hidden sm:block">
                  <Button variant="primary" size="sm">
                    Registrarse
                  </Button>
                </Link>
              </>
            )}
            
            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center rounded-md p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 focus:outline-none"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 bg-white">
          <div className="space-y-1 px-4 pb-4 pt-2">
            {isAuthenticated ? (
              <>
                <Link 
                  to={user?.role === 'doctor' ? '/doctor' : '/patient'} 
                  className="block py-3 text-base font-medium text-neutral-700 hover:text-primary-600 border-b border-neutral-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to={user?.role === 'doctor' ? '/doctor/appointments' : '/patient/appointments'} 
                  className="block py-3 text-base font-medium text-neutral-700 hover:text-primary-600 border-b border-neutral-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Citas
                </Link>
                {user?.role === 'doctor' && (
                  <Link
                    to="/doctor/treatments"
                    className="block py-3 text-base font-medium text-neutral-700 hover:text-primary-600 border-b border-neutral-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Tratamientos
                  </Link>
                )}
                <Link 
                  to={user?.role === 'doctor' ? '/doctor/messages' : '/patient/messages'} 
                  className="block py-3 text-base font-medium text-neutral-700 hover:text-primary-600 border-b border-neutral-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mensajes
                </Link>
                <Link 
                  to={user?.role === 'doctor' ? '/doctor/treatments' : '/patient/treatments'} 
                  className="block py-3 text-base font-medium text-neutral-700 hover:text-primary-600 border-b border-neutral-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tratamientos
                </Link>
                <Link
                  to={user?.role === 'doctor' ? '/doctor/settings' : '/patient/profile'}
                  className="block py-3 text-base font-medium text-neutral-700 hover:text-primary-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mi Perfil
                </Link>
                <Link
                  to={user?.role === 'doctor' ? '/doctor/settings' : '/patient/settings'}
                  className="block py-3 text-base font-medium text-neutral-700 hover:text-primary-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Configuración
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/" 
                  className="block py-3 text-base font-medium text-neutral-700 hover:text-primary-600 border-b border-neutral-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inicio
                </Link>
                <Link
                  to="/#features"
                  className="block py-3 text-base font-medium text-neutral-700 hover:text-primary-600 border-b border-neutral-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Características
                </Link>
                <Link
                  to="/#about"
                  className="block py-3 text-base font-medium text-neutral-700 hover:text-primary-600 border-b border-neutral-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Acerca de
                </Link>
                <Link
                  to="/#contact"
                  className="block py-3 text-base font-medium text-neutral-700 hover:text-primary-600 border-b border-neutral-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contacto
                </Link>
                <div className="pt-4 space-y-2">
                  <Link 
                    to="/login" 
                    className="block w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button variant="outline" fullWidth>
                      Iniciar Sesión
                    </Button>
                  </Link>
                  <Link 
                    to="/register" 
                    className="block w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button variant="primary" fullWidth>
                      Registrarse
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;