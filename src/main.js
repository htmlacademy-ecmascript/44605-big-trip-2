import TripFilter from './view/trip-filter-view';
import BoardPresenter from './presenter/board-presenter';
import PointsModel from './model/model';
import { render } from './render';

const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events'); // Найдем основной контейнер для размещения всех точек маршрута
const pointsModel = new PointsModel(); // Инициализируем модель
const boardPresenter = new BoardPresenter({
  boardContainer: tripEvents,
  pointsModel,
});

render(new TripFilter(), tripControlsFilters);

boardPresenter.init();
