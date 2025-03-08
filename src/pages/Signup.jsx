import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = ({ isDarkMode }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: 'patient',
    specialization: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Get existing users or initialize empty array
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if email already exists
    if (users.some(user => user.email === formData.email)) {
      setError('Email already exists');
      return;
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      password: formData.password,
      type: formData.userType,
      ...(formData.userType === 'doctor' && { specialization: formData.specialization })
    };

    // Save to localStorage
    localStorage.setItem('users', JSON.stringify([...users, newUser]));

    // Log user in
    login(newUser);

    // Redirect to appropriate dashboard
    navigate(formData.userType === 'doctor' ? '/doctor-dashboard' : '/patient-dashboard');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'} flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8`}>
      <div className={`w-full max-w-md ${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-lg shadow-2xl p-8 space-y-8`}>
        <div className="text-center">
          <h2 className={`text-4xl font-extrabold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Create your account
          </h2>
          <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Join us and get started with your health journey
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300`}
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300`}
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300`}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <div>
              <select
                className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300`}
                value={formData.userType}
                onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>
            {formData.userType === 'doctor' && (
              <div>
                <label htmlFor="specialization" className="sr-only">
                  Specialization
                </label>
                <input
                  id="specialization"
                  name="specialization"
                  type="text"
                  required
                  className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300`}
                  placeholder="Specialization"
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                />
              </div>
            )}
          </div>

          {error && (
            <div className={`text-sm text-center ${isDarkMode ? 'text-red-400' : 'text-red-500'}`}>
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;