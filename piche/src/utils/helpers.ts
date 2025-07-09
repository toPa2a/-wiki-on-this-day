const getFineDate = (date: number): string => date < 10 ? `0${date}` : `${date}`;

export {
  getFineDate,
};