import { useState } from 'react';
import { Calendar, Users, MessageSquare, Activity, Clock } from 'lucide-react';
import Card from '../../components/ui/Card';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Mock data for dashboard
const mockPatients = [
  { id: 1, name: 'María García', age: 32, lastVisit: '2023-04-15', nextVisit: '2023-05-20', status: 'Activa' },
  { id: 2, name: 'Ana López', age: 28, lastVisit: '2023-04-18', nextVisit: '2023-05-25', status: 'Activa' },
  { id: 3, name: 'Carmen Rodríguez', age: 35, lastVisit: '2023-04-10', nextVisit: '2023-05-15', status: 'Activa' },
  { id: 4, name: 'Laura Martínez', age: 29, lastVisit: '2023-04-05', nextVisit: '2023-05-10', status: 'Activa' },
];

const mockAppointments = [
  { id: 1, title: 'María García - Consulta', start: '2023-05-20T10:00:00', end: '2023-05-20T10:30:00' },
  { id: 2, title: 'Ana López - Revisión', start: '2023-05-20T11:00:00', end: '2023-05-20T11:30:00' },
  { id: 3, title: 'Carmen Rodríguez - Ecografía', start: '2023-05-20T13:30:00', end: '2023-05-20T14:00:00' },
  { id: 4, title: 'Laura Martínez - Control', start: '2023-05-20T15:00:00', end: '2023-05-20T15:30:00' },
  { id: 5, title: 'Juana Pérez - Primera visita', start: '2023-05-21T09:30:00', end: '2023-05-21T10:30:00' },
  { id: 6, title: 'Teresa González - Resultados', start: '2023-05-21T11:30:00', end: '2023-05-21T12:00:00' },
];

const patientChartData = {
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Nuevas Pacientes',
      data: [12, 19, 15, 20, 18, 15],
      backgroundColor: 'rgba(26, 115, 232, 0.5)',
      borderColor: 'rgba(26, 115, 232, 1)',
      borderWidth: 1,
    },
    {
      label: 'Consultas Totales',
      data: [30, 45, 40, 50, 42, 38],
      backgroundColor: 'rgba(32, 178, 170, 0.5)',
      borderColor: 'rgba(32, 178, 170, 1)',
      borderWidth: 1,
    },
  ],
};

const diagnosticsChartData = {
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Revisiones Regulares',
      data: [25, 30, 28, 32, 29, 27],
      borderColor: 'rgba(26, 115, 232, 1)',
      backgroundColor: 'rgba(26, 115, 232, 0.1)',
      tension: 0.4,
    },
    {
      label: 'Tratamientos',
      data: [15, 18, 16, 20, 17, 19],
      borderColor: 'rgba(32, 178, 170, 1)',
      backgroundColor: 'rgba(32, 178, 170, 0.1)',
      tension: 0.4,
    },
    {
      label: 'Procedimientos',
      data: [8, 10, 9, 12, 11, 10],
      borderColor: 'rgba(255, 105, 180, 1)',
      backgroundColor: 'rgba(255, 105, 180, 0.1)',
      tension: 0.4,
    },
  ],
};

const DoctorDashboard = () => {
  const [calendarView, setCalendarView] = useState<'dayGridMonth' | 'timeGridDay'>('timeGridDay');
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h1 className="font-heading text-2xl font-bold text-neutral-900">Dashboard del Doctor</h1>
          <p className="text-neutral-600">Bienvenido de vuelta, aquí está el resumen de tu actividad</p>
        </div>
        <div className="flex space-x-2">
          <button className="rounded-md bg-white px-3 py-2 text-sm font-medium text-neutral-700 shadow-sm ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 transition-colors duration-300">
            Exportar Datos
          </button>
          <button className="rounded-md bg-primary-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700">
            + Nueva Paciente
          </button>
        </div>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="flex items-center space-x-4">
          <div className="rounded-full bg-primary-100 p-3 text-primary-600">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-600">Total Pacientes</p>
            <p className="text-2xl font-bold text-neutral-900">248</p>
          </div>
        </Card>
        
        <Card className="flex items-center space-x-4">
          <div className="rounded-full bg-secondary-100 p-3 text-secondary-600">
            <Calendar size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-600">Citas Hoy</p>
            <p className="text-2xl font-bold text-neutral-900">8</p>
          </div>
        </Card>
        
        <Card className="flex items-center space-x-4">
          <div className="rounded-full bg-accent-100 p-3 text-accent-600">
            <MessageSquare size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-600">Mensajes Nuevos</p>
            <p className="text-2xl font-bold text-neutral-900">12</p>
          </div>
        </Card>
        
        <Card className="flex items-center space-x-4">
          <div className="rounded-full bg-success-100 p-3 text-success-500">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-600">Procedimientos</p>
            <p className="text-2xl font-bold text-neutral-900">56</p>
          </div>
        </Card>
      </div>
      
      {/* Charts and appointments */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Patient stats chart */}
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold text-neutral-900">Estadísticas de Pacientes</h2>
            <div className="inline-flex rounded-md shadow-sm">
              <button className="rounded-l-md bg-white px-3 py-1 text-xs font-medium text-neutral-700 ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 transition-colors duration-300">
                Mensual
              </button>
              <button className="rounded-r-md bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700 ring-1 ring-inset ring-primary-500">
                Semestral
              </button>
            </div>
          </div>
          <div className="h-64">
            <Bar 
              data={patientChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </Card>
        
        {/* Diagnostics chart */}
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold text-neutral-900">Tipos de Atención</h2>
            <div className="inline-flex rounded-md shadow-sm">
              <button className="rounded-l-md bg-white px-3 py-1 text-xs font-medium text-neutral-700 ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 transition-colors duration-300">
                Mensual
              </button>
              <button className="rounded-r-md bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700 ring-1 ring-inset ring-primary-500">
                Semestral
              </button>
            </div>
          </div>
          <div className="h-64">
            <Line 
              data={diagnosticsChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </Card>
      </div>
      
      {/* Calendar and recent patients */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold text-neutral-900">Calendario de Citas</h2>
            <div className="inline-flex rounded-md shadow-sm">
              <button 
                onClick={() => setCalendarView('timeGridDay')}
                className={`rounded-l-md px-3 py-1 text-xs font-medium ${
                  calendarView === 'timeGridDay' 
                    ? 'bg-primary-50 text-primary-700 ring-1 ring-inset ring-primary-500' 
                    : 'bg-white text-neutral-700 ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 transition-colors duration-300'
                }`}
              >
                Día
              </button>
              <button 
                onClick={() => setCalendarView('dayGridMonth')}
                className={`rounded-r-md px-3 py-1 text-xs font-medium ${
                  calendarView === 'dayGridMonth' 
                    ? 'bg-primary-50 text-primary-700 ring-1 ring-inset ring-primary-500' 
                    : 'bg-white text-neutral-700 ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 transition-colors duration-300'
                }`}
              >
                Mes
              </button>
            </div>
          </div>
          <div className="h-96">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView={calendarView}
              headerToolbar={{
                left: '',
                center: 'title',
                right: 'prev,next',
              }}
              events={mockAppointments}
              height="100%"
              eventColor="#1A73E8"
              eventBorderColor="#1559B7"
              nowIndicator={true}
              dayMaxEvents={true}
              selectable={true}
              selectMirror={true}
            />
          </div>
        </Card>
        
        {/* Recent patients */}
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold text-neutral-900">Pacientes Recientes</h2>
            <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
              Ver Todos
            </button>
          </div>
          <div className="space-y-4">
            {mockPatients.map((patient) => (
              <div key={patient.id} className="flex items-center rounded-md border border-neutral-100 bg-white p-3 shadow-sm transition-colors duration-300">
                <div className="mr-3 h-10 w-10 overflow-hidden rounded-full bg-neutral-200">
                  <div className="flex h-full w-full items-center justify-center bg-primary-100 text-primary-600">
                    <span className="text-lg font-medium">{patient.name.charAt(0)}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-neutral-900">{patient.name}</h3>
                  <div className="flex items-center space-x-2 text-xs text-neutral-500">
                    <span>{patient.age} años</span>
                    <span>•</span>
                    <span className="flex items-center">
                      <Clock size={12} className="mr-1" />
                      Próxima: {new Date(patient.nextVisit).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <button className="ml-2 rounded-md bg-primary-50 px-2 py-1 text-xs font-medium text-primary-700 hover:bg-primary-100">
                  Ver
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DoctorDashboard;