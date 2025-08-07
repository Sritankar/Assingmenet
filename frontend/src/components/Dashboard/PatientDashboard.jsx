import React from 'react';
import SlotList from '../Slots/SlotList';
import BookingList from '../Slots/BookingList';

const PatientDashboard = () => {
  return (
    <div className="dashboard">
      <h1>Patient Dashboard</h1>
      <SlotList />
      <BookingList />
    </div>
  );
};

export default PatientDashboard;
