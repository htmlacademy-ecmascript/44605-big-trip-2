import BodyPresenter from './presenter/body-presenter';
import PointsModel from './model/points-model';
import FilterModel from './model/filter-model';

const tripPointsContainer = document.querySelector('.trip-events'); // Найдем основной контейнер для размещения всех точек маршрута
const pointsModel = new PointsModel();
const filterModel = new FilterModel();

const bodyPresenter = new BodyPresenter(tripPointsContainer, pointsModel, filterModel); // Инициализируем главный презентер приложения, передаем параметры в конструктор класса

bodyPresenter.init();

