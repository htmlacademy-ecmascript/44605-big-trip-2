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
  // #sourcedTripPoints = [];

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
    this.#currentSortType = SortType.DAY; // текушая сортировка, отображаемая на странице
  }

  init() {
    this.#renderContent();
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
      return;
    }
    this.#currentSortType = sortType;
    this.#sortPoints(this.#currentSortType);
    this.#tripListComponent.element.innerHTML = '';
    this.#renderPoints();
    // очищаем контейнер с точками,
    // Вызываем заново вызывать рендер поинт
  };

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

  #renderContent() {
    this.#renderHeader();
    this.#renderEmptyPage();
    if (this.#points.length > 0) {
      //Если есть точки, добавляем сортировку, ul и отрисовываем список точек
      this.#renderSort();
      this.#sortPoints(this.#currentSortType);
      this.#renderPoints();
    }
  }

  #renderPoints() {
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

