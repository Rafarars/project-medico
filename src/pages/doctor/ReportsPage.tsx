import { useState } from 'react';
import { FileText, Download, Filter, Calendar, User, Search } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const ReportsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [reportType, setReportType] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  // Form state for new report
  const [reportForm, setReportForm] = useState({
    patient: '',
    type: '',
    startDate: '',
    endDate: '',
    notes: ''
  });

  // Mock reports data - now using state to allow updates
  const [reports, setReports] = useState([
    {
      id: 1,
      patient: 'María García',
      type: 'Resultados de Laboratorio',
      date: '2024-03-19',
      doctor: 'Dra. Ana Méndez',
      status: 'completed',
    },
    {
      id: 2,
      patient: 'Ana López',
      type: 'Evolución Mensual',
      date: '2024-03-18',
      doctor: 'Dra. Ana Méndez',
      status: 'pending',
    },
  ]);

  const handleGenerateReport = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!reportForm.patient || !reportForm.type) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    // Create new report object
    const newReport = {
      id: reports.length + 1,
      patient: reportForm.patient,
      type: reportForm.type,
      date: new Date().toISOString().split('T')[0], // Today's date
      doctor: 'Dra. Ana Méndez', // Current doctor
      status: 'completed',
      dateRange: {
        start: reportForm.startDate,
        end: reportForm.endDate
      },
      notes: reportForm.notes
    };

    // Add new report to the list
    setReports(prevReports => [...prevReports, newReport]);

    // Reset form
    setReportForm({
      patient: '',
      type: '',
      startDate: '',
      endDate: '',
      notes: ''
    });

    // Close modal and show success message
    handleModalClose();
    alert('Informe generado exitosamente');

    console.log('New report generated:', newReport);
  };

  // Handle report download
  const handleDownloadReport = (report: any) => {
    // Create a simple text content for the report
    const reportContent = `
INFORME MÉDICO
==============

Paciente: ${report.patient}
Tipo de Informe: ${report.type}
Fecha de Generación: ${report.date}
Doctor: ${report.doctor}
Estado: ${report.status === 'completed' ? 'Completado' : 'Pendiente'}

${report.dateRange?.start ? `Período: ${report.dateRange.start} - ${report.dateRange.end}` : ''}
${report.notes ? `Notas: ${report.notes}` : ''}

---
Generado por Sistema de Monitoreo Ginecológico
    `.trim();

    // Create and download the file
    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `informe_${report.patient.replace(/\s+/g, '_')}_${report.date}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    console.log('Downloading report:', report);
  };

  // Filter reports based on search term and filter
  const filteredReports = reports.filter(report => {
    const matchesSearch = report.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || report.status === filter;
    return matchesSearch && matchesFilter;
  });

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    // Reset form when closing modal
    setReportForm({
      patient: '',
      type: '',
      startDate: '',
      endDate: '',
      notes: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h1 className="font-heading text-2xl font-bold text-neutral-900">Informes Médicos</h1>
          <p className="text-neutral-600">Genera y gestiona informes médicos</p>
        </div>
        <Button
          variant="primary"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center"
        >
          <FileText size={16} className="mr-2" />
          Nuevo Informe
        </Button>
      </div>

      <Card>
        <div className="mb-6 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="flex flex-1 items-center space-x-4">
            <div className="relative flex-1 md:max-w-xs">
              <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                placeholder="Buscar informes..."
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
                <option value="completed">Completados</option>
                <option value="pending">Pendientes</option>
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
                  Tipo de Informe
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                  Fecha
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                  Doctor
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                  Estado
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 bg-white">
              {filteredReports.map((report) => (
                <tr key={report.id}>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-8 w-8 flex-shrink-0">
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-primary-100 text-primary-600">
                          {report.patient.charAt(0)}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-neutral-900">{report.patient}</div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">
                    {report.type}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">
                    {new Date(report.date).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">
                    {report.doctor}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        report.status === 'completed'
                          ? 'bg-success-100 text-success-800'
                          : 'bg-warning-100 text-warning-800'
                      }`}
                    >
                      {report.status === 'completed' ? 'Completado' : 'Pendiente'}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <button
                      onClick={() => handleDownloadReport(report)}
                      className="text-primary-600 hover:text-primary-900"
                      title="Descargar informe"
                    >
                      <Download size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* New Report Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg rounded-lg bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading text-xl font-semibold">Generar Nuevo Informe</h2>
              <button
                onClick={handleModalClose}
                className="rounded-full p-1 text-neutral-500 hover:bg-neutral-100"
              >
                <FileText size={20} />
              </button>
            </div>

            <form onSubmit={handleGenerateReport} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700">
                  Paciente
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center rounded-l-md border border-r-0 border-neutral-300 bg-neutral-50 px-3 text-neutral-500">
                    <User size={16} />
                  </span>
                  <select
                    value={reportForm.patient}
                    onChange={(e) => setReportForm({...reportForm, patient: e.target.value})}
                    className="block w-full rounded-r-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option value="">Seleccionar paciente</option>
                    <option value="María García">María García</option>
                    <option value="Ana López">Ana López</option>
                    <option value="Carmen Rodríguez">Carmen Rodríguez</option>
                    <option value="Isabel Martínez">Isabel Martínez</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">
                  Tipo de Informe
                </label>
                <select
                  value={reportForm.type}
                  onChange={(e) => setReportForm({...reportForm, type: e.target.value})}
                  className="mt-1 block w-full rounded-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="">Seleccionar tipo</option>
                  <option value="Resultados de Laboratorio">Resultados de Laboratorio</option>
                  <option value="Evolución Mensual">Evolución Mensual</option>
                  <option value="Resumen de Tratamiento">Resumen de Tratamiento</option>
                  <option value="Informe de Consulta">Informe de Consulta</option>
                  <option value="Historial Clínico">Historial Clínico</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700">
                    Fecha Inicio
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center rounded-l-md border border-r-0 border-neutral-300 bg-neutral-50 px-3 text-neutral-500">
                      <Calendar size={16} />
                    </span>
                    <input
                      type="date"
                      value={reportForm.startDate}
                      onChange={(e) => setReportForm({...reportForm, startDate: e.target.value})}
                      className="block w-full rounded-r-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700">
                    Fecha Fin
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center rounded-l-md border border-r-0 border-neutral-300 bg-neutral-50 px-3 text-neutral-500">
                      <Calendar size={16} />
                    </span>
                    <input
                      type="date"
                      value={reportForm.endDate}
                      onChange={(e) => setReportForm({...reportForm, endDate: e.target.value})}
                      className="block w-full rounded-r-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">
                  Notas Adicionales
                </label>
                <textarea
                  rows={3}
                  value={reportForm.notes}
                  onChange={(e) => setReportForm({...reportForm, notes: e.target.value})}
                  className="mt-1 block w-full rounded-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
                  placeholder="Observaciones o notas adicionales para el informe..."
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={handleModalClose}
                >
                  Cancelar
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                >
                  Generar Informe
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;