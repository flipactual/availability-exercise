import React, { useContext } from 'react';

import Context from '../contexts/store';

const BookingForm = () => {
  const [state, setState] = useContext(Context);

  return (
    <form id="name-form" className="col-md-6">
      <div className="form-group">
        <label htmlFor="name-field">Your Name</label>
        <input
          type="text"
          id="name-field"
          className="form-control"
          onChange={({ target: { value: name } }) =>
            setState({ ...state, name })
          }
        />
      </div>
    </form>
  );
};

export default BookingForm;
