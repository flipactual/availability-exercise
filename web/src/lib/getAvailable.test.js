global.fetch = jest.fn();

const { default: getAvailable } = require('./getAvailable');

describe('getAvailable', () => {
  it('returns data when the response is valid', async () => {
    const response = {
      data: [
        {
          advisor: '319369',
          slots: [
            '2019-04-30T13:00:00-04:00',
            '2019-04-30T18:00:00-04:00',
            '2019-05-02T18:00:00-04:00',
            '2019-05-02T19:00:00-04:00',
          ],
        },
      ],
    };
    fetch.mockImplementationOnce(async () => ({
      json: () => response,
    }));

    expect(await getAvailable()).toEqual(response.data);
  });
});
