import { useState } from 'react';
import { Pill, Clock, CheckCircle, AlertCircle, Calendar, Plus, X } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const TreatmentsPage = () => {
  const [filter, setFilter] = useState('active');
  const [selectedTreatment, setSelectedTreatment] = useState<number | null>(null);

  // Mock treatments data
  const treatments = [
    {
      id: 1,
      medication: 'Ácido Fólico',
      dosage: '5mg',
      frequency: 'Diario',
      startDate: '2024-03-01',
      endDate: '2024-06-01',
      status: 'active',
      adherence: 85,
      instructions: 'Tomar con el desayuno, preferiblemente con jugo de naranja',
      doctor: 'Dra. Ana Méndez',
      nextDose: '2024-03-20T08:00:00',
      totalDoses: 90,
      takenDoses: 76,
    },
    {
      id: 2,
      medication: 'Hierro',
      dosage: '30mg',
      frequency: 'Diario',
      startDate: '2024-03-01',
      endDate: '2024-05-01',
      status: 'active',
      adherence: 92,
      instructions: 'Tomar con el almuerzo, evitar lácteos',
      doctor: 'Dra. Ana Méndez',
      nextDose: '2024-03-20T12:00:00',
      totalDoses: 60,
      takenDoses: 55,
    },
    {
      id: 3,
      medication: 'Complejo B',
      dosage: '1 tableta',
      frequency: 'Diario',
      startDate: '2024-02-01',
      endDate: '2024-03-15',
      status: 'completed',
      adherence: 98,
      instructions: 'Tomar en la mañana',
      doctor: 'Dra. Ana Méndez',
      totalDoses: 42,
      takenDoses: 41,
    },
  ];

  const filteredTreatments = treatments.filter(treatment => {
    if (filter === 'all') return true;
    return treatment.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success-100 text-success-800';
      case 'completed': return 'bg-neutral-100 text-neutral-800';
      case 'paused': return 'bg-warning-100 text-warning-800';
      case 'cancelled': return 'bg-error-100 text-error-800';
      default: return 'bg-neutral-100 text-neutral-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'completed': return 'Completado';
      case 'paused': return 'Pausado';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const getAdherenceColor = (adherence: number) => {
    if (adherence >= 90) return 'text-success-600';
    if (adherence >= 70) return 'text-warning-600';
    return 'text-error-600';
  };

  const markAsTaken = (treatmentId: number) => {
    // Here you would update the treatment status
    console.log('Marking treatment as taken:', treatmentId);
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:items-center lg:space-y-0">
        <div>
          <h1 className="font-heading text-xl lg:text-2xl font-bold text-neutral-900">Mis Tratamientos</h1>
          <p className="text-sm lg:text-base text-neutral-600">Sigue tus medicamentos y tratamientos</p>
        </div>
        <div className="flex space-x-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-md border-neutral-300 text-sm"
          >
            <option value="all">Todos</option>
            <option value="active">Activos</option>
            <option value="completed">Completados</option>
            <option value="paused">Pausados</option>
          </select>
        </div>
      </div>

      {/* Today's medications */}
      {filter === 'active' && (
        <Card>
          <h2 className="mb-4 font-heading text-base lg:text-lg font-semibold text-neutral-900">Medicamentos de Hoy</h2>
          <div className="space-y-3">
            {treatments
              .filter(t => t.status === 'active')
              .map((treatment) => (
                <div key={treatment.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-lg border border-neutral-200 bg-neutral-50 p-3 lg:p-4 space-y-3 sm:space-y-0">
                  <div className="flex items-start space-x-3">
                    <div className="rounded-full bg-primary-100 p-2 text-primary-600 flex-shrink-0">
                      <Pill size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-neutral-900 text-sm lg:text-base">{treatment.medication}</h3>
                      <p className="text-xs lg:text-sm text-neutral-600 break-words">{treatment.dosage} - {treatment.instructions}</p>
                      <p className="text-xs text-neutral-500">
                        Próxima dosis: {new Date(treatment.nextDose).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => markAsTaken(treatment.id)}
                    className="inline-flex items-center w-full sm:w-auto text-xs lg:text-sm"
                  >
                    <CheckCircle size={14} className="mr-1" />
                    Marcar como Tomado
                  </Button>
                </div>
              ))}
          </div>
        </Card>
      )}

      {/* All treatments */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filteredTreatments.map((treatment) => (
          <Card key={treatment.id} className="cursor-pointer" onClick={() => setSelectedTreatment(treatment.id)}>
            <div className="mb-3 flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-neutral-900 text-sm lg:text-base truncate">{treatment.medication}</h3>
                <p className="text-xs lg:text-sm text-neutral-600">{treatment.dosage}</p>
              </div>
              <span className={`rounded-full px-2 py-1 text-xs font-medium whitespace-nowrap ml-2 ${getStatusColor(treatment.status)}`}>
                {getStatusText(treatment.status)}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-xs lg:text-sm text-neutral-600">
                <Clock size={14} className="mr-2 text-neutral-400 flex-shrink-0" />
                <span>{treatment.frequency}</span>
              </div>

              <div className="flex items-start text-xs lg:text-sm text-neutral-600">
                <Calendar size={14} className="mr-2 text-neutral-400 flex-shrink-0 mt-0.5" />
                <span className="break-words">
                  {new Date(treatment.startDate).toLocaleDateString()} - {new Date(treatment.endDate).toLocaleDateString()}
                </span>
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between text-xs lg:text-sm">
                  <span className="text-neutral-600">Adherencia</span>
                  <span className={`font-medium ${getAdherenceColor(treatment.adherence)}`}>
                    {treatment.adherence}%
                  </span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-neutral-200">
                  <div
                    className={`h-full transition-all duration-300 ${
                      treatment.adherence >= 90 ? 'bg-success-500' :
                      treatment.adherence >= 70 ? 'bg-warning-500' : 'bg-error-500'
                    }`}
                    style={{ width: `${treatment.adherence}%` }}
                  />
                </div>
              </div>

              {treatment.status === 'active' && (
                <div className="mt-3 text-xs text-neutral-500">
                  {treatment.takenDoses} de {treatment.totalDoses} dosis tomadas
                </div>
              )}
            </div>

            {treatment.instructions && (
              <div className="mt-3 rounded-md bg-neutral-50 p-2">
                <p className="text-xs text-neutral-600 break-words">{treatment.instructions}</p>
              </div>
            )}

            <div className="mt-3 text-xs text-neutral-500">
              Prescrito por: {treatment.doctor}
            </div>
          </Card>
        ))}
      </div>

      {filteredTreatments.length === 0 && (
        <div className="py-8 lg:py-12 text-center">
          <Pill className="mx-auto h-10 w-10 lg:h-12 lg:w-12 text-neutral-400" />
          <h3 className="mt-4 text-base lg:text-lg font-medium text-neutral-900">No hay tratamientos</h3>
          <p className="mt-2 text-sm lg:text-base text-neutral-600">
            No tienes tratamientos {filter === 'active' ? 'activos' : filter} en este momento.
          </p>
        </div>
      )}

      {/* Treatment Detail Modal */}
      {selectedTreatment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-lg rounded-lg bg-white p-4 lg:p-6 max-h-[90vh] overflow-y-auto">
            {(() => {
              const treatment = treatments.find(t => t.id === selectedTreatment);
              if (!treatment) return null;

              return (
                <>
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="font-heading text-lg lg:text-xl font-semibold">{treatment.medication}</h2>
                    <button
                      onClick={() => setSelectedTreatment(null)}
                      className="rounded-full p-1 text-neutral-500 hover:bg-neutral-100"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700">Dosis</label>
                        <p className="text-neutral-900 text-sm lg:text-base">{treatment.dosage}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700">Frecuencia</label>
                        <p className="text-neutral-900 text-sm lg:text-base">{treatment.frequency}</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700">Duración del Tratamiento</label>
                      <p className="text-neutral-900 text-sm lg:text-base">
                        {new Date(treatment.startDate).toLocaleDateString()} - {new Date(treatment.endDate).toLocaleDateString()}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700">Instrucciones</label>
                      <p className="text-neutral-900 text-sm lg:text-base break-words">{treatment.instructions}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700">Progreso</label>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Dosis tomadas: {treatment.takenDoses} de {treatment.totalDoses}</span>
                          <span className={`font-medium ${getAdherenceColor(treatment.adherence)}`}>
                            {treatment.adherence}% adherencia
                          </span>
                        </div>
                        <div className="mt-1 h-2 overflow-hidden rounded-full bg-neutral-200">
                          <div
                            className={`h-full ${
                              treatment.adherence >= 90 ? 'bg-success-500' :
                              treatment.adherence >= 70 ? 'bg-warning-500' : 'bg-error-500'
                            }`}
                            style={{ width: `${(treatment.takenDoses / treatment.totalDoses) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700">Prescrito por</label>
                      <p className="text-neutral-900 text-sm lg:text-base">{treatment.doctor}</p>
                    </div>

                    {treatment.status === 'active' && (
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 pt-4">
                        <Button
                          variant="primary"
                          className="flex-1"
                          onClick={() => markAsTaken(treatment.id)}
                          size="sm"
                        >
                          Marcar Dosis como Tomada
                        </Button>
                        <Button variant="outline" className="flex-1" size="sm">
                          Pausar Tratamiento
                        </Button>
                      </div>
                    )}
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default TreatmentsPage;