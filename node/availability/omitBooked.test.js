const omitBooked = require('./omitBooked');

describe('omitBooked', () => {
  it('removes booked entries from list of available slots', async () => {
    expect(
      omitBooked([
        {
          date: '2019-04-30',
          slot: '2019-04-30T19:00:00-04:00',
          advisor: 319369,
          pupil: 'Flip',
        },
      ])({
        '2019-04-30': {
          '2019-04-30T10:30:00-04:00': 399956,
          '2019-04-30T19:00:00-04:00': 319369,
          '2019-04-30T15:15:00-04:00': 399956,
        },
      })
    ).toEqual({
      '2019-04-30': {
        '2019-04-30T10:30:00-04:00': 399956,
        '2019-04-30T15:15:00-04:00': 399956,
      },
    });
  });
});
