const omitBooked = require('./omitBooked');

describe('omitBooked', () => {
  it('removes booked entries from list of available slots', async () => {
    expect(
      omitBooked([
        {
          advisor: '319369',
          slot: '2019-04-30T19:00:00-04:00',
          pupil: 'Flip',
        },
      ])([
        ['2019-04-30T10:30:00-04:00', 399956],
        ['2019-04-30T19:00:00-04:00', 319369],
        ['2019-04-30T15:15:00-04:00', 399956],
      ])
    ).toEqual([
      ['2019-04-30T10:30:00-04:00', 399956],
      ['2019-04-30T15:15:00-04:00', 399956],
    ]);
  });
});
