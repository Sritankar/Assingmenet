import React, { useState, useEffect } from 'react';
import { bookingAPI } from '../../services/api';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAllBookings();
  }, []);

  const fetchAllBookings = async () => {
    try {
      const response = await bookingAPI.getAllBookings();
      setBookings(response.data.bookings);
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  if (loading) {
    return <div className="loading">Loading all bookings...</div>;
  }

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      
      <div className="dashboard-section">
        <h2>All Bookings ({bookings.length})</h2>
        
        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        {bookings.length === 0 ? (
          <div className="card">
            <p>No bookings found.</p>
          </div>
        ) : (
          <div className="card">
            <table className="table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Booked At</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => {
                  const { date, time } = formatDateTime(booking.slot.startAt);
                  const endTime = formatDateTime(booking.slot.endAt).time;
                  const bookedAt = formatDateTime(booking.createdAt);
                  
                  return (
                    <tr key={booking.id}>
                      <td>{booking.user.name}</td>
                      <td>{booking.user.email}</td>
                      <td>{date}</td>
                      <td>{time} - {endTime}</td>
                      <td>{bookedAt.date} {bookedAt.time}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
