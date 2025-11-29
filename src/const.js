const API_URL = 'https://22.objects.htmlacademy.pro/big-trip';
const AUTHORIZATION = 'Basic mg-kem';

const DEFAULT_POINT = {
  flag: 'default',
  basePrice: '0',
  dateFrom: '',
  dateTo: '',
  destination: '',
  isFavorite: false,
  offers: [],
  type: 'flight',
};

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
  INIT: 'init',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

const PathURL = {
  POINTS: 'points',
  OFFERS: 'offers',
  DESTINATIONS: 'destinations',
};
const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const MarkupElement = {
  EVERYTHING: '<p class="trip-events__msg">Click New Event to create your first point</p>',
  PAST: '<p class="trip-events__msg">There are no past events now</p>',
  PRESENT: '<p class="trip-events__msg">There are no present events now</p>',
  FUTURE: '<p class="trip-events__msg">There are no future events now</p>',
  ERROR: '<p class="trip-events__msg">Failed to load latest route information</p>',
};

export { TimeLimit, API_URL, AUTHORIZATION, DEFAULT_POINT, DATE_FORMAT, FilterType, MarkupElement, StatusForm, SortType, UserAction, Method, PathURL, UpdateType };
