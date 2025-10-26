const POINTS_COUNT = 5;

const MIN_RANDOM_VALUE = 1;
const MAX_RANDOM_VALUE = 100;

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

const StatusForm = {
  EDIT: 'edit',
  DEFAULT: 'default',
};

const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

/**
 * @description текст для пустой страницы в зависимости от фильтра
 */
const MurkupElement = {
  Everthing: '<p class="trip-events__msg">Click New Event to create your first point</p>',
  Past: 'There are no past events now',
  Present: 'There are no present events now',
  Future: 'There are no future events now',
};


export { POINTS_COUNT, MIN_RANDOM_VALUE, MAX_RANDOM_VALUE, DATE_FORMAT, POINTS_TYPE, MurkupElement, StatusForm, SortType };
