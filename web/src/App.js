import React, { useEffect, useState } from 'react';

import { Provider, INITIAL_STATE } from './contexts/store';

import BookingForm from './Components/BookingForm';
import AvailableTimesTable from './Components/AvailableTimesTable';
import BookedTimesTable from './Components/BookedTimesTable';

import getFreshTableData from './util/getFreshTableData';

const App = () => {
  const [state, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    (async () => {
      try {
        const { available, booked } = await getFreshTableData();
        setState({ available, booked });
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <div className="App container">
      <h1>Book Time with an Advisor</h1>
      <Provider value={[state, setState]}>
        <BookingForm />
        <AvailableTimesTable />
        <BookedTimesTable />
      </Provider>
    </div>
  );
};

export default App;
