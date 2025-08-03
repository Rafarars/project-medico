import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar, Clock, Video, MapPin, Plus, Filter, Search, X } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const AppointmentsPage = () => {
  const [filter, setFilter] = useState('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();

  // Check for openModal parameter in URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('openModal') === 'true') {
      setIsModalOpen(true);
    }
  }, [location]);

  // Form data for appointment request
  const [appointmentForm, setAppointmentForm] = useState({
    specialty: '',
    doctor: '',
    date: '',
    time: '',
    type: 'presencial',
    reason: ''
  });

  // Mock appointments data
  const appointments = [
    {
      id: 1,
      doctor: 'Dra. Ana Méndez',
      specialty: 'Ginecología',
      date: '2024-03-25',
      time: '10:30',
      type: 'Presencial',
      status: 'confirmed',
      location: 'Clínica Central, Consultorio 305',
      notes: 'Control de rutina',
    },
    {
      id: 2,
      doctor: 'Dra. Carmen López',
      specialty: 'Obstetricia',
      date: '2024-04-02',
      time: '14:00',
      type: 'Virtual',
      status: 'pending',
      location: 'Videollamada',
      notes: 'Revisión de resultados',
    },
    {
      id: 3,
      doctor: 'Dra. Ana Méndez',
      specialty: 'Ginecología',
      date: '2024-03-15',
      time: '09:00',
      type: 'Presencial',
      status: 'completed',
      location: 'Clínica Central, Consultorio 305',
      notes: 'Consulta inicial',
    },
  ];

  // Check URL parameters to auto-open modal
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('openModal') === 'true') {
      setIsModalOpen(true);
      // Clean up URL without causing a re-render
      window.history.replaceState({}, '', '/patient/appointments');
    }
  }, [location]);

  // Handle form submission
  const handleAppointmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Here you would normally send the data to your backend
      console.log('Appointment request submitted:', appointmentForm);

      // Reset form and close modal
      setAppointmentForm({
        specialty: '',
        doctor: '',
        date: '',
        time: '',
        type: 'presencial',
        reason: ''
      });
      setIsModalOpen(false);

      // You could show a success message here
      alert('Solicitud de cita enviada exitosamente. Te contactaremos pronto para confirmar.');

    } catch (error) {
      console.error('Error submitting appointment:', error);
      alert('Error al enviar la solicitud. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesFilter = filter === 'all' || 
      (filter === 'upcoming' && ['confirmed', 'pending'].includes(appointment.status)) ||
      (filter === 'completed' && appointment.status === 'completed') ||
      (filter === 'cancelled' && appointment.status === 'cancelled');
    
    const matchesSearch = appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-success-100 text-success-800';
      case 'pending': return 'bg-warning-100 text-warning-800';
      case 'completed': return 'bg-neutral-100 text-neutral-800';
      case 'cancelled': return 'bg-error-100 text-error-800';
      default: return 'bg-neutral-100 text-neutral-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmada';
      case 'pending': return 'Pendiente';
      case 'completed': return 'Completada';
      case 'cancelled': return 'Cancelada';
      default: return status;
    }
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:items-center lg:space-y-0">
        <div>
          <h1 className="font-heading text-xl lg:text-2xl font-bold text-neutral-900">Mis Citas</h1>
          <p className="text-sm lg:text-base text-neutral-600">Gestiona tus citas médicas</p>
        </div>
        <Button
          variant="primary"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center w-full sm:w-auto"
          size="sm"
        >
          <Plus size={16} className="mr-2" />
          Solicitar Cita
        </Button>
      </div>

      <Card>
        <div className="mb-4 lg:mb-6 flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4 flex-1">
            <div className="relative flex-1 lg:max-w-xs">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                placeholder="Buscar citas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-md border border-neutral-300 pl-10 pr-4 py-2 text-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter size={18} className="text-neutral-500" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="rounded-md border-neutral-300 text-sm"
              >
                <option value="all">Todas</option>
                <option value="upcoming">Próximas</option>
                <option value="completed">Completadas</option>
                <option value="cancelled">Canceladas</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredAppointments.map((appointment) => (
            <div key={appointment.id} className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-3 flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-neutral-900 truncate">{appointment.doctor}</h3>
                  <p className="text-sm text-neutral-600 truncate">{appointment.specialty}</p>
                </div>
                <span className={`rounded-full px-2 py-1 text-xs font-medium whitespace-nowrap ml-2 ${getStatusColor(appointment.status)}`}>
                  {getStatusText(appointment.status)}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-neutral-600">
                  <Calendar size={14} className="mr-2 text-neutral-400 flex-shrink-0" />
                  <span className="truncate">{new Date(appointment.date).toLocaleDateString('es-ES', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>

                <div className="flex items-center text-sm text-neutral-600">
                  <Clock size={14} className="mr-2 text-neutral-400 flex-shrink-0" />
                  <span>{appointment.time}</span>
                </div>

                <div className="flex items-start text-sm text-neutral-600">
                  {appointment.type === 'Virtual' ? (
                    <Video size={14} className="mr-2 text-neutral-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <MapPin size={14} className="mr-2 text-neutral-400 flex-shrink-0 mt-0.5" />
                  )}
                  <span className="break-words">{appointment.location}</span>
                </div>

                {appointment.notes && (
                  <div className="mt-2 rounded-md bg-neutral-50 p-2">
                    <p className="text-xs text-neutral-600 break-words">{appointment.notes}</p>
                  </div>
                )}
              </div>

              {appointment.status === 'confirmed' && (
                <div className="mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  {appointment.type === 'Virtual' && (
                    <Button variant="primary\" size="sm\" className="flex-1 text-xs">
                      Unirse
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="flex-1 text-xs">
                    Reprogramar
                  </Button>
                </div>
              )}

              {appointment.status === 'pending' && (
                <div className="mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <Button variant="primary" size="sm" className="flex-1 text-xs">
                    Confirmar
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 text-xs">
                    Cancelar
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredAppointments.length === 0 && (
          <div className="py-8 lg:py-12 text-center">
            <Calendar className="mx-auto h-10 w-10 lg:h-12 lg:w-12 text-neutral-400" />
            <h3 className="mt-4 text-base lg:text-lg font-medium text-neutral-900">No hay citas</h3>
            <p className="mt-2 text-sm lg:text-base text-neutral-600">
              {filter === 'upcoming' ? 'No tienes citas próximas programadas.' : 'No se encontraron citas con los filtros seleccionados.'}
            </p>
            <Button variant="primary" className="mt-4" onClick={() => setIsModalOpen(true)} size="sm">
              Solicitar Nueva Cita
            </Button>
          </div>
        )}
      </Card>

      {/* Request Appointment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-lg rounded-lg bg-white p-4 lg:p-6 max-h-[90vh] overflow-y-auto">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading text-lg lg:text-xl font-semibold">Solicitar Nueva Cita</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-full p-1 text-neutral-500 hover:bg-neutral-100"
              >
                <X size={20} />
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleAppointmentSubmit}>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Especialidad
                </label>
                <select
                  className="block w-full rounded-md border-neutral-300 text-sm focus:border-primary-500 focus:ring-primary-500"
                  value={appointmentForm.specialty}
                  onChange={(e) => setAppointmentForm(prev => ({ ...prev, specialty: e.target.value }))}
                  required
                >
                  <option value="">Selecciona una especialidad</option>
                  <option value="ginecologia">Ginecología</option>
                  <option value="obstetricia">Obstetricia</option>
                  <option value="medicina-reproductiva">Medicina Reproductiva</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Doctor Preferido
                </label>
                <select
                  className="block w-full rounded-md border-neutral-300 text-sm focus:border-primary-500 focus:ring-primary-500"
                  value={appointmentForm.doctor}
                  onChange={(e) => setAppointmentForm(prev => ({ ...prev, doctor: e.target.value }))}
                  required
                >
                  <option value="">Selecciona un doctor</option>
                  <option value="ana-mendez">Dra. Ana Méndez</option>
                  <option value="carmen-lopez">Dra. Carmen López</option>
                  <option value="luis-rodriguez">Dr. Luis Rodríguez</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Tipo de Consulta
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAppointmentForm(prev => ({ ...prev, type: 'presencial' }))}
                    className={`flex items-center justify-center rounded-md border px-3 py-2 text-sm font-medium ${
                      appointmentForm.type === 'presencial'
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-neutral-300 text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <MapPin size={14} className="mr-2" />
                    Presencial
                  </button>
                  <button
                    type="button"
                    onClick={() => setAppointmentForm(prev => ({ ...prev, type: 'virtual' }))}
                    className={`flex items-center justify-center rounded-md border px-3 py-2 text-sm font-medium ${
                      appointmentForm.type === 'virtual'
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-neutral-300 text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <Video size={14} className="mr-2" />
                    Virtual
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Fecha Preferida
                  </label>
                  <input
                    type="date"
                    className="block w-full rounded-md border-neutral-300 text-sm focus:border-primary-500 focus:ring-primary-500"
                    value={appointmentForm.date}
                    onChange={(e) => setAppointmentForm(prev => ({ ...prev, date: e.target.value }))}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Hora Preferida
                  </label>
                  <select
                    className="block w-full rounded-md border-neutral-300 text-sm focus:border-primary-500 focus:ring-primary-500"
                    value={appointmentForm.time}
                    onChange={(e) => setAppointmentForm(prev => ({ ...prev, time: e.target.value }))}
                    required
                  >
                    <option value="">Selecciona una hora</option>
                    <option value="08:00">08:00 AM</option>
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                    <option value="17:00">05:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Motivo de la Consulta
                </label>
                <textarea
                  rows={3}
                  className="block w-full rounded-md border-neutral-300 text-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholder="Describe brevemente el motivo de tu consulta..."
                  value={appointmentForm.reason}
                  onChange={(e) => setAppointmentForm(prev => ({ ...prev, reason: e.target.value }))}
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full sm:w-auto"
                  size="sm"
                >
                  Cancelar
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-full sm:w-auto"
                  size="sm"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsPage;