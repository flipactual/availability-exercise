import React, { useContext } from 'react';

import Context from '../contexts/store';

import BookedTimesRow from './BookedTimesRow';

const BookedTimesTable = () => {
  const [{ booked }] = useContext(Context);

  return (
    <>
      <h2>Booked Times</h2>
      <table className="bookings table">
        <thead>
          <tr>
            <th>Advisor ID</th>
            <th>Student Name</th>
            <th>Date/Time</th>
          </tr>
        </thead>
        <tbody>
          {booked.map(({ advisor, slot, pupil }) => (
            <BookedTimesRow
              advisor={advisor}
              slot={slot}
              pupil={pupil}
              key={slot}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};
export default BookedTimesTable;
