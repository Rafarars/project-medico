import { useState } from 'react';
import { User, Mail, Lock, Bell, Shield, HelpCircle } from 'lucide-react';
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
                className="block w-full rounded-md border-neutral-300 text-sm focus:border-primary-500 focus:ring-primary-500"
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
                className="block w-full rounded-md border-neutral-300 text-sm focus:border-primary-500 focus:ring-primary-500"
                required
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-md font-medium text-neutral-900 mb-4">Cambiar Contraseña</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Contraseña actual
                </label>
                <input
                  type="password"
                  value={profileData.currentPassword}
                  onChange={(e) => setProfileData(prev => ({ ...prev, currentPassword: e.target.value }))}
                  className="block w-full rounded-md border-neutral-300 text-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Nueva contraseña
                </label>
                <input
                  type="password"
                  value={profileData.newPassword}
                  onChange={(e) => setProfileData(prev => ({ ...prev, newPassword: e.target.value }))}
                  className="block w-full rounded-md border-neutral-300 text-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Confirmar contraseña
                </label>
                <input
                  type="password"
                  value={profileData.confirmPassword}
                  onChange={(e) => setProfileData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="block w-full rounded-md border-neutral-300 text-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" variant="primary">
              Guardar Cambios
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

      {/* Privacy & Security */}
      <Card>
        <div className="flex items-center space-x-3 mb-6">
          <div className="rounded-full bg-accent-100 p-2 text-accent-600">
            <Shield size={20} />
          </div>
          <h2 className="text-lg font-semibold text-neutral-900">Privacidad y Seguridad</h2>
        </div>

        <div className="space-y-4">
          <button className="flex items-center justify-between w-full p-3 text-left rounded-md border border-neutral-200 hover:bg-neutral-50">
            <div>
              <h3 className="text-sm font-medium text-neutral-900">Descargar mis datos</h3>
              <p className="text-xs text-neutral-600">Obtén una copia de toda tu información</p>
            </div>
            <HelpCircle size={16} className="text-neutral-400" />
          </button>

          <button className="flex items-center justify-between w-full p-3 text-left rounded-md border border-neutral-200 hover:bg-neutral-50">
            <div>
              <h3 className="text-sm font-medium text-neutral-900">Eliminar cuenta</h3>
              <p className="text-xs text-neutral-600">Eliminar permanentemente tu cuenta y datos</p>
            </div>
            <HelpCircle size={16} className="text-neutral-400" />
          </button>
        </div>
      </Card>
    </div>
  );
};

export default SettingsPage;
