import { createContext } from 'react';

export const INITIAL_STATE = { available: [], booked: [], name: '' };
const Context = createContext(INITIAL_STATE);

export default Context;
export const { Consumer, Provider } = Context;
