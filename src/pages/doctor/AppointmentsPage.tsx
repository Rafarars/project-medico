import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { format } from 'date-fns';
import { Calendar, Clock, User, FileText, Video, X, Filter } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const AppointmentsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [view, setView] = useState<'timeGridWeek' | 'dayGridMonth'>('timeGridWeek');
  const [filter, setFilter] = useState('all');

  // Mock appointments data
  const appointments = [
    {
      id: 1,
      title: 'María García - Control Prenatal',
      start: '2024-03-20T09:00:00',
      end: '2024-03-20T10:00:00',
      status: 'confirmed',
      type: 'Presencial',
      patient: {
        name: 'María García',
        phone: '+1234567890',
        email: 'maria@example.com'
      }
    },
    // Add more mock appointments...
  ];

  const handleDateSelect = (selectInfo: any) => {
    setSelectedDate(selectInfo.start);
    setIsModalOpen(true);
  };

  const handleEventDrop = (dropInfo: any) => {
    // Handle appointment rescheduling
    console.log('Event dropped:', dropInfo);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h1 className="font-heading text-2xl font-bold text-neutral-900">Agenda de Citas</h1>
          <p className="text-neutral-600">Gestiona tus citas y horarios</p>
        </div>
        <div className="flex space-x-2">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setView('timeGridWeek')}
              className={`rounded-l-md px-4 py-2 text-sm font-medium ${
                view === 'timeGridWeek'
                  ? 'bg-primary-50 text-primary-700'
                  : 'bg-white text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              Semana
            </button>
            <button
              onClick={() => setView('dayGridMonth')}
              className={`rounded-r-md px-4 py-2 text-sm font-medium ${
                view === 'dayGridMonth'
                  ? 'bg-primary-50 text-primary-700'
                  : 'bg-white text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              Mes
            </button>
          </div>
          <Button
            variant="primary"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center"
          >
            <Calendar size={16} className="mr-2" />
            Nueva Cita
          </Button>
        </div>
      </div>

      <Card>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-neutral-500" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-md border-neutral-300 text-sm"
            >
              <option value="all">Todas las citas</option>
              <option value="confirmed">Confirmadas</option>
              <option value="pending">Pendientes</option>
              <option value="cancelled">Canceladas</option>
            </select>
          </div>
        </div>

        <div className="h-[600px]">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={view}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: '',
            }}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            events={appointments}
            select={handleDateSelect}
            eventDrop={handleEventDrop}
            slotMinTime="08:00:00"
            slotMaxTime="20:00:00"
            allDaySlot={false}
          />
        </div>
      </Card>

      {/* New Appointment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg rounded-lg bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading text-xl font-semibold">Nueva Cita</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-full p-1 text-neutral-500 hover:bg-neutral-100"
              >
                <X size={20} />
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700">
                  Paciente
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center rounded-l-md border border-r-0 border-neutral-300 bg-neutral-50 px-3 text-neutral-500">
                    <User size={16} />
                  </span>
                  <select className="block w-full rounded-r-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500">
                    <option>Seleccionar paciente</option>
                    <option>María García</option>
                    <option>Ana López</option>
                    {/* Add more patients */}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700">
                    Fecha
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center rounded-l-md border border-r-0 border-neutral-300 bg-neutral-50 px-3 text-neutral-500">
                      <Calendar size={16} />
                    </span>
                    <input
                      type="date"
                      className="block w-full rounded-r-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
                      value={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''}
                      onChange={(e) => setSelectedDate(new Date(e.target.value))}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700">
                    Hora
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center rounded-l-md border border-r-0 border-neutral-300 bg-neutral-50 px-3 text-neutral-500">
                      <Clock size={16} />
                    </span>
                    <input
                      type="time"
                      className="block w-full rounded-r-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">
                  Tipo de Consulta
                </label>
                <div className="mt-1 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    className="flex items-center justify-center rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                  >
                    <User size={16} className="mr-2" />
                    Presencial
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                  >
                    <Video size={16} className="mr-2" />
                    Virtual
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">
                  Notas
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center rounded-l-md border border-r-0 border-neutral-300 bg-neutral-50 px-3 text-neutral-500">
                    <FileText size={16} />
                  </span>
                  <textarea
                    rows={3}
                    className="block w-full rounded-r-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
                    placeholder="Agregar notas sobre la consulta..."
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                >
                  Agendar Cita
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