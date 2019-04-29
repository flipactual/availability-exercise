const {
  clone,
  forEach,
  fromPairs,
  map,
  omit,
  pick,
  pipe,
  toPairs,
} = require('ramda');

const omitBooked = store =>
  pipe(
    fromPairs,
    omit(map(pick('slot'))(store)),
    slots => {
      const result = clone(slots);
      forEach(({ advisor, slot }) => {
        if (result[slot] && `${result[slot]}` === advisor) {
          delete result[slot];
        }
      })(store);
      return result;
    },
    toPairs
  );

module.exports = omitBooked;
