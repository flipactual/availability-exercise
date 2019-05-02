import React from 'react';

import formatDateTime from '../util/formatDateTime';

const BookedTimesRow = ({ advisor, slot, pupil }) => (
  <tr className="booked-row">
    <td>{advisor}</td>
    <td>{pupil}</td>
    <td>
      <time dateTime={slot}>{formatDateTime(slot)}</time>
    </td>
  </tr>
);
export default BookedTimesRow;
