import BodyPresenter from './presenter/body-presenter';
import PointsModel from './model/points-model';
import FilterModel from './model/filter-model';
import PointApiService from './service/point-api-service';
import { API_URL, AUTHORIZATION } from './const';

const tripPointsContainer = document.querySelector('.trip-events'); // Найдем основной контейнер для размещения всех точек маршрута
const filterModel = new FilterModel();
const pointsModel = new PointsModel({
  pointApiService: new PointApiService(API_URL, AUTHORIZATION)
});

const bodyPresenter = new BodyPresenter(tripPointsContainer, pointsModel, filterModel); // Инициализируем главный презентер приложения, передаем параметры в конструктор класса

bodyPresenter.init();
pointsModel.init();

