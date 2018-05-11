import moment from 'moment';

export const setUser = (user) => {
  return { type:"SET_USER", user };
};

export const clearUser = () => {
  return { type:"CLEAR_USER" };
};

// Example of using moment to sort an array in desc order
const sortTimeEntriesByDateDesc = (timeEntries) => {
  timeEntries.sort((timeEntry1, timeEntry2) => {
    return moment(timeEntry2.date, "YYYY-MM-DD").unix() - moment(timeEntry1.date, "YYYY-MM-DD").unix();
  });
  return timeEntries;
}
