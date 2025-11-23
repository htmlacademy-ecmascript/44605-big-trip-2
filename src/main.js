import BoardPresenter from './presenter/board-presenter';
import PointsModel from './model/points-model';
import FilterModel from './model/filter-model';
import PointApiService from './service/point-api-service';
import { API_URL, AUTHORIZATION } from './const';

const headerContainer = document.querySelector('.trip-main'); // Найдем контейнер  для размещения фильтров и кнопки добавления новой точки маршрута
const bodyContainer = document.querySelector('.trip-events'); // Найдем основной контейнер для размещения всех точек маршрута

const pointsModel = new PointsModel({
  pointApiService: new PointApiService(API_URL, AUTHORIZATION)
});
const filterModel = new FilterModel();

const boardPresenter = new BoardPresenter({ headerContainer, bodyContainer, pointsModel, filterModel });
boardPresenter.init();
pointsModel.init();
