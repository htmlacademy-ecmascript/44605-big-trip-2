import TripSort from '../view/sort-view';
import TripFilter from '../view/trip-filter-view';
import HeaderTripInfoBlock from '../view/header-info-trip';
import TripPointListView from '../view/event-list-view';
import NoPointView from '../view/no-point-view';
import { render, RenderPosition } from '../framework/render';
import PointPresenter from './point-presenter';
import { SortType } from '../const';

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
  #sourcedTripPoints = [];

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
    this.#tripListComponent = new TripPointListView();
    this.#tripFilterComponent = new TripFilter();
    this.#pointPresenters = new Map(); // Карта(массив) всех презентеров точек маршрута
    this.#currentSortType = SortType.TIME; // текушая сортировка, отображаемая на странице
  }

  init() {
    this.#renderHeader();
    this.#renderEmptyPage();
    this.#renderPoints();
  }

  #renderFilter() {
    render(this.#tripFilterComponent, this.#tripFiltersContainer);
  }

  #renderSort() {
    this.#tripSortComponent = new TripSort({
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#tripSortComponent, this.#tripContainer);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      console.log('тип сортировки по умолчанию совпадает');
      return;
    }
    console.log('Вызываю метод сортировки');
    this.#sortPoint(sortType);
  };

  #sortPoint = (sortType) => {
    this.#sourcedTripPoints = [...this.#points];
    console.log('points : ');
    console.log(this.#points);
    switch (sortType) {
      case 'day':
        console.log('day');
        this.#points.sort();
        break;
      case 'price':
        console.log('price');
        this.#points.sort();
        break;
      case 'time':
        console.log('time');
        this.#points.sort();
        break;
    }
    console.log('points : ');
    console.log(this.#points);
  };

  #renderHeader() {
    render(new HeaderTripInfoBlock(), this.#tripMainContainer, RenderPosition.AFTERBEGIN);
    this.#renderFilter();
  }

  #closeAllForms = () => {
    this.#pointPresenters.forEach((presenter) => presenter.closeForm());
  };

  #renderEmptyPage() {
    // Если точек нет — показываем заглушку
    if (this.#points.length === 0) {
      const filterInputs = document.querySelectorAll('.trip-filters__filter-input');
      filterInputs.forEach((input) => {
        input.disabled = true;
      });
      render(new NoPointView(), this.#tripContainer);
    }
  }

  #renderPoints() {
    if (this.#points.length > 0) {
      //Если есть точки, добавляем сортировку, ul и отрисовываем список точек
      this.#renderSort();
      render(this.#tripListComponent, this.#tripContainer);
      for (let i = 0; i < this.#points.length; i++) {
        const pointPresenter = new PointPresenter({
          pointListContainer: this.#tripListComponent.element,
          point: this.#points[i],
          destinations: this.#destinations,
          offers: this.#offers,
          closeForms: this.#closeAllForms,
        });
        pointPresenter.init();
        this.#pointPresenters.set(this.#points[i].id, pointPresenter);
      }
    }
  }
}
