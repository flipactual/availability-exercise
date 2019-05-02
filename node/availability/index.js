const got = require('got');
const {
  map,
  nth,
  pipe,
  reduceBy,
  sortBy,
  toPairs,
  unnest,
  values,
} = require('ramda');

const STORE = require('../store');
const omitBooked = require('./omitBooked');

const AVAILABILITY_ENDPOINT =
  'https://www.thinkful.com/api/advisors/availability';

const FAILURE_MESSAGE = 'Failed to retrieve availability';

// Because data thrashing
let cache;

const getAvailabilityFromThinkful = async () => {
  if (!cache) {
    cache = await got(AVAILABILITY_ENDPOINT, { json: true });
  }
  return cache;
};

const convertToDatetimeAdvisorPairs = pipe(
  values, // discard dates
  map(toPairs), // create [Datetime, AdvisorId]
  unnest // flatten data
);

const availability = async () => {
  try {
    const { body } = await getAvailabilityFromThinkful();

    return {
      data: pipe(
        // create shape Array<{
        //   advisor: AdvisorId,
        //   openings: Array<{
        //     slot: Datetime
        //   }>
        // }>
        convertToDatetimeAdvisorPairs, // convert to Array<[Datetime, AdvisorId]>
        omitBooked(STORE), // omit slots which are booked
        sortBy(nth(0)), // sort by datetime
        reduceBy((slots, [slot]) => [...slots, slot], [], nth(1)), // group by advisor
        toPairs, // convert to [AdvisorId, Array<Datetime>]
        map(([advisor, slots]) => ({ advisor, slots })) // turn it into an object {advisor: AdvisorId, slots: Array<Datetime>}
      )(body),
    };
  } catch (error) {
    console.error(
      FAILURE_MESSAGE,
      error.response ? error.response.body : error
    );
    return { error: FAILURE_MESSAGE };
  }
};

const clearCache = () => {
  cache = undefined;
};

module.exports = availability;
module.exports.clearCache = clearCache;
