import React from 'react';
import { mount } from 'enzyme';

import { Provider } from '../contexts/store';

global.alert = jest.fn();
global.console.error = jest.fn();

jest.mock('../lib/book');
jest.mock('../util/getFreshTableData');

const { default: book } = require('../lib/book');
const { default: getFreshTableData } = require('../util/getFreshTableData');

const { default: AvailableTime } = require('./AvailableTime');

describe('AvailableTime', () => {
  afterEach(() => {
    book.mockClear();
    getFreshTableData.mockClear();
  });

  it('renders without crashing', () => {
    const wrapper = mount(
      <Provider value={[{ available: [], booked: [], name: '' }]}>
        <AvailableTime />
      </Provider>
    );
    wrapper.unmount();
  });

  it('books an appointment when name is provided', async () => {
    expect.assertions(3);

    const setState = jest.fn();

    const advisor = '319369';
    const slot = '2019-04-30T13:00:00-04:00';
    const pupil = 'Flip';

    const freshData = { available: [], booked: [{ advisor, slot, pupil }] };

    const wrapper = mount(
      <Provider value={[{ available: [], booked: [], name: pupil }, setState]}>
        <AvailableTime advisor={advisor} slot={slot} />
      </Provider>
    );

    book.mockReturnValueOnce({});
    getFreshTableData.mockReturnValueOnce(freshData);

    const bookButton = wrapper.find('.book');
    bookButton.simulate('click');

    await Promise.resolve(); // hack to wait for next tick

    expect(book).toHaveBeenLastCalledWith({
      advisor,
      slot,
      pupil: 'Flip',
    });
    expect(getFreshTableData).toHaveBeenCalled();
    expect(setState).toHaveBeenLastCalledWith({ ...freshData, name: pupil });

    wrapper.unmount();
  });

  it('errors and does not book an appointment when name is absent', async () => {
    expect.assertions(4);

    const setState = jest.fn();

    const advisor = '319369';
    const slot = '2019-04-30T13:00:00-04:00';
    const pupil = '';

    const wrapper = mount(
      <Provider value={[{ available: [], booked: [], name: pupil }, setState]}>
        <AvailableTime advisor={advisor} slot={slot} />
      </Provider>
    );

    const bookButton = wrapper.find('.book');
    bookButton.simulate('click');

    await Promise.resolve(); // hack to wait for next tick

    expect(book).not.toHaveBeenCalled();
    expect(getFreshTableData).not.toHaveBeenCalled();
    expect(setState).not.toHaveBeenCalled();

    expect(alert).toHaveBeenLastCalledWith('Please enter your name!');

    wrapper.unmount();
  });

  it('logs an error when bad data is received', async () => {
    expect.assertions(4);

    const setState = jest.fn();

    const advisor = '319369';
    const slot = '2019-04-30T13:00:00-04:00';
    const pupil = 'Flip';

    const wrapper = mount(
      <Provider value={[{ available: [], booked: [], name: pupil }, setState]}>
        <AvailableTime advisor={advisor} slot={slot} />
      </Provider>
    );

    const error = new Error('oops');

    book.mockImplementationOnce(() => {
      throw error;
    });

    const bookButton = wrapper.find('.book');
    bookButton.simulate('click');

    await Promise.resolve(); // hack to wait for next tick

    expect(book).toHaveBeenLastCalledWith({
      advisor,
      slot,
      pupil: 'Flip',
    });
    expect(getFreshTableData).not.toHaveBeenCalled();
    expect(setState).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenLastCalledWith(error);

    wrapper.unmount();
  });
});
