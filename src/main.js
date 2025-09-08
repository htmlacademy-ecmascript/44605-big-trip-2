import TripFilter from './view/trip-filter-view';
import BoardPresenter from './presenter/board-presenter';
import { render } from './render';

const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const boardPresenter = new BoardPresenter({ boardContainer: tripEvents });

render(new TripFilter(), tripControlsFilters);

boardPresenter.init();
