import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'doctor' | 'patient';
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: 'doctor' | 'patient') => Promise<void>;
  register: (userData: RegisterUserData) => Promise<void>;
  logout: () => void;
}

interface RegisterUserData {
  name: string;
  email: string;
  password: string;
  role: 'doctor' | 'patient';
  phone?: string;
  dateOfBirth?: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Mock login function - in a real app, this would call an API
  const login = async (email: string, password: string, role: 'doctor' | 'patient') => {
    // This is a mock implementation for demo purposes
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const mockUser: User = {
        id: '1',
        name: role === 'doctor' ? 'Dr. Jane Smith' : 'Maria Garcia',
        email,
        role,
        profileImage: role === 'doctor' 
          ? 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          : 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      };
      
      setUser(mockUser);
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login failed. Please check your credentials and try again.');
    }
  };
  
  // Mock register function
  const register = async (userData: RegisterUserData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user creation
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        name: userData.name,
        email: userData.email,
        role: userData.role,
      };
      
      setUser(newUser);
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error('Registration failed. Please try again.');
    }
  };
  
  const logout = () => {
    setUser(null);
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};