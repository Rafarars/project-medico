import { useState } from 'react';
import { 
  Plus, Search, Filter, FileText, Clock, Calendar, AlertCircle,
  CheckCircle, XCircle, MoreVertical, Download 
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const TreatmentsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('active');

  // Form state for new treatment
  const [treatmentForm, setTreatmentForm] = useState({
    patient: '',
    medication: '',
    dosage: '',
    frequency: '',
    startDate: '',
    endDate: '',
    notes: ''
  });

  // Mock treatments data - now using state to allow updates
  const [treatments, setTreatments] = useState([
    {
      id: 1,
      patient: 'María García',
      medication: 'Ácido Fólico',
      dosage: '5mg',
      frequency: 'Diario',
      startDate: '2024-03-01',
      endDate: '2024-06-01',
      status: 'active',
      adherence: 85,
      notes: 'Tomar con el desayuno',
    },
    // Add more mock treatments...
  ]);

  // Handle form submission
  const handleTreatmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!treatmentForm.patient || !treatmentForm.medication || !treatmentForm.dosage || !treatmentForm.frequency) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    // Create new treatment object
    const newTreatment = {
      id: treatments.length + 1,
      patient: treatmentForm.patient,
      medication: treatmentForm.medication,
      dosage: treatmentForm.dosage,
      frequency: treatmentForm.frequency,
      startDate: treatmentForm.startDate || new Date().toISOString().split('T')[0],
      endDate: treatmentForm.endDate,
      status: 'active',
      adherence: 0, // New treatments start with 0% adherence
      notes: treatmentForm.notes,
    };

    // Add new treatment to the list
    setTreatments(prevTreatments => [...prevTreatments, newTreatment]);

    // Reset form
    setTreatmentForm({
      patient: '',
      medication: '',
      dosage: '',
      frequency: '',
      startDate: '',
      endDate: '',
      notes: ''
    });

    // Close modal and show success message
    setIsModalOpen(false);
    alert('Tratamiento guardado exitosamente');

    console.log('New treatment added:', newTreatment);
  };

  // Filter treatments based on search term and filter
  const filteredTreatments = treatments.filter(treatment => {
    const matchesSearch = treatment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         treatment.medication.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || treatment.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h1 className="font-heading text-2xl font-bold text-neutral-900">Tratamientos</h1>
          <p className="text-neutral-600">Gestiona los tratamientos de tus pacientes</p>
        </div>
        <Button
          variant="primary"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center"
        >
          <Plus size={16} className="mr-2" />
          Nuevo Tratamiento
        </Button>
      </div>

      <Card>
        <div className="mb-6 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="flex flex-1 items-center space-x-4">
            <div className="relative flex-1 md:max-w-xs">
              <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                placeholder="Buscar tratamientos..."
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
                <option value="all">Todos</option>
                <option value="active">Activos</option>
                <option value="completed">Completados</option>
                <option value="cancelled">Cancelados</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                  Paciente
                </th>
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
                  Duración
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                  Adherencia
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 bg-white">
              {filteredTreatments.map((treatment) => (
                <tr key={treatment.id}>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-8 w-8 flex-shrink-0">
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-primary-100 text-primary-600">
                          {treatment.patient.charAt(0)}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-neutral-900">{treatment.patient}</div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">
                    {treatment.medication}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">
                    {treatment.dosage}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">
                    {treatment.frequency}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1 text-neutral-500" />
                      <span>{new Date(treatment.startDate).toLocaleDateString()}</span>
                      <span className="mx-2">-</span>
                      <span>{new Date(treatment.endDate).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      treatment.status === 'active'
                        ? 'bg-success-100 text-success-800'
                        : treatment.status === 'completed'
                        ? 'bg-neutral-100 text-neutral-800'
                        : 'bg-error-100 text-error-800'
                    }`}>
                      {treatment.status === 'active' && <CheckCircle size={12} className="mr-1" />}
                      {treatment.status === 'completed' && <CheckCircle size={12} className="mr-1" />}
                      {treatment.status === 'cancelled' && <XCircle size={12} className="mr-1" />}
                      {treatment.status.charAt(0).toUpperCase() + treatment.status.slice(1)}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-2 w-16 overflow-hidden rounded-full bg-neutral-200">
                        <div
                          className="h-full bg-success-500"
                          style={{ width: `${treatment.adherence}%` }}
                        />
                      </div>
                      <span className="ml-2 text-sm text-neutral-500">{treatment.adherence}%</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <button className="text-neutral-500 hover:text-neutral-700">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* New Treatment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg rounded-lg bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading text-xl font-semibold">Nuevo Tratamiento</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-full p-1 text-neutral-500 hover:bg-neutral-100"
              >
                <XCircle size={20} />
              </button>
            </div>

            <form onSubmit={handleTreatmentSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700">
                  Paciente
                </label>
                <select
                  value={treatmentForm.patient}
                  onChange={(e) => setTreatmentForm({...treatmentForm, patient: e.target.value})}
                  className="mt-1 block w-full rounded-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="">Seleccionar paciente</option>
                  <option value="María García">María García</option>
                  <option value="Ana López">Ana López</option>
                  <option value="Carmen Rodríguez">Carmen Rodríguez</option>
                  <option value="Isabel Martínez">Isabel Martínez</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">
                  Medicamento
                </label>
                <input
                  type="text"
                  value={treatmentForm.medication}
                  onChange={(e) => setTreatmentForm({...treatmentForm, medication: e.target.value})}
                  className="mt-1 block w-full rounded-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
                  placeholder="Nombre del medicamento"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700">
                    Dosis
                  </label>
                  <input
                    type="text"
                    value={treatmentForm.dosage}
                    onChange={(e) => setTreatmentForm({...treatmentForm, dosage: e.target.value})}
                    className="mt-1 block w-full rounded-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
                    placeholder="ej: 5mg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700">
                    Frecuencia
                  </label>
                  <select
                    value={treatmentForm.frequency}
                    onChange={(e) => setTreatmentForm({...treatmentForm, frequency: e.target.value})}
                    className="mt-1 block w-full rounded-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option value="">Seleccionar frecuencia</option>
                    <option value="Diario">Diario</option>
                    <option value="Cada 12 horas">Cada 12 horas</option>
                    <option value="Cada 8 horas">Cada 8 horas</option>
                    <option value="Semanal">Semanal</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700">
                    Fecha Inicio
                  </label>
                  <input
                    type="date"
                    value={treatmentForm.startDate}
                    onChange={(e) => setTreatmentForm({...treatmentForm, startDate: e.target.value})}
                    className="mt-1 block w-full rounded-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700">
                    Fecha Fin
                  </label>
                  <input
                    type="date"
                    value={treatmentForm.endDate}
                    onChange={(e) => setTreatmentForm({...treatmentForm, endDate: e.target.value})}
                    className="mt-1 block w-full rounded-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">
                  Instrucciones Especiales
                </label>
                <textarea
                  rows={3}
                  value={treatmentForm.notes}
                  onChange={(e) => setTreatmentForm({...treatmentForm, notes: e.target.value})}
                  className="mt-1 block w-full rounded-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
                  placeholder="Instrucciones adicionales para el paciente..."
                />
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
                  Guardar Tratamiento
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TreatmentsPage;