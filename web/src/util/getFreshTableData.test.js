jest.mock('../lib/getAvailable');
jest.mock('../lib/getBooked');

const { default: getAvailable } = require('../lib/getAvailable');
const { default: getBooked } = require('../lib/getBooked');

const { default: getFreshTableData } = require('./getFreshTableData');

describe('getFreshTableData', () => {
  it('returns data when the response is valid', async () => {
    const available = 'available';
    const booked = 'booked';

    getAvailable.mockResolvedValueOnce(available);
    getBooked.mockResolvedValueOnce(booked);

    expect(await getFreshTableData()).toEqual({ available, booked });
  });
});
