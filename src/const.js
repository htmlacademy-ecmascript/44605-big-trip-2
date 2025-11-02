const POINTS_COUNT = 3;
const MIN_RANDOM_VALUE = 1;
const MAX_RANDOM_VALUE = 100;

const DATE_FORMAT = {
  dayMonth: 'D MMM',
  hoursMinutes: 'HH:mm',
  fullDate: 'DD/MM/YY HH:mm',
};

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

const MurkupElement = {
  Everthing: '<p class="trip-events__msg">Click New Event to create your first point</p>',
  Past: 'There are no past events now',
  Present: 'There are no present events now',
  Future: 'There are no future events now',
};

export { POINTS_COUNT, MIN_RANDOM_VALUE, MAX_RANDOM_VALUE, DATE_FORMAT, POINTS_TYPE, MurkupElement, StatusForm, SortType, UserAction, UpdateType };
