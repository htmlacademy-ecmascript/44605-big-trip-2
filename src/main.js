import { render } from './framework/render';
import TripPresenter from './presenter/trip-presenter';
import PointsModel from './model/points-model';
import FilterPresenter from './presenter/filter-presenter';
import FilterModel from './model/filter-model';

const tripPointsContainer = document.querySelector('.trip-events'); // Найдем основной контейнер для размещения всех точек маршрута
const filterContainer = document.querySelector('.trip-controls__filters'); // Контейнер для списка Filter

const pointsModel = new PointsModel();
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter(tripPointsContainer, pointsModel); // Инициализируем главный презентер приложения, передаем параметры в конструктор класса
const filterPresenter = new FilterPresenter(filterContainer, filterModel);

tripPresenter.init();
filterPresenter.init();
