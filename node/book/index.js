const Joi = require('@hapi/joi');
const { find, includes, pipe, propOr, propEq } = require('ramda');

const STORE = require('../store');
const availability = require('../availability');

const validate = query =>
  Joi.validate(query, {
    slot: Joi.string().required(),
    advisor: Joi.string().required(),
    pupil: Joi.string().required(),
  });

const hasOpenSlot = (query, data) => {
  return pipe(
    find(propEq('advisor', query.advisor)),
    propOr([], 'slots'),
    includes(query.slot)
  )(data);
};

const book = async req => {
  const { error, value } = validate(req.query);
  if (error) {
    return { error };
  }

  const { data } = await availability();
  if (hasOpenSlot(value, data)) {
    STORE.push(value);
    return { data: value };
  }

  return {
    error: `Slot with ${value.advisor} at ${
      value.slot
    } does not exist or is not available`,
  };
};

module.exports = book;
