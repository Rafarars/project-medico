import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'doctor' | 'patient'>('patient');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }
    
    try {
      setIsLoading(true);
      await login(email, password, role);
      navigate(role === 'doctor' ? '/doctor' : '/patient');
    } catch (err) {
      setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex flex-1 items-center justify-center bg-neutral-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-md">
            <div className="mb-8 text-center">
              <div className="mb-4 flex justify-center">
                <Heart className="h-12 w-12 text-accent-500" />
              </div>
              <h1 className="mb-2 font-heading text-3xl font-bold text-neutral-900">
                Iniciar Sesión
              </h1>
              <p className="text-neutral-600">
                Accede a tu cuenta para continuar
              </p>
            </div>
            
            {error && (
              <div className="mb-6 rounded-md bg-error-50 p-4 text-error-700">
                {error}
              </div>
            )}
            
            <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
              {/* Role selection */}
              <div className="mb-6 grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole('patient')}
                  className={`flex flex-col items-center justify-center rounded-md border-2 p-4 transition-all ${
                    role === 'patient'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-neutral-200 bg-white hover:bg-neutral-50'
                  }`}
                >
                  <User className={`mb-2 h-8 w-8 ${role === 'patient' ? 'text-primary-500' : 'text-neutral-400'}`} />
                  <span className={`font-medium ${role === 'patient' ? 'text-primary-700' : 'text-neutral-700'}`}>
                    Paciente
                  </span>
                </button>
                
                <button
                  type="button"
                  onClick={() => setRole('doctor')}
                  className={`flex flex-col items-center justify-center rounded-md border-2 p-4 transition-all ${
                    role === 'doctor'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-neutral-200 bg-white hover:bg-neutral-50'
                  }`}
                >
                  <User className={`mb-2 h-8 w-8 ${role === 'doctor' ? 'text-primary-500' : 'text-neutral-400'}`} />
                  <span className={`font-medium ${role === 'doctor' ? 'text-primary-700' : 'text-neutral-700'}`}>
                    Doctor
                  </span>
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <Input
                  type="email"
                  id="email"
                  label="Correo Electrónico"
                  placeholder="tucorreo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  icon={<Mail size={18} />}
                />
                
                <Input
                  type="password"
                  id="password"
                  label="Contraseña"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  icon={<Lock size={18} />}
                />
                
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-700">
                      Recordarme
                    </label>
                  </div>
                  
                  <div className="text-sm">
                    <Link to="/forgot-password" className="font-medium text-primary-600 hover:text-primary-500">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  isLoading={isLoading}
                >
                  Iniciar Sesión
                </Button>
              </form>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-neutral-600">
                ¿No tienes una cuenta?{' '}
                <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
                  Regístrate
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LoginPage;