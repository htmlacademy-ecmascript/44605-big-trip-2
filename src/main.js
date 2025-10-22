import TripPresenter from './presenter/trip-presenter';
import PointsModel from './model/model';

const tripEventsContainer = document.querySelector('.trip-events'); // Найдем основной контейнер для размещения всех точек маршрута
const pointsModel = new PointsModel(); // Инициализируем модель
const tripPresenter = new TripPresenter(tripEventsContainer, pointsModel); // Инициализируем главный презентер приложения, передаем параметры в конструктор класса

tripPresenter.init(); // Вызываем метод у экземляра класса (метод описан внутри класса, а экземляр наследует? методы класса)
