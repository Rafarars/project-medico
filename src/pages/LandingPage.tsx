import { Link } from 'react-router-dom';
import { Heart, Calendar, MessageSquare, FileText, ShieldCheck, Clock } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/ui/Button';

const LandingPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 py-20 text-white">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600/90 to-primary-800/90"></div>
            <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center bg-no-repeat opacity-20"></div>
          </div>
          
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 font-heading text-4xl font-bold leading-tight md:text-5xl">
                Monitoreo Ginecológico Integral
              </h1>
              <p className="mb-8 text-lg text-white/90 md:text-xl">
                Plataforma digital para el cuidado de la salud femenina con seguimiento personalizado y comunicación directa con especialistas.
              </p>
              
              <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
                <Link to="/register">
                  <Button variant="accent" size="lg" className="w-full sm:w-auto">
                    Soy Paciente
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" size="lg" className="w-full border-white bg-white/10 text-white hover:bg-white/20 sm:w-auto">
                    Soy Doctor
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
        </section>
        
        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-heading text-3xl font-semibold text-neutral-900 md:text-4xl">
                Características Principales
              </h2>
              <p className="mx-auto max-w-2xl text-neutral-600">
                Nuestra plataforma ofrece herramientas innovadoras para mejorar la atención ginecológica y facilitar la comunicación entre médicos y pacientes.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg">
                <div className="mb-4 inline-flex rounded-full bg-primary-100 p-3 text-primary-600">
                  <Calendar size={24} />
                </div>
                <h3 className="mb-3 font-heading text-xl font-semibold text-neutral-900">Agenda de Citas</h3>
                <p className="text-neutral-600">
                  Programa y gestiona citas médicas de forma sencilla, con recordatorios automáticos y opciones de reprogramación.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg">
                <div className="mb-4 inline-flex rounded-full bg-secondary-100 p-3 text-secondary-600">
                  <FileText size={24} />
                </div>
                <h3 className="mb-3 font-heading text-xl font-semibold text-neutral-900">Historial Clínico Digital</h3>
                <p className="text-neutral-600">
                  Accede a tu historial médico completo, resultados de exámenes y seguimiento de tratamientos en cualquier momento y lugar.
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg">
                <div className="mb-4 inline-flex rounded-full bg-accent-100 p-3 text-accent-600">
                  <MessageSquare size={24} />
                </div>
                <h3 className="mb-3 font-heading text-xl font-semibold text-neutral-900">Chat Seguro</h3>
                <p className="text-neutral-600">
                  Comunícate directamente con tu médico a través de nuestro sistema de mensajería seguro y confidencial.
                </p>
              </div>
              
              {/* Feature 4 */}
              <div className="rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg">
                <div className="mb-4 inline-flex rounded-full bg-primary-100 p-3 text-primary-600">
                  <Clock size={24} />
                </div>
                <h3 className="mb-3 font-heading text-xl font-semibold text-neutral-900">Seguimiento de Ciclos</h3>
                <p className="text-neutral-600">
                  Lleva un registro detallado de tus ciclos menstruales, síntomas y cambios hormonales para un mejor diagnóstico.
                </p>
              </div>
              
              {/* Feature 5 */}
              <div className="rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg">
                <div className="mb-4 inline-flex rounded-full bg-secondary-100 p-3 text-secondary-600">
                  <Heart size={24} />
                </div>
                <h3 className="mb-3 font-heading text-xl font-semibold text-neutral-900">Monitoreo de Salud</h3>
                <p className="text-neutral-600">
                  Visualiza gráficos y estadísticas personalizadas sobre tu salud ginecológica para un mejor entendimiento de tu bienestar.
                </p>
              </div>
              
              {/* Feature 6 */}
              <div className="rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg">
                <div className="mb-4 inline-flex rounded-full bg-accent-100 p-3 text-accent-600">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="mb-3 font-heading text-xl font-semibold text-neutral-900">Privacidad Garantizada</h3>
                <p className="text-neutral-600">
                  Todos tus datos están protegidos con los más altos estándares de seguridad y encriptación, cumpliendo con normativas HIPAA.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="bg-neutral-50 py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-heading text-3xl font-semibold text-neutral-900 md:text-4xl">
                Cómo Funciona
              </h2>
              <p className="mx-auto max-w-2xl text-neutral-600">
                Nuestro sistema está diseñado para ser intuitivo y fácil de usar, tanto para médicos como para pacientes.
              </p>
            </div>
            
            <div className="relative">
              <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-primary-200 md:block"></div>
              
              <div className="space-y-12">
                {/* Step 1 */}
                <div className="relative md:ml-0 md:mr-auto md:w-5/12 md:pl-0 md:pr-12">
                  <div className="absolute right-0 top-5 hidden h-4 w-4 -translate-y-1/2 translate-x-1/2 rounded-full bg-primary-500 md:block"></div>
                  <div className="rounded-lg bg-white p-6 shadow-md">
                    <div className="mb-4 flex items-center">
                      <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-600 md:hidden">
                        <span className="text-lg font-bold">1</span>
                      </div>
                      <h3 className="font-heading text-xl font-semibold text-neutral-900">Registro</h3>
                    </div>
                    <p className="text-neutral-600">
                      Crea tu cuenta como médico o paciente y completa tu perfil con la información necesaria para comenzar.
                    </p>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="relative md:ml-auto md:mr-0 md:w-5/12 md:pl-12 md:pr-0">
                  <div className="absolute left-0 top-5 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500 md:block"></div>
                  <div className="rounded-lg bg-white p-6 shadow-md">
                    <div className="mb-4 flex items-center">
                      <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-600 md:hidden">
                        <span className="text-lg font-bold">2</span>
                      </div>
                      <h3 className="font-heading text-xl font-semibold text-neutral-900">Conexión</h3>
                    </div>
                    <p className="text-neutral-600">
                      Pacientes pueden conectar con su médico de confianza, mientras que los médicos pueden gestionar su lista de pacientes.
                    </p>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="relative md:ml-0 md:mr-auto md:w-5/12 md:pl-0 md:pr-12">
                  <div className="absolute right-0 top-5 hidden h-4 w-4 -translate-y-1/2 translate-x-1/2 rounded-full bg-primary-500 md:block"></div>
                  <div className="rounded-lg bg-white p-6 shadow-md">
                    <div className="mb-4 flex items-center">
                      <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-600 md:hidden">
                        <span className="text-lg font-bold">3</span>
                      </div>
                      <h3 className="font-heading text-xl font-semibold text-neutral-900">Monitoreo</h3>
                    </div>
                    <p className="text-neutral-600">
                      Las pacientes registran su información de salud, ciclos y síntomas, que pueden ser revisados por su médico para un mejor seguimiento.
                    </p>
                  </div>
                </div>
                
                {/* Step 4 */}
                <div className="relative md:ml-auto md:mr-0 md:w-5/12 md:pl-12 md:pr-0">
                  <div className="absolute left-0 top-5 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500 md:block"></div>
                  <div className="rounded-lg bg-white p-6 shadow-md">
                    <div className="mb-4 flex items-center">
                      <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-600 md:hidden">
                        <span className="text-lg font-bold">4</span>
                      </div>
                      <h3 className="font-heading text-xl font-semibold text-neutral-900">Atención Continua</h3>
                    </div>
                    <p className="text-neutral-600">
                      Programación de citas, mensajes seguros y recordatorios de tratamientos aseguran una atención médica continua y eficiente.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-accent-500 py-16 text-white">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 font-heading text-3xl font-semibold md:text-4xl">
                Comienza tu Viaje hacia una Mejor Salud Ginecológica
              </h2>
              <p className="mb-8 text-lg text-white/90">
                Únete a nuestra plataforma y experimenta una nueva forma de cuidar tu salud reproductiva con el apoyo de profesionales.
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
                <Link to="/register">
                  <Button variant="primary" size="lg" className="w-full bg-white text-accent-600 hover:bg-white/90 sm:w-auto">
                    Crear Cuenta Gratuita
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="w-full border-white bg-transparent text-white hover:bg-white/10 sm:w-auto">
                    Iniciar Sesión
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-heading text-3xl font-semibold text-neutral-900 md:text-4xl">
                Lo Que Dicen Nuestros Usuarios
              </h2>
              <p className="mx-auto max-w-2xl text-neutral-600">
                Descubre cómo nuestra plataforma ha ayudado a médicos y pacientes a mejorar la experiencia de atención ginecológica.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Testimonial 1 */}
              <div className="rounded-lg bg-white p-6 shadow-md">
                <div className="mb-4 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="mb-4 text-neutral-600">
                  "Como ginecóloga, esta plataforma ha revolucionado mi práctica. Ahora puedo dar seguimiento a mis pacientes de forma más efectiva y personalizada."
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 overflow-hidden rounded-full bg-neutral-200">
                    <img src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300" alt="Dra. Laura Méndez" className="h-full w-full object-cover" />
                  </div>
                  <div className="ml-3">
                    <h4 className="font-heading text-sm font-semibold text-neutral-900">Dra. Laura Méndez</h4>
                    <p className="text-xs text-neutral-500">Ginecóloga, 5 años usando GyneCare</p>
                  </div>
                </div>
              </div>
              
              {/* Testimonial 2 */}
              <div className="rounded-lg bg-white p-6 shadow-md">
                <div className="mb-4 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="mb-4 text-neutral-600">
                  "Poder llevar un registro de mis ciclos y síntomas ha sido fundamental para mi diagnóstico. La comunicación directa con mi médica me da tranquilidad y confianza."
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 overflow-hidden rounded-full bg-neutral-200">
                    <img src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=300" alt="Claudia Morales" className="h-full w-full object-cover" />
                  </div>
                  <div className="ml-3">
                    <h4 className="font-heading text-sm font-semibold text-neutral-900">Claudia Morales</h4>
                    <p className="text-xs text-neutral-500">Paciente, 2 años usando GyneCare</p>
                  </div>
                </div>
              </div>
              
              {/* Testimonial 3 */}
              <div className="rounded-lg bg-white p-6 shadow-md">
                <div className="mb-4 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="mb-4 text-neutral-600">
                  "La gestión de citas y recordatorios es excelente. Como obstetra, puedo dar un seguimiento óptimo a mis pacientes embarazadas gracias a esta plataforma."
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 overflow-hidden rounded-full bg-neutral-200">
                    <img src="https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=300" alt="Dr. Carlos Ramírez" className="h-full w-full object-cover" />
                  </div>
                  <div className="ml-3">
                    <h4 className="font-heading text-sm font-semibold text-neutral-900">Dr. Carlos Ramírez</h4>
                    <p className="text-xs text-neutral-500">Obstetra, 3 años usando GyneCare</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default LandingPage;