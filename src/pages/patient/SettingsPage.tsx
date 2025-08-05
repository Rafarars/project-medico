import { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Lock,
  Bell,
  Shield,
  HelpCircle,
  Sun,
  Moon,
  Eye,
  EyeOff,
  Save
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const SettingsPage = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    treatments: true,
    appointments: true,
    results: false,
    reminders: true
  });

  const [systemPreferences, setSystemPreferences] = useState({
    theme: 'light',
    timeFormat: '12h'
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Load theme preference on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setSystemPreferences(prev => ({ ...prev, theme: savedTheme }));

    // Apply theme to document
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleThemeChange = (theme: string) => {
    setSystemPreferences(prev => ({ ...prev, theme }));
    localStorage.setItem('theme', theme);

    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (profileData.newPassword && profileData.newPassword !== profileData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (profileData.newPassword && !profileData.currentPassword) {
      alert('Debes ingresar tu contraseña actual para cambiarla');
      return;
    }

    // Simulate profile update
    alert('Perfil actualizado exitosamente');
    
    // Clear password fields
    setProfileData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSecuritySubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (profileData.newPassword && profileData.newPassword !== profileData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (profileData.newPassword && !profileData.currentPassword) {
      alert('Debes ingresar tu contraseña actual para cambiarla');
      return;
    }

    // Simulate security update
    alert('Configuración de seguridad actualizada exitosamente');

    // Clear password fields
    setProfileData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };

  const handleSystemPreferencesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Preferencias del sistema guardadas exitosamente');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900">Configuración</h1>
      </div>

      {/* Profile Settings */}
      <Card>
        <div className="flex items-center space-x-3 mb-6">
          <div className="rounded-full bg-primary-100 p-2 text-primary-600">
            <User size={20} />
          </div>
          <h2 className="text-lg font-semibold text-neutral-900">Información Personal</h2>
        </div>

        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Nombre completo
              </label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                className="block w-full rounded-md border-neutral-300 bg-neutral-50 text-neutral-900 text-sm focus:border-primary-500 focus:ring-primary-500 focus:bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                className="block w-full rounded-md border-neutral-300 bg-neutral-50 text-neutral-900 text-sm focus:border-primary-500 focus:ring-primary-500 focus:bg-white"
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" variant="primary">
              <Save size={16} className="mr-2" />
              Guardar Información
            </Button>
          </div>
        </form>
      </Card>

      {/* Notification Settings */}
      <Card>
        <div className="flex items-center space-x-3 mb-6">
          <div className="rounded-full bg-secondary-100 p-2 text-secondary-600">
            <Bell size={20} />
          </div>
          <h2 className="text-lg font-semibold text-neutral-900">Notificaciones</h2>
        </div>

        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-neutral-900 capitalize">
                  {key === 'treatments' && 'Recordatorios de tratamientos'}
                  {key === 'appointments' && 'Recordatorios de citas'}
                  {key === 'results' && 'Resultados de laboratorio'}
                  {key === 'reminders' && 'Recordatorios generales'}
                </h3>
                <p className="text-xs text-neutral-600">
                  {key === 'treatments' && 'Recibe notificaciones sobre tus medicamentos'}
                  {key === 'appointments' && 'Recibe recordatorios de tus citas médicas'}
                  {key === 'results' && 'Notificaciones cuando lleguen nuevos resultados'}
                  {key === 'reminders' && 'Recordatorios sobre tu salud ginecológica'}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => handleNotificationChange(key as keyof typeof notifications)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          ))}
        </div>
      </Card>

      {/* Security Settings */}
      <Card>
        <div className="flex items-center space-x-3 mb-6">
          <div className="rounded-full bg-accent-100 p-2 text-accent-600">
            <Shield size={20} />
          </div>
          <h2 className="text-lg font-semibold text-neutral-900">Seguridad</h2>
        </div>

        <form onSubmit={handleSecuritySubmit} className="space-y-6">
          {/* Password Change */}
          <div>
            <h3 className="text-md font-medium text-neutral-900 mb-4">Cambiar Contraseña</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Contraseña actual
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={profileData.currentPassword}
                    onChange={(e) => setProfileData(prev => ({ ...prev, currentPassword: e.target.value }))}
                    className="block w-full rounded-md border-neutral-300 bg-neutral-50 text-neutral-900 text-sm focus:border-primary-500 focus:ring-primary-500 focus:bg-white pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-500 hover:text-neutral-700"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Nueva contraseña
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={profileData.newPassword}
                    onChange={(e) => setProfileData(prev => ({ ...prev, newPassword: e.target.value }))}
                    className="block w-full rounded-md border-neutral-300 bg-neutral-50 text-neutral-900 text-sm focus:border-primary-500 focus:ring-primary-500 focus:bg-white pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-500 hover:text-neutral-700"
                  >
                    {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Confirmar nueva contraseña
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={profileData.confirmPassword}
                    onChange={(e) => setProfileData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="block w-full rounded-md border-neutral-300 bg-neutral-50 text-neutral-900 text-sm focus:border-primary-500 focus:ring-primary-500 focus:bg-white pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-500 hover:text-neutral-700"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" variant="primary">
              <Save size={16} className="mr-2" />
              Actualizar Seguridad
            </Button>
          </div>
        </form>
      </Card>

      {/* System Preferences */}
      <Card>
        <div className="flex items-center space-x-3 mb-6">
          <div className="rounded-full bg-secondary-100 p-2 text-secondary-600">
            <Sun size={20} />
          </div>
          <h2 className="text-lg font-semibold text-neutral-900">Preferencias del Sistema</h2>
        </div>

        <form onSubmit={handleSystemPreferencesSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Theme */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Tema de la aplicación
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="theme"
                    value="light"
                    checked={systemPreferences.theme === 'light'}
                    onChange={(e) => handleThemeChange(e.target.value)}
                    className="text-primary-600 focus:ring-primary-500"
                  />
                  <Sun size={16} className="ml-2 mr-1 text-yellow-500" />
                  <span className="text-sm">Claro</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="theme"
                    value="dark"
                    checked={systemPreferences.theme === 'dark'}
                    onChange={(e) => handleThemeChange(e.target.value)}
                    className="text-primary-600 focus:ring-primary-500"
                  />
                  <Moon size={16} className="ml-2 mr-1 text-blue-600" />
                  <span className="text-sm">Oscuro</span>
                </label>
              </div>
              <p className="text-xs text-neutral-500 mt-1">
                Cambia la apariencia de la interfaz
              </p>
            </div>

            {/* Time Format */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Formato de hora
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="timeFormat"
                    value="12h"
                    checked={systemPreferences.timeFormat === '12h'}
                    onChange={(e) => setSystemPreferences(prev => ({ ...prev, timeFormat: e.target.value }))}
                    className="text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm">12 horas (AM/PM)</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="timeFormat"
                    value="24h"
                    checked={systemPreferences.timeFormat === '24h'}
                    onChange={(e) => setSystemPreferences(prev => ({ ...prev, timeFormat: e.target.value }))}
                    className="text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm">24 horas</span>
                </label>
              </div>
              <p className="text-xs text-neutral-500 mt-1">
                Formato para mostrar las horas en el sistema
              </p>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" variant="primary">
              <Save size={16} className="mr-2" />
              Guardar Preferencias
            </Button>
          </div>
        </form>
      </Card>

      {/* Privacy & Data Management */}
      <Card>
        <div className="flex items-center space-x-3 mb-6">
          <div className="rounded-full bg-neutral-100 p-2 text-neutral-600">
            <HelpCircle size={20} />
          </div>
          <h2 className="text-lg font-semibold text-neutral-900">Privacidad y Datos</h2>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => alert('Funcionalidad de descarga de datos pendiente de implementar')}
            className="flex items-center justify-between w-full p-3 text-left rounded-md border border-neutral-200 hover:bg-neutral-50 transition-colors"
          >
            <div>
              <h3 className="text-sm font-medium text-neutral-900">Descargar mis datos</h3>
              <p className="text-xs text-neutral-600">Obtén una copia de toda tu información médica</p>
            </div>
            <HelpCircle size={16} className="text-neutral-400" />
          </button>

          {/* Account Management */}
          <div className="border-t border-neutral-200 pt-6">
            <h3 className="text-md font-medium text-neutral-900 mb-4">Gestión de Cuenta</h3>
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-red-900 mb-1">Eliminar cuenta</h4>
                  <p className="text-xs text-red-700 mb-3">
                    Esta acción eliminará permanentemente tu cuenta y todos los datos médicos asociados.
                    No podrás recuperar esta información una vez eliminada.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-300 hover:bg-red-100"
                    onClick={() => {
                      if (window.confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
                        alert('Funcionalidad de eliminación de cuenta pendiente de implementar');
                      }
                    }}
                  >
                    Eliminar Cuenta
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SettingsPage;
