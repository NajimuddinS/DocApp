import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialization: "Cardiologist",
      experience: "15 years",
      address: "123 Medical Center, NY",
      appointments: []
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialization: "Pediatrician",
      experience: "10 years",
      address: "456 Health Plaza, NY",
      appointments: []
    }
  ]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const addAppointment = (doctorId, appointment) => {
    setDoctors(doctors.map(doctor => {
      if (doctor.id === doctorId) {
        return {
          ...doctor,
          appointments: [...doctor.appointments, appointment]
        };
      }
      return doctor;
    }));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, doctors, addAppointment }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);