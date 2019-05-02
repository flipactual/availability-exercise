const book = async ({ advisor, slot, pupil }) => {
  const response = await fetch(
    `http://localhost:4433/book?advisor=${advisor}&slot=${slot}&pupil=${pupil}`
  );
  const json = response.json();

  if (json.error) {
    alert(json.error.details ? json.error.details[0].message : json.error);
  }

  return json;
};

export default book;
