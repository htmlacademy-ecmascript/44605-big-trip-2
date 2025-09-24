const POINTS_COUNT = 5;

const RANDOM_NUMBER = {
  min: 1,
  max: 100
};

/**
 * @description форматы даты
 */
const DATE_FORMAT = {
  dayMonth: 'D MMM',
  hoursMinutes: 'HH:mm',
  fullDate: 'DD/MM/YY HH:mm',
};

/**
 * @description типы точек
 */
const POINTS_TYPE = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

/**
 * @description текст для пустой страницы в зависимости от фильтра
 */
const MurkupElement = {
  Everthing: '<p class="trip-events__msg">Click New Event to create your first point</p>',
  Past: 'There are no past events now',
  Present: 'There are no present events now',
  Future: 'There are no future events now',
};


export { POINTS_COUNT, DATE_FORMAT, RANDOM_NUMBER, POINTS_TYPE, MurkupElement };
