global.fetch = jest.fn();
global.alert = jest.fn();

const { default: book } = require('./book');

describe('book', () => {
  it('returns data when the response is valid', async () => {
    const response = {
      data: {},
    };
    fetch.mockImplementationOnce(async () => ({
      json: () => response,
    }));

    expect(await book({ advisor: '', slot: '', pupil: '' })).toBe(response);
  });

  it('alerts with errors from joi and elsewhere', async () => {
    const error = 'oh no';

    const response = {
      error,
    };
    fetch.mockImplementationOnce(async () => ({
      json: () => response,
    }));

    expect(await book({ advisor: '', slot: '', pupil: '' })).toBe(response);
    expect(alert).toHaveBeenLastCalledWith(error);

    const joiError = { details: [{ message: error }] };

    const joiResponse = {
      error: joiError,
    };
    fetch.mockImplementationOnce(async () => ({
      json: () => joiResponse,
    }));

    expect(await book({ advisor: '', slot: '', pupil: '' })).toEqual(
      joiResponse
    );
    expect(alert).toHaveBeenLastCalledWith(error);
  });
});
