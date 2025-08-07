import React, { useState, useEffect } from 'react';
import { bookingAPI } from '../../services/api';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const fetchMyBookings = async () => {
    try {
      const response = await bookingAPI.getMyBookings();
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
    return <div className="loading">Loading your bookings...</div>;
  }

  return (
    <div className="dashboard-section">
      <h2>My Bookings</h2>
      
      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      {bookings.length === 0 ? (
        <div className="card">
          <p>You have no bookings yet.</p>
        </div>
      ) : (
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
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
                    <td>{date}</td>
                    <td>{time} - {endTime}</td>
                    <td>
                      <span className="badge badge-success">Confirmed</span>
                    </td>
                    <td>{bookedAt.date} {bookedAt.time}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookingList;
