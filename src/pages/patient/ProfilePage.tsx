import { useState } from 'react';
import { User, Mail, Phone, Calendar, MapPin, Edit, Save, X, Camera } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'María García',
    email: 'maria.garcia@email.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-05-15',
    address: '123 Main St, Ciudad, Estado 12345',
    emergencyContact: 'Juan García - +1 (555) 987-6543',
    bloodType: 'O+',
    allergies: 'Penicilina',
    medicalHistory: 'Hipertensión controlada',
    insurance: 'Seguro Médico ABC - Póliza #123456789',
  });

  const [medicalInfo, setMedicalInfo] = useState({
    height: '165',
    weight: '60',
    lastMenstrualPeriod: '2024-03-01',
    cycleLength: '28',
    pregnancies: '0',
    births: '0',
    miscarriages: '0',
  });

  const handleSave = () => {
    // Here you would save the data to your backend
    console.log('Saving profile data:', profileData, medicalInfo);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset any changes
    setIsEditing(false);
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:items-center lg:space-y-0">
        <div>
          <h1 className="font-heading text-xl lg:text-2xl font-bold text-neutral-900">Mi Perfil</h1>
          <p className="text-sm lg:text-base text-neutral-600">Gestiona tu información personal y médica</p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          {isEditing ? (
            <>
              <Button variant="outline\" onClick={handleCancel} size="sm" className="w-full sm:w-auto">
                <X size={16} className="mr-2" />
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleSave} size="sm" className="w-full sm:w-auto">
                <Save size={16} className="mr-2" />
                Guardar
              </Button>
            </>
          ) : (
            <Button variant="primary" onClick={() => setIsEditing(true)} size="sm" className="w-full sm:w-auto">
              <Edit size={16} className="mr-2" />
              Editar Perfil
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-4 lg:gap-6 lg:grid-cols-3">
        {/* Profile Picture and Basic Info */}
        <Card className="lg:col-span-1">
          <div className="text-center">
            <div className="relative mx-auto mb-4 h-20 w-20 lg:h-24 lg:w-24">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-primary-100 text-primary-600">
                <User size={28} className="lg:w-8 lg:h-8" />
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 rounded-full bg-primary-500 p-1.5 lg:p-2 text-white hover:bg-primary-600">
                  <Camera size={14} className="lg:w-4 lg:h-4" />
                </button>
              )}
            </div>
            <h2 className="font-heading text-lg lg:text-xl font-semibold text-neutral-900">{profileData.name}</h2>
            <p className="text-sm lg:text-base text-neutral-600">Paciente</p>
            <div className="mt-4 space-y-2 text-xs lg:text-sm text-neutral-600">
              <div className="flex items-center justify-center">
                <Mail size={14} className="mr-2 flex-shrink-0" />
                <span className="truncate">{profileData.email}</span>
              </div>
              <div className="flex items-center justify-center">
                <Phone size={14} className="mr-2 flex-shrink-0" />
                <span>{profileData.phone}</span>
              </div>
              <div className="flex items-center justify-center">
                <Calendar size={14} className="mr-2 flex-shrink-0" />
                <span>{new Date(profileData.dateOfBirth).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Personal Information */}
        <Card className="lg:col-span-2">
          <h3 className="mb-4 font-heading text-base lg:text-lg font-semibold text-neutral-900">Información Personal</h3>
          <div className="grid gap-3 lg:gap-4 sm:grid-cols-2">
            <Input
              label="Nombre Completo"
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              disabled={!isEditing}
              icon={<User size={16} />}
            />
            <Input
              label="Correo Electrónico"
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              disabled={!isEditing}
              icon={<Mail size={16} />}
            />
            <Input
              label="Teléfono"
              value={profileData.phone}
              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
              disabled={!isEditing}
              icon={<Phone size={16} />}
            />
            <Input
              label="Fecha de Nacimiento"
              type="date"
              value={profileData.dateOfBirth}
              onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
              disabled={!isEditing}
              icon={<Calendar size={16} />}
            />
            <div className="sm:col-span-2">
              <Input
                label="Dirección"
                value={profileData.address}
                onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                disabled={!isEditing}
                icon={<MapPin size={16} />}
              />
            </div>
            <div className="sm:col-span-2">
              <Input
                label="Contacto de Emergencia"
                value={profileData.emergencyContact}
                onChange={(e) => setProfileData({ ...profileData, emergencyContact: e.target.value })}
                disabled={!isEditing}
                icon={<Phone size={16} />}
              />
            </div>
          </div>
        </Card>

        {/* Medical Information */}
        <Card className="lg:col-span-3">
          <h3 className="mb-4 font-heading text-base lg:text-lg font-semibold text-neutral-900">Información Médica</h3>
          <div className="grid gap-3 lg:gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Input
              label="Tipo de Sangre"
              value={profileData.bloodType}
              onChange={(e) => setProfileData({ ...profileData, bloodType: e.target.value })}
              disabled={!isEditing}
            />
            <Input
              label="Altura (cm)"
              value={medicalInfo.height}
              onChange={(e) => setMedicalInfo({ ...medicalInfo, height: e.target.value })}
              disabled={!isEditing}
            />
            <Input
              label="Peso (kg)"
              value={medicalInfo.weight}
              onChange={(e) => setMedicalInfo({ ...medicalInfo, weight: e.target.value })}
              disabled={!isEditing}
            />
            <div className="sm:col-span-2 lg:col-span-3">
              <label className="label">Alergias</label>
              <textarea
                value={profileData.allergies}
                onChange={(e) => setProfileData({ ...profileData, allergies: e.target.value })}
                disabled={!isEditing}
                className="input text-sm lg:text-base"
                rows={2}
                placeholder="Lista de alergias conocidas"
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-3">
              <label className="label">Historial Médico</label>
              <textarea
                value={profileData.medicalHistory}
                onChange={(e) => setProfileData({ ...profileData, medicalHistory: e.target.value })}
                disabled={!isEditing}
                className="input text-sm lg:text-base"
                rows={3}
                placeholder="Condiciones médicas previas, cirugías, etc."
              />
            </div>
          </div>
        </Card>

        {/* Gynecological Information */}
        <Card className="lg:col-span-3">
          <h3 className="mb-4 font-heading text-base lg:text-lg font-semibold text-neutral-900">Información Ginecológica</h3>
          <div className="grid gap-3 lg:gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Input
              label="Última Menstruación"
              type="date"
              value={medicalInfo.lastMenstrualPeriod}
              onChange={(e) => setMedicalInfo({ ...medicalInfo, lastMenstrualPeriod: e.target.value })}
              disabled={!isEditing}
            />
            <Input
              label="Duración del Ciclo (días)"
              value={medicalInfo.cycleLength}
              onChange={(e) => setMedicalInfo({ ...medicalInfo, cycleLength: e.target.value })}
              disabled={!isEditing}
            />
            <Input
              label="Embarazos"
              value={medicalInfo.pregnancies}
              onChange={(e) => setMedicalInfo({ ...medicalInfo, pregnancies: e.target.value })}
              disabled={!isEditing}
            />
            <Input
              label="Partos"
              value={medicalInfo.births}
              onChange={(e) => setMedicalInfo({ ...medicalInfo, births: e.target.value })}
              disabled={!isEditing}
            />
          </div>
        </Card>

        {/* Insurance Information */}
        <Card className="lg:col-span-3">
          <h3 className="mb-4 font-heading text-base lg:text-lg font-semibold text-neutral-900">Información del Seguro</h3>
          <div className="grid gap-3 lg:gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Input
                label="Información del Seguro"
                value={profileData.insurance}
                onChange={(e) => setProfileData({ ...profileData, insurance: e.target.value })}
                disabled={!isEditing}
                placeholder="Nombre del seguro y número de póliza"
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Privacy Settings */}
      <Card>
        <h3 className="mb-4 font-heading text-base lg:text-lg font-semibold text-neutral-900">Configuración de Privacidad</h3>
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0 mr-4">
              <h4 className="font-medium text-neutral-900 text-sm lg:text-base">Compartir información con doctores</h4>
              <p className="text-xs lg:text-sm text-neutral-600">Permite que los doctores accedan a tu historial médico</p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="h-4 w-4 rounded border-neutral-300 text-primary-500 focus:ring-primary-500 flex-shrink-0"
            />
          </div>
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0 mr-4">
              <h4 className="font-medium text-neutral-900 text-sm lg:text-base">Recordatorios por email</h4>
              <p className="text-xs lg:text-sm text-neutral-600">Recibe recordatorios de citas y medicamentos por correo</p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="h-4 w-4 rounded border-neutral-300 text-primary-500 focus:ring-primary-500 flex-shrink-0"
            />
          </div>
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0 mr-4">
              <h4 className="font-medium text-neutral-900 text-sm lg:text-base">Notificaciones push</h4>
              <p className="text-xs lg:text-sm text-neutral-600">Recibe notificaciones en tiempo real en tu dispositivo</p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="h-4 w-4 rounded border-neutral-300 text-primary-500 focus:ring-primary-500 flex-shrink-0"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;