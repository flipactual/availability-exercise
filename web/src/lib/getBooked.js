const getBooked = () =>
  fetch('http://localhost:4433/booked')
    .then(response => response.json())
    .then(({ data: booked }) => booked);

export default getBooked;
