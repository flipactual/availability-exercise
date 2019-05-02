import getAvailable from '../lib/getAvailable';
import getBooked from '../lib/getBooked';

const getFreshTableData = async () => {
  const available = await getAvailable();
  const booked = await getBooked();
  return { available, booked };
};

export default getFreshTableData;
