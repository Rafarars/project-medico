import { useState } from 'react';
import { Calendar, Activity, FileText, MessageSquare, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Mock data
const mockNextAppointment = {
  doctor: 'Dra. Ana Méndez',
  date: '2023-05-25',
  time: '10:30',
  type: 'Consulta de seguimiento',
  location: 'Clínica Central, Consultorio 305',
};

const mockTreatments = [
  { id: 1, name: 'Ácido Fólico', dosage: '5mg', frequency: 'Diario', startDate: '2023-04-01', endDate: '2023-07-01', status: 'Activo' },
  { id: 2, name: 'Hierro', dosage: '30mg', frequency: 'Diario', startDate: '2023-04-01', endDate: '2023-07-01', status: 'Activo' },
  { id: 3, name: 'Complejo B', dosage: '1 tableta', frequency: 'Diario', startDate: '2023-04-01', endDate: '2023-07-01', status: 'Activo' },
];

const mockCycleData = {
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Duración del Ciclo (días)',
      data: [28, 29, 27, 30, 28, 29],
      borderColor: 'rgba(26, 115, 232, 1)',
      backgroundColor: 'rgba(26, 115, 232, 0.1)',
      tension: 0.4,
    },
    {
      label: 'Duración de la Menstruación (días)',
      data: [5, 4, 5, 6, 4, 5],
      borderColor: 'rgba(255, 105, 180, 1)',
      backgroundColor: 'rgba(255, 105, 180, 0.1)',
      tension: 0.4,
    },
  ],
};

const mockSymptomsData = {
  labels: ['Dolor Menstrual', 'Dolor de Cabeza', 'Náuseas', 'Fatiga', 'Cambios de Humor', 'Insomnio'],
  datasets: [
    {
      data: [65, 40, 25, 50, 55, 30],
      backgroundColor: [
        'rgba(26, 115, 232, 0.7)',
        'rgba(32, 178, 170, 0.7)',
        'rgba(255, 105, 180, 0.7)',
        'rgba(255, 159, 64, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(255, 205, 86, 0.7)',
      ],
      borderColor: [
        'rgba(26, 115, 232, 1)',
        'rgba(32, 178, 170, 1)',
        'rgba(255, 105, 180, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 205, 86, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const PatientDashboard = () => {
  const [period, setPeriod] = useState<'3months' | '6months'>('6months');
  const navigate = useNavigate();

  // Navigation handlers
  const handleSolicitarCita = () => {
    navigate('/patient/appointments?openModal=true');
  };

  const handleAgendarCita = () => {
    navigate('/patient/appointments?openModal=true');
  };

  const handleRegistrarCiclo = () => {
    navigate('/patient/treatments');
  };

  const handleEnviarMensaje = () => {
    navigate('/patient/messages');
  };

  const handleVerResultados = () => {
    navigate('/patient/treatments');
  };

  const handleVerTodosTratamientos = () => {
    navigate('/patient/treatments');
  };

  const handleRegistrarSintoma = () => {
    alert('Funcionalidad de registro de síntomas - En desarrollo');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h1 className="font-heading text-2xl font-bold text-neutral-900">Mi Dashboard</h1>
          <p className="text-neutral-600">Bienvenida de vuelta, aquí está el resumen de tu salud</p>
        </div>
        <div>
          <Button variant="primary" className="inline-flex items-center" onClick={handleSolicitarCita}>
            <Plus size={16} className="mr-2" />
            Solicitar Cita
          </Button>
        </div>
      </div>
      
      {/* Top cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Next appointment */}
        <Card className="col-span-1 md:col-span-2">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="mb-1 font-heading text-lg font-semibold text-neutral-900">Próxima Cita</h2>
              <p className="text-sm text-neutral-600">Tu siguiente visita programada</p>
            </div>
            <div className="rounded-full bg-primary-100 p-2 text-primary-600">
              <Calendar size={20} />
            </div>
          </div>
          
          <div className="mt-4 rounded-md border border-primary-100 bg-primary-50 p-4">
            <div className="mb-3 flex items-center">
              <h3 className="text-lg font-medium text-primary-800">{mockNextAppointment.doctor}</h3>
              <span className="ml-2 rounded-full bg-success-100 px-2 py-0.5 text-xs font-medium text-success-700">
                Confirmada
              </span>
            </div>
            
            <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
              <div>
                <p className="text-xs font-medium text-neutral-500">Fecha</p>
                <p className="text-sm font-medium text-neutral-900">
                  {new Date(mockNextAppointment.date).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-neutral-500">Hora</p>
                <p className="text-sm font-medium text-neutral-900">{mockNextAppointment.time}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-neutral-500">Tipo</p>
                <p className="text-sm font-medium text-neutral-900">{mockNextAppointment.type}</p>
              </div>
            </div>
            
            <div>
              <p className="text-xs font-medium text-neutral-500">Ubicación</p>
              <p className="text-sm font-medium text-neutral-900">{mockNextAppointment.location}</p>
            </div>
            
            <div className="mt-4 flex space-x-2">
              <Button variant="primary" size="sm">
                Confirmar
              </Button>
              <Button variant="outline" size="sm">
                Reprogramar
              </Button>
            </div>
          </div>
        </Card>
        
        {/* Quick actions */}
        <Card>
          <h2 className="mb-4 font-heading text-lg font-semibold text-neutral-900">Acciones Rápidas</h2>
          <div className="space-y-3">
            <button onClick={handleAgendarCita} className="flex w-full items-center rounded-md bg-primary-50 p-3 text-primary-700 transition hover:bg-primary-100">
              <Calendar size={20} className="mr-3" />
              <span className="text-sm font-medium">Agendar Cita</span>
            </button>
            <button onClick={handleRegistrarCiclo} className="flex w-full items-center rounded-md bg-secondary-50 p-3 text-secondary-700 transition hover:bg-secondary-100">
              <Activity size={20} className="mr-3" />
              <span className="text-sm font-medium">Registrar Ciclo</span>
            </button>
            <button onClick={handleEnviarMensaje} className="flex w-full items-center rounded-md bg-accent-50 p-3 text-accent-700 transition hover:bg-accent-100">
              <MessageSquare size={20} className="mr-3" />
              <span className="text-sm font-medium">Enviar Mensaje</span>
            </button>
            <button onClick={handleVerResultados} className="flex w-full items-center rounded-md bg-neutral-100 p-3 text-neutral-700 transition hover:bg-neutral-200">
              <FileText size={20} className="mr-3" />
              <span className="text-sm font-medium">Ver Resultados</span>
            </button>
          </div>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Cycle tracking chart */}
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold text-neutral-900">Seguimiento de Ciclo</h2>
            <div className="inline-flex rounded-md shadow-sm">
              <button 
                onClick={() => setPeriod('3months')}
                className={`rounded-l-md px-3 py-1 text-xs font-medium ${
                  period === '3months' 
                    ? 'bg-primary-50 text-primary-700 ring-1 ring-inset ring-primary-500' 
                    : 'bg-white text-neutral-700 ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50'
                }`}
              >
                3 Meses
              </button>
              <button 
                onClick={() => setPeriod('6months')}
                className={`rounded-r-md px-3 py-1 text-xs font-medium ${
                  period === '6months' 
                    ? 'bg-primary-50 text-primary-700 ring-1 ring-inset ring-primary-500' 
                    : 'bg-white text-neutral-700 ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50'
                }`}
              >
                6 Meses
              </button>
            </div>
          </div>
          <div className="h-64">
            <Line 
              data={mockCycleData}
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
        
        {/* Symptoms chart */}
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold text-neutral-900">Síntomas Registrados</h2>
            <button onClick={handleRegistrarSintoma} className="text-sm font-medium text-primary-600 hover:text-primary-700">
              Registrar Nuevo
            </button>
          </div>
          <div className="flex h-64 items-center justify-center">
            <div className="h-full w-full max-w-[230px]">
              <Doughnut 
                data={mockSymptomsData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                      align: 'center',
                    },
                  },
                }}
              />
            </div>
          </div>
        </Card>
      </div>
      
      {/* Current treatments */}
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold text-neutral-900">Tratamientos Activos</h2>
          <button onClick={handleVerTodosTratamientos} className="text-sm font-medium text-primary-600 hover:text-primary-700">
            Ver Todos
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                  Medicamento
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                  Dosis
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                  Frecuencia
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                  Fecha Inicio
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                  Fecha Fin
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 bg-white">
              {mockTreatments.map((treatment) => (
                <tr key={treatment.id}>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm font-medium text-neutral-900">{treatment.name}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-neutral-600">{treatment.dosage}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-neutral-600">{treatment.frequency}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-neutral-600">
                      {new Date(treatment.startDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-neutral-600">
                      {new Date(treatment.endDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="inline-flex rounded-full bg-success-100 px-2 py-1 text-xs font-medium text-success-700">
                      {treatment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default PatientDashboard;