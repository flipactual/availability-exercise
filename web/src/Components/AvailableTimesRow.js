import React from 'react';

import AvailableTime from './AvailableTime';

const AvailableTimesRow = ({ advisor, slots, pupil }) => {
  return (
    <tr className="available-row">
      <td>{advisor}</td>
      <td>
        <ul className="list-unstyled">
          {slots.map(slot => (
            <AvailableTime
              advisor={advisor}
              slot={slot}
              pupil={pupil}
              key={slot}
            />
          ))}
        </ul>
      </td>
    </tr>
  );
};

export default AvailableTimesRow;
