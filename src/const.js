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

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

const DateFormat = {
  DAY_MONTH: 'D MMM',
  HOURS_MINUTES: 'HH:mm',
  FULL_DATE: 'DD/MM/YY HH:mm',
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
  PAST: 'past',
  PRESENT: 'present',
  FUTURE: 'future',
};


const MarkupElement = {
  EVERYTHING: '<p class="trip-events__msg">Click New Event to create your first point</p>',
  PAST: '<p class="trip-events__msg">There are no past events now</p>',
  PRESENT: '<p class="trip-events__msg">There are no present events now</p>',
  FUTURE: '<p class="trip-events__msg">There are no future events now</p>',
};

export { DEFAULT_POINT, API_URL, AUTHORIZATION, Method, DateFormat, FilterType, MarkupElement, StatusForm, SortType, UserAction, UpdateType };
