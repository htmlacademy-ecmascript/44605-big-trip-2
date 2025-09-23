const POINTS_COUNT = 9;

const RANDOM_NUMBER = {
  min: 1,
  max: 100
};

const DATE_FORMAT = {
  dayMonth: 'D MMM',
  hoursMinutes: 'HH:mm',
  fullDate: 'DD/MM/YY HH:mm',
};

const POINTS_TYPE = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const getDefaultPoints = () => ({
  basePrice: 0,
  dateFrom: new Date().toUSOString(),
  dateTo: new Date().toUSOString(),
  destination: 0,
  isFavorite: false,
  offers: [],
  type: POINTS_TYPE[0],
});

export { POINTS_COUNT, DATE_FORMAT, RANDOM_NUMBER, getDefaultPoints };
