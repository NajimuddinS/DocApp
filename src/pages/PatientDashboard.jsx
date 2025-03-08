import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from '../context/AuthContext';

const PatientDashboard = () => {
  const { user } = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    // Load doctors from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const doctorsList = users.filter(user => user.type === 'doctor');
    setDoctors(doctorsList);

    // Load patient's appointments
    const storedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const patientAppointments = storedAppointments.filter(apt => apt.patientId === user.id);
    setAppointments(patientAppointments);
  }, [user.id]);

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookAppointment = () => {
    if (!selectedDoctor || !selectedDate) return;

    const appointmentEnd = new Date(selectedDate);
    appointmentEnd.setHours(appointmentEnd.getHours() + 1);

    const newAppointment = {
      id: Date.now().toString(),
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      patientId: user.id,
      patientName: user.name,
      start: selectedDate.toISOString(),
      end: appointmentEnd.toISOString(),
      notes: notes
    };

    // Save to localStorage
    const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    localStorage.setItem('appointments', JSON.stringify([...existingAppointments, newAppointment]));

    // Update local state
    setAppointments([...appointments, newAppointment]);
    setShowBookingForm(false);
    setSelectedDoctor(null);
    setSelectedDate(null);
    setNotes('');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Welcome {user.name}
      </h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Find a Doctor</h2>
        <input
          type="text"
          placeholder="Search by name or specialization..."
          className="w-full p-2 border rounded-md dark:bg-slate-700 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {filteredDoctors.map(doctor => (
            <div key={doctor.id} className="border p-4 rounded-lg shadow dark:bg-slate-800">
              <h3 className="font-semibold text-gray-900 dark:text-white">{doctor.name}</h3>
              <p className="text-gray-600 dark:text-gray-300">{doctor.specialization}</p>
              <button
                onClick={() => {
                  setSelectedDoctor(doctor);
                  setShowBookingForm(true);
                }}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
              >
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      </div>

      {showBookingForm && selectedDoctor && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Book Appointment with Dr. {selectedDoctor.name}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Select Date and Time
                </label>
                <DatePicker
                  selected={selectedDate}
                  onChange={date => setSelectedDate(date)}
                  showTimeSelect
                  dateFormat="MMMM d, yyyy h:mm aa"
                  minDate={new Date()}
                  className="w-full p-2 border rounded-md dark:bg-slate-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2 border rounded-md dark:bg-slate-700 dark:text-white"
                  rows="3"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBookAppointment}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
                  disabled={!selectedDate}
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Your Appointments</h2>
        <div className="space-y-4">
          {appointments.map(appointment => (
            <div key={appointment.id} className="border p-4 rounded-lg shadow dark:bg-slate-800">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Dr. {appointment.doctorName}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Date: {new Date(appointment.start).toLocaleDateString()}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Time: {new Date(appointment.start).toLocaleTimeString()}
              </p>
              {appointment.notes && (
                <p className="text-gray-600 dark:text-gray-300">Notes: {appointment.notes}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;