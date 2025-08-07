import React, { useState, useEffect } from 'react';
import { slotsAPI, bookingAPI } from '../../services/api';

const SlotList = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    fetchAvailableSlots();
  }, []);

  const fetchAvailableSlots = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      const toDate = nextWeek.toISOString().split('T')[0];

      const response = await slotsAPI.getAvailableSlots(today, toDate);
      setSlots(response.data.slots);
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Failed to fetch slots');
    } finally {
      setLoading(false);
    }
  };

  const handleBookSlot = async (slotId) => {
    setBooking(true);
    setError('');

    try {
      await bookingAPI.bookSlot(slotId);
      // Remove the booked slot from the list
      setSlots(slots.filter(slot => slot.id !== slotId));
      alert('Slot booked successfully!');
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Failed to book slot');
    } finally {
      setBooking(false);
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
    return <div className="loading">Loading available slots...</div>;
  }

  return (
    <div className="dashboard-section">
      <h2>Available Slots</h2>
      
      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      {slots.length === 0 ? (
        <div className="card">
          <p>No available slots for the next 7 days.</p>
        </div>
      ) : (
        <div className="slot-grid">
          {slots.map(slot => {
            const { date, time } = formatDateTime(slot.startAt);
            const endTime = formatDateTime(slot.endAt).time;
            
            return (
              <div key={slot.id} className="slot-card available">
                <div className="slot-time">
                  {time} - {endTime}
                </div>
                <div className="slot-date">
                  {date}
                </div>
                <button
                  onClick={() => handleBookSlot(slot.id)}
                  className="btn btn-primary"
                  disabled={booking}
                  style={{ marginTop: '0.5rem', width: '100%' }}
                >
                  {booking ? 'Booking...' : 'Book Slot'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SlotList;
