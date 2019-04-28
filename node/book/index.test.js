jest.mock('../availability');

const availability = require('../availability');

const book = require('./');

describe('book', () => {
  it('returns a successfully booked time', async () => {
    availability.mockResolvedValueOnce({
      data: [
        {
          date: '2019-04-28',
          openings: [
            {
              advisor: '335698',
              slots: [
                '2019-04-28T10:00:00-04:00',
                '2019-04-28T11:00:00-04:00',
                '2019-04-28T12:00:00-04:00',
                '2019-04-28T13:15:00-04:00',
                '2019-04-28T14:00:00-04:00',
                '2019-04-28T15:00:00-04:00',
                '2019-04-28T16:00:00-04:00',
                '2019-04-28T17:00:00-04:00',
              ],
            },
          ],
        },
      ],
    });
    expect(
      await book({
        query: {
          date: '2019-04-28',
          slot: '2019-04-28T17:00:00-04:00',
          advisor: '335698',
          pupil: 'Flip',
        },
      })
    ).toMatchInlineSnapshot(`
            Object {
              "data": Object {
                "advisor": "335698",
                "date": "2019-04-28",
                "pupil": "Flip",
                "slot": "2019-04-28T17:00:00-04:00",
              },
            }
        `);
  });
  it('returns an error when data is bad', async () => {
    availability.mockResolvedValueOnce({
      data: [],
    });
    expect(
      await book({
        query: {
          date: '2019-05-01',
          pupil: 'Flip',
        },
      })
    ).toMatchInlineSnapshot(`
                              Object {
                                "error": [ValidationError: child "slot" fails because ["slot" is required]],
                              }
                    `);
  });
  it('returns an error when slot does not exist', async () => {
    availability.mockResolvedValueOnce({
      data: [
        {
          date: '2019-04-28',
          openings: [
            {
              advisor: '335698',
              slots: ['2019-04-28T10:00:00-04:00'],
            },
          ],
        },
      ],
    });
    expect(
      await book({
        query: {
          date: '2019-04-28',
          slot: '2019-04-28T10:00:00-04:00',
          advisor: '325699',
          pupil: 'Flip',
        },
      })
    ).toMatchInlineSnapshot(`
      Object {
        "error": "Slot with 325699 at 2019-04-28T10:00:00-04:00 does not exist or is not available",
      }
    `);
  });
});
