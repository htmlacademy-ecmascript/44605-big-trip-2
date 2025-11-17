import BoardPresenter from './presenter/board-presenter';
// import BodyPresenter from './presenter/body-presenter';
import PointsModel from './model/points-model';
import FilterModel from './model/filter-model';

const headerContainer = document.querySelector('.trip-main'); // Найдем контейнер  для размещения фильтров и кнопки добавления новой точки маршрута
const bodyContainer = document.querySelector('.trip-events'); // Найдем основной контейнер для размещения всех точек маршрута

const pointsModel = new PointsModel();
const filterModel = new FilterModel();

const boardPresenter = new BoardPresenter({ headerContainer, bodyContainer, pointsModel, filterModel });
boardPresenter.init();

// const bodyPresenter = new BodyPresenter(tripPointsContainer, pointsModel, filterModel); // Инициализируем главный презентер приложения, передаем параметры в конструктор класса

// bodyPresenter.init();

