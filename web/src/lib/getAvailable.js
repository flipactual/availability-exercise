const getAvailable = () =>
  fetch('http://localhost:4433/availability')
    .then(response => response.json())
    .then(({ data: available }) => available);

export default getAvailable;
