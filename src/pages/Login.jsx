import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = ({ isDarkMode }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'patient'
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Mock login - in real app this would be an API call
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => 
      u.email === formData.email && 
      u.password === formData.password &&
      u.type === formData.userType
    );

    if (user) {
      login(user);
      navigate(user.type === 'doctor' ? '/doctor-dashboard' : '/patient-dashboard');
    } else {
      setError('Invalid credentials or user type');
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
      <div className={`w-full max-w-md ${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-lg shadow-2xl p-8 space-y-8`}>
        <div className="text-center">
          <h2 className={`text-3xl font-extrabold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Sign in to your account
          </h2>
          <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Enter your credentials to access your account
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
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
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;