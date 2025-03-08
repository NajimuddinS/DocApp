import { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useAuth } from '../context/AuthContext';

const locales = {
  'en-US': enUS
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const DoctorDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    // Load appointments from localStorage
    const storedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const doctorAppointments = storedAppointments
      .filter(apt => apt.doctorId === user.id)
      .map(apt => ({
        ...apt,
        start: new Date(apt.start),
        end: new Date(apt.end)
      }));
    setAppointments(doctorAppointments);
  }, [user.id]);

  const handleSelectEvent = (event) => {
    setSelectedAppointment(event);
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Welcome Dr. {user.name}
      </h1>
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg relative z-10">
        <Calendar
          localizer={localizer}
          events={appointments}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          onSelectEvent={handleSelectEvent}
          className="rounded-lg overflow-hidden"
        />
      </div>

      {selectedAppointment && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-2xl max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Appointment Details
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p><strong className="font-semibold">Patient:</strong> {selectedAppointment.patientName}</p>
              <p><strong className="font-semibold">Date:</strong> {format(selectedAppointment.start, 'PPP')}</p>
              <p><strong className="font-semibold">Time:</strong> {format(selectedAppointment.start, 'p')} - {format(selectedAppointment.end, 'p')}</p>
              <p><strong className="font-semibold">Notes:</strong> {selectedAppointment.notes || 'No notes provided'}</p>
            </div>
            <button
              onClick={() => setSelectedAppointment(null)}
              className="mt-6 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;