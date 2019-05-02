global.fetch = jest.fn();

const { default: getBooked } = require('./getBooked');

describe('getBooked', () => {
  it('returns data when the response is valid', async () => {
    const response = {
      data: [
        {
          advisor: '319369',
          slot: '2019-04-30T19:00:00-04:00',
          pupil: 'Flip',
        },
      ],
    };
    fetch.mockImplementationOnce(async () => ({
      json: () => response,
    }));

    expect(await getBooked()).toEqual(response.data);
  });
});
