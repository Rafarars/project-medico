import { Link } from 'react-router-dom';
import { Heart, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/ui/Button';

const NotFoundPage = () => {
  const { user, isAuthenticated } = useAuth();

  // Determine the correct home route based on authentication and user role
  const getHomeRoute = () => {
    if (!isAuthenticated) {
      return '/';
    }
    return user?.role === 'doctor' ? '/doctor' : '/patient';
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex flex-1 items-center justify-center bg-neutral-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-md">
            <div className="mb-8">
              <Heart className="mx-auto h-16 w-16 text-accent-400" />
              <h1 className="mt-6 font-heading text-6xl font-bold text-neutral-900">404</h1>
              <h2 className="mt-2 font-heading text-2xl font-semibold text-neutral-800">Página no encontrada</h2>
              <p className="mt-4 text-neutral-600">
                Lo sentimos, la página que estás buscando no existe o ha sido movida a otra ubicación.
              </p>
            </div>
            
            <Link to={getHomeRoute()}>
              <Button variant="primary" className="inline-flex items-center">
                <ArrowLeft size={16} className="mr-2" />
                {isAuthenticated ? 'Volver al dashboard' : 'Volver al inicio'}
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFoundPage;