import React, { useContext } from 'react';

import Context from '../contexts/store';

import AvailableTimesRow from './AvailableTimesRow';

const AvailableTimesTable = () => {
  const [{ available }] = useContext(Context);

  return (
    <>
      <h2>Available Times</h2>
      <table className="advisors table">
        <thead>
          <tr>
            <th>Advisor ID</th>
            <th>Available Times</th>
          </tr>
        </thead>
        <tbody>
          {available.map(({ advisor, slots }) => (
            <AvailableTimesRow advisor={advisor} slots={slots} key={advisor} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AvailableTimesTable;
