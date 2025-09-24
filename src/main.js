import TripPresenter from './presenter/trip-presenter';
import PointsModel from './model/model';

const tripEventsContainer = document.querySelector('.trip-events'); // Найдем основной контейнер для размещения всех точек маршрута
const pointsModel = new PointsModel(); // Инициализируем модель
const tripPresenter = new TripPresenter({
  tripContainer: tripEventsContainer,
  pointsModel,
});

tripPresenter.init();
