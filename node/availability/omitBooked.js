const { clone, forEach } = require('ramda');

const omitBooked = store => availability => {
  const result = clone(availability);
  forEach(({ date, slot }) => {
    delete result[date][slot];
  })(store);
  return result;
};

module.exports = omitBooked;
