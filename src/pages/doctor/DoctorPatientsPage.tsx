import { useState } from 'react';
import { 
  Plus, Search, Filter, User, Phone, Mail, Calendar, 
  MoreVertical, Edit, Eye, MessageSquare, FileText 
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const DoctorPatientsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  // Mock patients data
  const patients = [
    {
      id: 1,
      name: 'María García',
      email: 'maria.garcia@email.com',
      phone: '+1 (555) 123-4567',
      age: 28,
      lastVisit: '2024-03-15',
      nextAppointment: '2024-03-25',
      status: 'active',
      condition: 'Control Prenatal',
      riskLevel: 'low'
    },
    {
      id: 2,
      name: 'Ana López',
      email: 'ana.lopez@email.com',
      phone: '+1 (555) 234-5678',
      age: 32,
      lastVisit: '2024-03-10',
      nextAppointment: '2024-03-20',
      status: 'active',
      condition: 'Seguimiento Postparto',
      riskLevel: 'medium'
    },
    {
      id: 3,
      name: 'Carmen Rodríguez',
      email: 'carmen.rodriguez@email.com',
      phone: '+1 (555) 345-6789',
      age: 25,
      lastVisit: '2024-03-08',
      nextAppointment: null,
      status: 'inactive',
      condition: 'Consulta General',
      riskLevel: 'low'
    },
    {
      id: 4,
      name: 'Isabel Martínez',
      email: 'isabel.martinez@email.com',
      phone: '+1 (555) 456-7890',
      age: 35,
      lastVisit: '2024-03-12',
      nextAppointment: '2024-03-22',
      status: 'active',
      condition: 'Embarazo de Alto Riesgo',
      riskLevel: 'high'
    }
  ];

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || patient.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-neutral-100 text-neutral-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-neutral-100 text-neutral-800';
      default: return 'bg-neutral-100 text-neutral-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h1 className="font-heading text-2xl font-bold text-neutral-900">Mis Pacientes</h1>
          <p className="text-neutral-600">Gestiona la información de tus pacientes</p>
        </div>
        <Button
          variant="primary"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center"
        >
          <Plus size={16} className="mr-2" />
          Nueva Paciente
        </Button>
      </div>

      <Card>
        <div className="mb-6 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="flex flex-1 items-center space-x-4">
            <div className="relative flex-1 md:max-w-xs">
              <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                placeholder="Buscar pacientes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-md border border-neutral-300 pl-10 focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-neutral-500" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="rounded-md border-neutral-300"
              >
                <option value="all">Todas</option>
                <option value="active">Activas</option>
                <option value="inactive">Inactivas</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                  Paciente
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                  Contacto
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                  Condición
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                  Última Visita
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                  Riesgo
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 bg-white">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-neutral-50">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-primary-100 text-primary-600">
                          <span className="text-lg font-medium">{patient.name.charAt(0)}</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-neutral-900">{patient.name}</div>
                        <div className="text-sm text-neutral-500">{patient.age} años</div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-neutral-900">{patient.email}</div>
                    <div className="text-sm text-neutral-500">{patient.phone}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">
                    {patient.condition}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">
                    {new Date(patient.lastVisit).toLocaleDateString('es-ES')}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusColor(patient.status)}`}>
                      {patient.status === 'active' ? 'Activa' : 'Inactiva'}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getRiskLevelColor(patient.riskLevel)}`}>
                      {patient.riskLevel === 'high' ? 'Alto' : patient.riskLevel === 'medium' ? 'Medio' : 'Bajo'}
                    </span>
                  </td>
                  <td className="relative whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-primary-600 hover:text-primary-900" title="Ver perfil">
                        <Eye size={16} />
                      </button>
                      <button className="text-primary-600 hover:text-primary-900" title="Editar">
                        <Edit size={16} />
                      </button>
                      <button className="text-primary-600 hover:text-primary-900" title="Enviar mensaje">
                        <MessageSquare size={16} />
                      </button>
                      <button className="text-primary-600 hover:text-primary-900" title="Ver historial">
                        <FileText size={16} />
                      </button>
                      <button className="text-neutral-400 hover:text-neutral-600">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPatients.length === 0 && (
          <div className="py-12 text-center">
            <User size={48} className="mx-auto text-neutral-400" />
            <h3 className="mt-2 text-sm font-medium text-neutral-900">No hay pacientes</h3>
            <p className="mt-1 text-sm text-neutral-500">
              {searchTerm ? 'No se encontraron pacientes con ese criterio de búsqueda.' : 'Comienza agregando una nueva paciente.'}
            </p>
          </div>
        )}
      </Card>

      {/* Modal for adding new patient */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-neutral-500 bg-opacity-75 transition-opacity" onClick={() => setIsModalOpen(false)}></div>

            <span className="hidden sm:inline-block sm:h-screen sm:align-middle">&#8203;</span>

            <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
              <div className="mb-4">
                <h3 className="text-lg font-medium leading-6 text-neutral-900">
                  Nueva Paciente
                </h3>
                <p className="mt-1 text-sm text-neutral-500">
                  Agrega una nueva paciente al sistema.
                </p>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
                    placeholder="Nombre de la paciente"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700">
                    Email
                  </label>
                  <input
                    type="email"
                    className="mt-1 block w-full rounded-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
                    placeholder="email@ejemplo.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    className="mt-1 block w-full rounded-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700">
                    Edad
                  </label>
                  <input
                    type="number"
                    min="18"
                    max="100"
                    className="mt-1 block w-full rounded-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
                    placeholder="25"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700">
                    Condición inicial
                  </label>
                  <select className="mt-1 block w-full rounded-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500">
                    <option value="">Seleccionar condición</option>
                    <option value="control-prenatal">Control Prenatal</option>
                    <option value="consulta-general">Consulta General</option>
                    <option value="seguimiento-postparto">Seguimiento Postparto</option>
                    <option value="embarazo-alto-riesgo">Embarazo de Alto Riesgo</option>
                  </select>
                </div>
              </form>

              <div className="mt-6 flex justify-end space-x-3">
                <Button
                  variant="secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    // Handle form submission
                    setIsModalOpen(false);
                  }}
                >
                  Agregar Paciente
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorPatientsPage;
