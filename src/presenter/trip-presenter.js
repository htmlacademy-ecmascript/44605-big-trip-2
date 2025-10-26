import TripSort from '../view/sort-view';
import TripFilter from '../view/trip-filter-view';
import HeaderTripInfoBlock from '../view/header-info-trip';
import TripPointListView from '../view/event-list-view';
import NoPointView from '../view/no-point-view';
import { render, RenderPosition } from '../framework/render';
import PointPresenter from './point-presenter';
import { SortType } from '../const';
import { sortingByPrice, sortingByDay, sortingByTime } from '../utils';

/**
 * @class Презентер списка точек маршрута и связанных UI-элементов (хедер, фильтры, сортировка).
 */
export default class TripPresenter {
  #tripContainer;
  #tripMainContainer;
  #tripFiltersContainer;
  #points;
  #destinations;
  #offers;
  #tripSortComponent;
  #tripListComponent;
  #tripFilterComponent;
  #pointPresenters;
  #currentSortType;

  /**
   * @constructor
   * @param {HTMLElement} tripContainer Контейнер для списка точек (область `.trip-events`)
   * @param {Object} pointsModel Модель с данными точек, направлений и офферов
   */
  constructor(tripContainer, pointsModel) {
    this.#tripContainer = tripContainer;
    this.#tripMainContainer = document.querySelector('.trip-main');
    this.#tripFiltersContainer = document.querySelector('.trip-controls__filters');
    this.#points = pointsModel.points;
    this.#destinations = pointsModel.destinations;
    this.#offers = pointsModel.offers;
    this.#tripListComponent = new TripPointListView(); // Инициализируем компонент списка ul
    this.#tripFilterComponent = new TripFilter(); // Инициализируем компонент фильтрации
    this.#pointPresenters = new Map(); // Карта(массив) всех презентеров точек маршрута (По умолчанию пустой)
    this.#currentSortType = SortType.DAY; // текушая сортировка, отображаемая на странице (По умолчанию DAY)
  }

  init() {
    this.#renderContent();
  }

  #renderContent() {
    this.#renderHeader(); // 1 Рендерим Хэдэр-блок
    this.#renderEmptyPage(); // 2 Рендерим пустую страницу(если количество точек === 0)
    if (this.#points.length > 0) {
      //Если есть точки, добавляем сортировку, ul и отрисовываем список точек
      this.#renderSort(); // 3 Рендерим компонент сортировки
      this.#sortPoints(this.#currentSortType); // 4 Сортируем массив точек маршрута Points
      this.#renderPoints(); // 5 Рендерим массив точек маршрута
    }
  }

  #renderHeader() {
    render(new HeaderTripInfoBlock(), this.#tripMainContainer, RenderPosition.AFTERBEGIN); // 1.1 Рендерим пока еще абстрактный компонент на страницу, показываюший маршрут и даты поездки
    this.#renderFilter(); // 1.2
  }

  // 1.2
  #renderFilter() {
    render(this.#tripFilterComponent, this.#tripFiltersContainer);
  }

  // 2
  #renderEmptyPage() {
    // Если точек нет — показываем заглушку
    if (this.#points.length === 0) {
      render(new NoPointView(), this.#tripContainer); // 2.1
      // 2.2 В дополнении делаем недоступными для клика все кнопки фильтрации
      const filterInputs = document.querySelectorAll('.trip-filters__filter-input');
      filterInputs.forEach((input) => {
        input.disabled = true;
      });
    }
  }

  #renderSort() {
    // 3.1 Инициализирую компонент сортировки(Передаю в конструктор функцию-обработчик клика)
    this.#tripSortComponent = new TripSort({
      onSortTypeChange: this.#handleSortTypeChange
    });
    // 3.3 Рендерим получившийся компонент сортировки
    render(this.#tripSortComponent, this.#tripContainer);
  }

  // 3.2 Функция обработчик клика сортировки
  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType; // 3.2.1 Присваиваю текущей сортировке новое значение из клика
    this.#sortPoints(this.#currentSortType); // 3.2.2 Вызываю функцию сортировки точек маршрута
    this.#tripListComponent.element.innerHTML = ''; // 3.2.3 Очищаем список точек
    this.#renderPoints(); // 3.2.4 Рендерим точки после сортировки
  };

  // 4   Функция сортировки точек маршрута (мутирует изначальный массив Points)
  #sortPoints = (sortType) => {
    switch (sortType) {
      case 'day':
        this.#points.sort(sortingByDay);
        break;
      case 'price':
        this.#points.sort(sortingByPrice);
        break;
      case 'time':
        this.#points.sort(sortingByTime);
        break;
    }
  };

  // 5 Рендер точек маршрута
  #renderPoints() {
    render(this.#tripListComponent, this.#tripContainer); // 5.1 Рендерим ul списка
    for (let i = 0; i < this.#points.length; i++) {
      // 5.2 На каждую точку маршрута создаем свой презентер точки и передаем в конструктор параметры
      const pointPresenter = new PointPresenter({
        pointListContainer: this.#tripListComponent.element,
        point: this.#points[i],
        destinations: this.#destinations,
        offers: this.#offers,
        closeForms: this.#closeAllForms,
      });
      pointPresenter.init(); // 5.3 После инициализации вызываем главный метод, который отрисовывает Point
      this.#pointPresenters.set(this.#points[i].id, pointPresenter); // 5.4 Добавляем презентер в Map
    }
  }

  #closeAllForms = () => {
    this.#pointPresenters.forEach((presenter) => presenter.closeForm());
  };
}

