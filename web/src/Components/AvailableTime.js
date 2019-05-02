import React, { useContext } from 'react';

import Context from '../contexts/store';

import book from '../lib/book';
import formatDateTime from '../util/formatDateTime';
import getFreshTableData from '../util/getFreshTableData';

const AvailableTime = ({ advisor, slot }) => {
  const [state, setState] = useContext(Context);

  return (
    <li>
      <time dateTime={slot} className="book-time">
        {formatDateTime(slot)}
      </time>
      <button
        className="book btn-small btn-primary"
        onClick={async () => {
          if (!state.name) {
            alert('Please enter your name!');
            return;
          }
          try {
            await book({ advisor, slot, pupil: state.name });

            const { available, booked } = await getFreshTableData();
            setState({ ...state, available, booked });
          } catch (e) {
            console.error(e);
          }
        }}
      >
        Book
      </button>
    </li>
  );
};

export default AvailableTime;
