import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  Bell, 
  Shield, 
  Clock, 
  DollarSign, 
  Stethoscope,
  Globe,
  Moon,
  Sun,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const SettingsPage = () => {
  const { user } = useAuth();
  
  // Personal Information State
  const [personalInfo, setPersonalInfo] = useState({
    name: user?.name || 'Dr. Jane Smith',
    email: user?.email || 'jane.smith@gynecare.com',
    phone: '+1 (555) 123-4567',
    specialization: 'Ginecología y Obstetricia',
    license: 'MD-12345',
    experience: '15 años',
    bio: 'Especialista en ginecología con más de 15 años de experiencia en atención integral de la salud femenina.'
  });

  // Consultation Settings State
  const [consultationSettings, setConsultationSettings] = useState({
    consultationDuration: '30',
    consultationPrice: '150',
    emergencyPrice: '250',
    workingHours: {
      monday: { start: '08:00', end: '17:00', enabled: true },
      tuesday: { start: '08:00', end: '17:00', enabled: true },
      wednesday: { start: '08:00', end: '17:00', enabled: true },
      thursday: { start: '08:00', end: '17:00', enabled: true },
      friday: { start: '08:00', end: '15:00', enabled: true },
      saturday: { start: '09:00', end: '13:00', enabled: false },
      sunday: { start: '09:00', end: '13:00', enabled: false }
    },
    allowVirtualConsultations: true,
    maxDailyAppointments: '12'
  });

  // Security State
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false
  });

  // Notifications State
  const [notifications, setNotifications] = useState({
    newAppointments: true,
    appointmentReminders: true,
    patientMessages: true,
    emergencyAlerts: true,
    systemUpdates: false,
    marketingEmails: false
  });

  // System Preferences State
  const [systemPreferences, setSystemPreferences] = useState({
    theme: 'light',
    timeFormat: '24h'
  });

  // UI State
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  // Apply theme to document
  const applyTheme = (theme: string) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Handle theme change
  const handleThemeChange = (newTheme: string) => {
    setSystemPreferences(prev => ({ ...prev, theme: newTheme }));
    applyTheme(newTheme);
    localStorage.setItem('gynecare_theme', newTheme);
  };

  // Load theme on component mount
  React.useEffect(() => {
    const savedTheme = localStorage.getItem('gynecare_theme') || 'light';
    setSystemPreferences(prev => ({ ...prev, theme: savedTheme }));
    applyTheme(savedTheme);
  }, []);

  // Handlers
  const handlePersonalInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Información personal actualizada exitosamente');
  };

  const handleConsultationSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Configuración de consulta actualizada exitosamente');
  };

  const handleSecuritySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (securityData.newPassword !== securityData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (securityData.newPassword && !securityData.currentPassword) {
      alert('Debes ingresar tu contraseña actual');
      return;
    }

    alert('Configuración de seguridad actualizada exitosamente');
    setSecurityData(prev => ({
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

  const handleWorkingHourChange = (day: string, field: string, value: string | boolean) => {
    setConsultationSettings(prev => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [day]: {
          ...prev.workingHours[day as keyof typeof prev.workingHours],
          [field]: value
        }
      }
    }));
  };

  const tabs = [
    { id: 'personal', label: 'Información Personal', icon: User },
    { id: 'consultation', label: 'Configuración de Consulta', icon: Stethoscope },
    { id: 'notifications', label: 'Notificaciones', icon: Bell },
    { id: 'security', label: 'Seguridad', icon: Shield },
    { id: 'system', label: 'Preferencias del Sistema', icon: Globe }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Configuración del Doctor</h1>
          <p className="text-neutral-600">Gestiona tu perfil y preferencias del sistema</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-neutral-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'personal' && (
        <Card>
          <div className="flex items-center space-x-3 mb-6">
            <div className="rounded-full bg-primary-100 p-2 text-primary-600">
              <User size={20} />
            </div>
            <h2 className="text-lg font-semibold text-neutral-900">Información Personal</h2>
          </div>

          <form onSubmit={handlePersonalInfoSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Nombre completo
                </label>
                <input
                  type="text"
                  value={personalInfo.name}
                  onChange={(e) => setPersonalInfo(prev => ({ ...prev, name: e.target.value }))}
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
                  value={personalInfo.email}
                  onChange={(e) => setPersonalInfo(prev => ({ ...prev, email: e.target.value }))}
                  className="block w-full rounded-md border-neutral-300 text-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  value={personalInfo.phone}
                  onChange={(e) => setPersonalInfo(prev => ({ ...prev, phone: e.target.value }))}
                  className="block w-full rounded-md border-neutral-300 text-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Especialización
                </label>
                <input
                  type="text"
                  value={personalInfo.specialization}
                  onChange={(e) => setPersonalInfo(prev => ({ ...prev, specialization: e.target.value }))}
                  className="block w-full rounded-md border-neutral-300 text-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Número de licencia médica
                </label>
                <input
                  type="text"
                  value={personalInfo.license}
                  onChange={(e) => setPersonalInfo(prev => ({ ...prev, license: e.target.value }))}
                  className="block w-full rounded-md border-neutral-300 text-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Años de experiencia
                </label>
                <input
                  type="text"
                  value={personalInfo.experience}
                  onChange={(e) => setPersonalInfo(prev => ({ ...prev, experience: e.target.value }))}
                  className="block w-full rounded-md border-neutral-300 text-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Biografía profesional
              </label>
              <textarea
                rows={4}
                value={personalInfo.bio}
                onChange={(e) => setPersonalInfo(prev => ({ ...prev, bio: e.target.value }))}
                className="block w-full rounded-md border-neutral-300 text-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Describe tu experiencia y especialidades..."
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" variant="primary">
                <Save size={16} className="mr-2" />
                Guardar Cambios
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Consultation Settings Tab */}
      {activeTab === 'consultation' && (
        <Card>
          <div className="flex items-center space-x-3 mb-6">
            <div className="rounded-full bg-secondary-100 p-2 text-secondary-600">
              <Stethoscope size={20} />
            </div>
            <h2 className="text-lg font-semibold text-neutral-900">Configuración de Consulta</h2>
          </div>

          <form onSubmit={handleConsultationSettingsSubmit} className="space-y-6">
            {/* Basic Consultation Settings */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  <Clock size={16} className="inline mr-1" />
                  Duración de consulta (minutos)
                </label>
                <select
                  value={consultationSettings.consultationDuration}
                  onChange={(e) => setConsultationSettings(prev => ({ ...prev, consultationDuration: e.target.value }))}
                  className="block w-full rounded-md border-neutral-300 text-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="15">15 minutos</option>
                  <option value="30">30 minutos</option>
                  <option value="45">45 minutos</option>
                  <option value="60">60 minutos</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  <DollarSign size={16} className="inline mr-1" />
                  Precio consulta regular ($)
                </label>
                <input
                  type="number"
                  value={consultationSettings.consultationPrice}
                  onChange={(e) => setConsultationSettings(prev => ({ ...prev, consultationPrice: e.target.value }))}
                  className="block w-full rounded-md border-neutral-300 text-sm focus:border-primary-500 focus:ring-primary-500"
                  min="0"
                  step="10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Precio consulta de emergencia ($)
                </label>
                <input
                  type="number"
                  value={consultationSettings.emergencyPrice}
                  onChange={(e) => setConsultationSettings(prev => ({ ...prev, emergencyPrice: e.target.value }))}
                  className="block w-full rounded-md border-neutral-300 text-sm focus:border-primary-500 focus:ring-primary-500"
                  min="0"
                  step="10"
                />
              </div>
            </div>

            {/* Working Hours */}
            <div>
              <h3 className="text-md font-medium text-neutral-900 mb-4">Horarios de Trabajo</h3>
              <div className="space-y-3">
                {Object.entries(consultationSettings.workingHours).map(([day, hours]) => {
                  const dayNames = {
                    monday: 'Lunes',
                    tuesday: 'Martes',
                    wednesday: 'Miércoles',
                    thursday: 'Jueves',
                    friday: 'Viernes',
                    saturday: 'Sábado',
                    sunday: 'Domingo'
                  };

                  return (
                    <div key={day} className="flex items-center space-x-4 p-3 bg-neutral-50 rounded-md">
                      <div className="w-20">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={hours.enabled}
                            onChange={(e) => handleWorkingHourChange(day, 'enabled', e.target.checked)}
                            className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="ml-2 text-sm font-medium text-neutral-700">
                            {dayNames[day as keyof typeof dayNames]}
                          </span>
                        </label>
                      </div>

                      {hours.enabled && (
                        <>
                          <div>
                            <label className="block text-xs text-neutral-600 mb-1">Inicio</label>
                            <input
                              type="time"
                              value={hours.start}
                              onChange={(e) => handleWorkingHourChange(day, 'start', e.target.value)}
                              className="block w-full rounded-md border-neutral-300 text-sm focus:border-primary-500 focus:ring-primary-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-neutral-600 mb-1">Fin</label>
                            <input
                              type="time"
                              value={hours.end}
                              onChange={(e) => handleWorkingHourChange(day, 'end', e.target.value)}
                              className="block w-full rounded-md border-neutral-300 text-sm focus:border-primary-500 focus:ring-primary-500"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Additional Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Máximo de citas por día
                </label>
                <input
                  type="number"
                  value={consultationSettings.maxDailyAppointments}
                  onChange={(e) => setConsultationSettings(prev => ({ ...prev, maxDailyAppointments: e.target.value }))}
                  className="block w-full rounded-md border-neutral-300 text-sm focus:border-primary-500 focus:ring-primary-500"
                  min="1"
                  max="50"
                />
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="virtualConsultations"
                  checked={consultationSettings.allowVirtualConsultations}
                  onChange={(e) => setConsultationSettings(prev => ({ ...prev, allowVirtualConsultations: e.target.checked }))}
                  className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="virtualConsultations" className="text-sm font-medium text-neutral-700">
                  Permitir consultas virtuales
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" variant="primary">
                <Save size={16} className="mr-2" />
                Guardar Configuración
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <Card>
          <div className="flex items-center space-x-3 mb-6">
            <div className="rounded-full bg-accent-100 p-2 text-accent-600">
              <Bell size={20} />
            </div>
            <h2 className="text-lg font-semibold text-neutral-900">Configuración de Notificaciones</h2>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => {
                const notificationLabels = {
                  newAppointments: 'Nuevas citas agendadas',
                  appointmentReminders: 'Recordatorios de citas',
                  patientMessages: 'Mensajes de pacientes',
                  emergencyAlerts: 'Alertas de emergencia',
                  systemUpdates: 'Actualizaciones del sistema',
                  marketingEmails: 'Correos promocionales'
                };

                const notificationDescriptions = {
                  newAppointments: 'Recibe notificaciones cuando se agende una nueva cita',
                  appointmentReminders: 'Recordatorios 30 minutos antes de cada cita',
                  patientMessages: 'Notificaciones de nuevos mensajes de pacientes',
                  emergencyAlerts: 'Alertas inmediatas para casos de emergencia',
                  systemUpdates: 'Información sobre actualizaciones y mantenimiento',
                  marketingEmails: 'Ofertas especiales y contenido promocional'
                };

                return (
                  <div key={key} className="flex items-center justify-between p-4 bg-neutral-50 rounded-md">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-neutral-900">
                        {notificationLabels[key as keyof typeof notificationLabels]}
                      </h3>
                      <p className="text-xs text-neutral-600 mt-1">
                        {notificationDescriptions[key as keyof typeof notificationDescriptions]}
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
                );
              })}
            </div>

            <div className="flex justify-end">
              <Button
                onClick={() => alert('Configuración de notificaciones guardada')}
                variant="primary"
              >
                <Save size={16} className="mr-2" />
                Guardar Preferencias
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <Card>
          <div className="flex items-center space-x-3 mb-6">
            <div className="rounded-full bg-red-100 p-2 text-red-600">
              <Shield size={20} />
            </div>
            <h2 className="text-lg font-semibold text-neutral-900">Configuración de Seguridad</h2>
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
                      value={securityData.currentPassword}
                      onChange={(e) => setSecurityData(prev => ({ ...prev, currentPassword: e.target.value }))}
                      className="block w-full rounded-md border-neutral-300 bg-neutral-50 text-neutral-900 text-sm focus:border-primary-500 focus:ring-primary-500 focus:bg-white pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Nueva contraseña
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={securityData.newPassword}
                    onChange={(e) => setSecurityData(prev => ({ ...prev, newPassword: e.target.value }))}
                    className="block w-full rounded-md border-neutral-300 bg-neutral-50 text-neutral-900 text-sm focus:border-primary-500 focus:ring-primary-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Confirmar nueva contraseña
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={securityData.confirmPassword}
                    onChange={(e) => setSecurityData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="block w-full rounded-md border-neutral-300 bg-neutral-50 text-neutral-900 text-sm focus:border-primary-500 focus:ring-primary-500 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Two Factor Authentication */}
            <div className="border-t border-neutral-200 pt-6">
              <h3 className="text-md font-medium text-neutral-900 mb-4">Autenticación de Dos Factores</h3>
              <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-md">
                <div>
                  <h4 className="text-sm font-medium text-neutral-900">Habilitar 2FA</h4>
                  <p className="text-xs text-neutral-600 mt-1">
                    Agrega una capa extra de seguridad a tu cuenta
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={securityData.twoFactorEnabled}
                    onChange={(e) => setSecurityData(prev => ({ ...prev, twoFactorEnabled: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" variant="primary">
                <Lock size={16} className="mr-2" />
                Actualizar Seguridad
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* System Preferences Tab */}
      {activeTab === 'system' && (
        <Card>
          <div className="flex items-center space-x-3 mb-6">
            <div className="rounded-full bg-blue-100 p-2 text-blue-600">
              <Globe size={20} />
            </div>
            <h2 className="text-lg font-semibold text-neutral-900">Preferencias del Sistema</h2>
          </div>

          <div className="space-y-6">
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
                      Esta acción eliminará permanentemente tu cuenta y todos los datos asociados.
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

            <div className="flex justify-end">
              <Button
                onClick={() => alert('Preferencias del sistema guardadas')}
                variant="primary"
              >
                <Save size={16} className="mr-2" />
                Guardar Preferencias
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default SettingsPage;
