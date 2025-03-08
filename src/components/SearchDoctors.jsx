import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function SearchDoctors() {
  const { doctors, user, addAppointment } = useAuth();
  const [search, setSearch] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(search.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(search.toLowerCase())
  );

  const handleBookAppointment = () => {
    if (!user) {
      alert('Please login to book an appointment');
      return;
    }

    addAppointment(selectedDoctor.id, {
      patientName: user.name,
      patientId: user.id,
      date: appointmentDate,
      status: 'scheduled'
    });

    setShowModal(false);
    alert('Appointment booked successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search doctors by name or specialization..."
          className="w-full max-w-2xl px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map(doctor => (
          <div key={doctor.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{doctor.name}</h3>
            <p className="text-gray-600 dark:text-gray-300">{doctor.specialization}</p>
            <p className="text-gray-600 dark:text-gray-300">Experience: {doctor.experience}</p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{doctor.address}</p>
            <button
              onClick={() => {
                setSelectedDoctor(doctor);
                setShowModal(true);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Book Appointment with {selectedDoctor.name}
            </h3>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                Select Date and Time
              </label>
              <DatePicker
                selected={appointmentDate}
                onChange={date => setAppointmentDate(date)}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleBookAppointment}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchDoctors;