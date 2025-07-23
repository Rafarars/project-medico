import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Mail, Lock, User, Phone, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dateOfBirth: '',
    role: 'patient' as 'doctor' | 'patient',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name) newErrors.name = 'El nombre es requerido';
    if (!formData.email) newErrors.email = 'El correo electrónico es requerido';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'El correo electrónico no es válido';
    
    if (!formData.password) newErrors.password = 'La contraseña es requerida';
    else if (formData.password.length < 8) newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setIsLoading(true);
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
      });
      
      navigate(formData.role === 'doctor' ? '/doctor' : '/patient');
    } catch (err) {
      console.error('Registration error:', err);
      setErrors({
        form: 'Error al registrar la cuenta. Por favor, inténtalo de nuevo.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex flex-1 items-center justify-center bg-neutral-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-lg">
            <div className="mb-8 text-center">
              <div className="mb-4 flex justify-center">
                <Heart className="h-12 w-12 text-accent-500" />
              </div>
              <h1 className="mb-2 font-heading text-3xl font-bold text-neutral-900">
                Crea tu Cuenta
              </h1>
              <p className="text-neutral-600">
                Únete a nuestra plataforma de monitoreo ginecológico
              </p>
            </div>
            
            {errors.form && (
              <div className="mb-6 rounded-md bg-error-50 p-4 text-error-700">
                {errors.form}
              </div>
            )}
            
            <div className="rounded-lg bg-white p-6 shadow-md">
              {/* Role selection */}
              <div className="mb-6 grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, role: 'patient' }))}
                  className={`flex flex-col items-center justify-center rounded-md border-2 p-4 transition-all ${
                    formData.role === 'patient'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-neutral-200 bg-white hover:bg-neutral-50'
                  }`}
                >
                  <User className={`mb-2 h-8 w-8 ${formData.role === 'patient' ? 'text-primary-500' : 'text-neutral-400'}`} />
                  <span className={`font-medium ${formData.role === 'patient' ? 'text-primary-700' : 'text-neutral-700'}`}>
                    Paciente
                  </span>
                </button>
                
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, role: 'doctor' }))}
                  className={`flex flex-col items-center justify-center rounded-md border-2 p-4 transition-all ${
                    formData.role === 'doctor'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-neutral-200 bg-white hover:bg-neutral-50'
                  }`}
                >
                  <User className={`mb-2 h-8 w-8 ${formData.role === 'doctor' ? 'text-primary-500' : 'text-neutral-400'}`} />
                  <span className={`font-medium ${formData.role === 'doctor' ? 'text-primary-700' : 'text-neutral-700'}`}>
                    Doctor
                  </span>
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      label="Nombre Completo"
                      placeholder="Ingresa tu nombre completo"
                      value={formData.name}
                      onChange={handleChange}
                      error={errors.name}
                      icon={<User size={18} />}
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      label="Correo Electrónico"
                      placeholder="tucorreo@ejemplo.com"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                      icon={<Mail size={18} />}
                    />
                  </div>
                  
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    label="Contraseña"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    icon={<Lock size={18} />}
                  />
                  
                  <Input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirmar Contraseña"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    icon={<Lock size={18} />}
                  />
                  
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    label="Teléfono (opcional)"
                    placeholder="(123) 456-7890"
                    value={formData.phone}
                    onChange={handleChange}
                    icon={<Phone size={18} />}
                  />
                  
                  <Input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    label="Fecha de Nacimiento (opcional)"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    icon={<Calendar size={18} />}
                  />
                </div>
                
                <div className="mt-6 flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-neutral-700">
                    Acepto los{' '}
                    <Link to="/terms" className="font-medium text-primary-600 hover:text-primary-500">
                      Términos y Condiciones
                    </Link>
                    {' '}y la{' '}
                    <Link to="/privacy" className="font-medium text-primary-600 hover:text-primary-500">
                      Política de Privacidad
                    </Link>
                  </label>
                </div>
                
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  className="mt-6"
                  isLoading={isLoading}
                >
                  Crear Cuenta
                </Button>
              </form>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-neutral-600">
                ¿Ya tienes una cuenta?{' '}
                <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                  Inicia Sesión
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

export default RegisterPage;