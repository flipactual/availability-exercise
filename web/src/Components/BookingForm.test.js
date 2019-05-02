import React from 'react';
import { mount } from 'enzyme';

import { Provider } from '../contexts/store';

import BookingForm from './BookingForm';

describe('BookingForm', () => {
  it('renders without crashing', () => {
    const wrapper = mount(
      <Provider value={[{ available: [], booked: [], name: '' }]}>
        <BookingForm />
      </Provider>
    );
    wrapper.unmount();
  });
  it('updates name when input is received', () => {
    const setState = jest.fn();
    const wrapper = mount(
      <Provider value={[{ available: [], booked: [], name: '' }, setState]}>
        <BookingForm />
      </Provider>
    );

    const nameInput = wrapper.find('#name-field');
    nameInput.simulate('change', { target: { value: 'Flip' } });

    expect(setState).toHaveBeenLastCalledWith({
      available: [],
      booked: [],
      name: 'Flip',
    });

    wrapper.unmount();
  });
});
