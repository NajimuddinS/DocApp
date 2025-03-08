import { useAuth } from '../context/AuthContext';

function PatientDashboard() {
  const { user } = useAuth();

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Patient Dashboard</h2>
      <div className="space-y-4">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
            Your Appointments
          </h3>
          {/* Add appointment list here */}
          <p className="text-gray-600 dark:text-gray-300">No appointments scheduled</p>
        </div>
      </div>
    </div>
  );
}

export default PatientDashboard;