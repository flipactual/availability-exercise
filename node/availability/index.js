const got = require('got');
const { map, nth, pipe, reduceBy, sortBy, toPairs } = require('ramda');

const STORE = require('../store');
const omitBooked = require('./omitBooked');

const AVAILABILITY_ENDPOINT =
  'https://www.thinkful.com/api/advisors/availability';

const FAILURE_MESSAGE = 'Failed to retrieve availability';

const availability = async () => {
  try {
    const { body } = await got(AVAILABILITY_ENDPOINT, { json: true });

    return {
      data: pipe(
        // create shape Array<{
        //   date: Date,
        //   openings: Array<{
        //     advisor: AdvisorId,
        //     slot: Datetime
        //   }>
        // }>
        omitBooked(STORE),
        toPairs(), // convert to [date, slots]
        sortBy(nth(0)), // sort by date
        map(([date, openings]) => ({
          date, // save date as a property
          openings: pipe(
            // clean up openings, organize by advisor
            toPairs, // convert to [Datetime, AdvisorId]
            sortBy(nth(0)), // sort by datetime
            reduceBy((slots, [slot]) => [...slots, slot], [], nth(1)), // group by advisor
            toPairs, // convert to [AdvisorId, Array<Datetime>]
            map(([advisor, slots]) => ({ advisor, slots })) // turn it into an object
          )(openings),
        }))
      )(body),
    };
  } catch (error) {
    console.error(FAILURE_MESSAGE, error.response.body);
    return { error: FAILURE_MESSAGE };
  }
};

module.exports = availability;
