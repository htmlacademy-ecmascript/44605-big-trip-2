import TripSort from '../view/sort-view';
import TripFilter from '../view/trip-filter-view';
import HeaderTripInfoBlock from '../view/header-info-trip';
import TripPointListView from '../view/event-list-view';
import NoPointView from '../view/no-point-view';
import { render, RenderPosition } from '../framework/render';
import PointPresenter from './point-presenter';

/**
 * @class Презентер списка точек маршрута и связанных UI-элементов (хедер, фильтры, сортировка).
 */
export default class TripPresenter {
  #tripContainer;
  #points;
  #destinations;
  #offers;
  #tripListComponent;
  #tripMainContainer;
  #tripControlsFiltersContainer;

  /**
   * @constructor
   * @param {HTMLElement} tripContainer Контейнер для списка точек (область `.trip-events`)
   * @param {Object} pointsModel Модель с данными точек, направлений и офферов
   */
  constructor(tripContainer, pointsModel) {
    this.#tripContainer = tripContainer;
    this.#points = pointsModel.points;
    this.#destinations = pointsModel.destinations;
    this.#offers = pointsModel.offers;
    this.#tripListComponent = new TripPointListView();
    this.#tripMainContainer = document.querySelector('.trip-main');
    this.#tripControlsFiltersContainer = document.querySelector('.trip-controls__filters');
  }

  init() {
    this.#renderContent();
  }

  #renderContent() {
    this.#renderHeader();
    this.#renderEmptyPage();
    this.#renderPoints();
  }

  #renderHeader() {
    render(new HeaderTripInfoBlock(), this.#tripMainContainer, RenderPosition.AFTERBEGIN);
    render(new TripFilter(), this.#tripControlsFiltersContainer);
  }

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
      render(new TripSort(), this.#tripContainer);
      render(this.#tripListComponent, this.#tripContainer);
      for (let i = 0; i < this.#points.length; i++) {
        const pointPresenter = new PointPresenter({
          pointListContainer: this.#tripListComponent.element,
          point: this.#points[i],
          destinations: this.#destinations,
          offers: this.#offers
        });
        pointPresenter.init();
      }
    }
  }
}

