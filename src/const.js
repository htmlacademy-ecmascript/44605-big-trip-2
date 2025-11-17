const POINTS_COUNT = 10;
const MIN_RANDOM_VALUE = 1;
const MAX_RANDOM_VALUE = 100;
const FILTERS = [
  {
    name: 'EVERYTHING',
    count: 0
  },
  {
    name: 'FUTURE',
    count: 0
  },
  {
    name: 'PRESENT',
    count: 0
  },
  {
    name: 'PAST',
    count: 0
  }
];

const DATE_FORMAT = {
  dayMonth: 'D MMM',
  hoursMinutes: 'HH:mm',
  fullDate: 'DD/MM/YY HH:mm',
};

const StatusForm = {
  EDIT: 'edit',
  DEFAULT: 'default',

};
const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

const UserAction = {
  UPDATE_POINT: 'update_point',
  ADD_POINT: 'add_point',
  DELETE_POINT: 'delete_point',
};

const UpdateType = {
  PATCH: 'patch',
  MINOR: 'minor',
  MAJOR: 'major',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};


const MurkupElement = {
  EVERYTHING: '<p class="trip-events__msg">Click New Event to create your first point</p>',
  PAST: '<p class="trip-events__msg">There are no past events now</p>',
  PRESENT: '<p class="trip-events__msg">There are no present events now</p>',
  FUTURE: '<p class="trip-events__msg">There are no future events now</p>',
};

export { POINTS_COUNT, MIN_RANDOM_VALUE, MAX_RANDOM_VALUE, FILTERS, DATE_FORMAT, FilterType, MurkupElement, StatusForm, SortType, UserAction, UpdateType };
