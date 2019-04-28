console.error = jest.fn();

const nock = require('nock');

const mock = require('./index.mock');

const availability = require('./');

const BASE = 'https://www.thinkful.com';
const PATH = '/api/advisors/availability';

describe('availability', () => {
  describe('outage', () => {
    nock(BASE)
      .get(PATH)
      .twice()
      .reply(410, undefined);

    it('returns an error', async () => {
      expect(await availability()).toMatchInlineSnapshot(`
                        Object {
                          "error": "Failed to retrieve availability",
                        }
                  `);
    });
    it('logs an error', async () => {
      await availability();
      expect(console.error).toHaveBeenLastCalledWith(
        'Failed to retrieve availability',
        ''
      );
    });
  });
  it('returns available times', async () => {
    nock(BASE)
      .get(PATH)
      .once()
      .reply(200, mock);
    expect(await availability()).toMatchSnapshot();
  });
  it('returns an empty array when there are no available slots', async () => {
    nock(BASE)
      .get(PATH)
      .once()
      .reply(200, {});
    expect(await availability()).toMatchInlineSnapshot(`
      Object {
        "data": Array [],
      }
    `);
  });
});
