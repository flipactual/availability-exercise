import React from 'react';
import { mount } from 'enzyme';

console.error = jest.fn();

jest.mock('./util/getFreshTableData');

const { default: getFreshTableData } = require('./util/getFreshTableData');

const { default: App } = require('./App');

const store = require('./contexts/store');

describe('App', () => {
  afterEach(() => {
    getFreshTableData.mockClear();
  });

  it('renders without crashing', () => {
    const wrapper = mount(<App />);
    wrapper.unmount();
  });

  it('handles initial empty state', async () => {
    getFreshTableData.mockResolvedValueOnce({ available: [], booked: [] });

    const wrapper = mount(<App />);

    expect(wrapper.find('#name-form')).toHaveLength(1);
    expect(wrapper.find('.advisors.table')).toHaveLength(1);
    expect(wrapper.find('.available-row')).toHaveLength(0);
    expect(wrapper.find('.bookings.table')).toHaveLength(1);
    expect(wrapper.find('.booked-row')).toHaveLength(0);

    expect(getFreshTableData).toHaveBeenCalled();

    wrapper.unmount();
  });

  it('handles data', () => {
    store.INITIAL_STATE = {
      available: [
        {
          advisor: '319369',
          slots: [
            '2019-04-30T13:00:00-04:00',
            '2019-04-30T18:00:00-04:00',
            '2019-05-02T18:00:00-04:00',
            '2019-05-02T19:00:00-04:00',
          ],
        },
        {
          advisor: '335698',
          slots: [
            '2019-04-30T15:30:00-04:00',
            '2019-04-30T17:30:00-04:00',
            '2019-05-01T10:00:00-04:00',
            '2019-05-01T11:30:00-04:00',
            '2019-05-01T14:00:00-04:00',
            '2019-05-02T10:00:00-04:00',
            '2019-05-02T11:00:00-04:00',
            '2019-05-02T14:30:00-04:00',
            '2019-05-02T15:00:00-04:00',
            '2019-05-02T17:15:00-04:00',
          ],
        },
      ],
      booked: [
        {
          advisor: '319369',
          slot: '2019-04-30T19:00:00-04:00',
          pupil: 'Flip',
        },
        {
          advisor: '319369',
          slot: '2019-05-01T12:15:00-04:00',
          pupil: 'Flip',
        },
      ],
      name: 'Flip',
    };

    const wrapper = mount(<App />);
    expect(wrapper.find('.available-row')).toHaveLength(2);
    expect(wrapper.find('.available-row li')).toHaveLength(14);
    expect(wrapper.find('.booked-row')).toHaveLength(2);
    wrapper.unmount();
  });
});
