import BodyPresenter from './presenter/body-presenter';
import PointsModel from './model/points-model';

const tripPointsContainer = document.querySelector('.trip-events'); // Найдем основной контейнер для размещения всех точек маршрута
const pointsModel = new PointsModel();

const bodyPresenter = new BodyPresenter(tripPointsContainer, pointsModel); // Инициализируем главный презентер приложения, передаем параметры в конструктор класса

bodyPresenter.init();

