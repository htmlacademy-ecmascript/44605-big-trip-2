import TripSort from '../view/sort-view';
import TripFilter from '../view/trip-filter-view';
import HeaderTripInfoBlock from '../view/header-info-trip';
import TripPointListView from '../view/event-list-view';
import NoPointView from '../view/no-point-view';
import { render, RenderPosition } from '../framework/render';
import PointPresenter from './point-presenter';

/**
 * Класс для управления списком точек маршрута
 * @param {Object} tripContainer - Контейнер для размещения списка точек
 * @param {Object} pointsModel - Модель для работы с точками
 * @returns {Object} - Объект для управления списком точек маршрута
 */
export default class TripPresenter {
  #tripContainer;
  #pointsModel;
  #tripListComponent;

  constructor({ tripContainer, pointsModel }) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#tripListComponent = new TripPointListView();
  }

  init() {
    this.#renderContent();
  }

  #renderContent() {
    const points = this.#pointsModel.points;
    const destinations = this.#pointsModel.destinations;
    const offers = this.#pointsModel.offers;

    const tripMainContainer = document.querySelector('.trip-main');
    const tripControlsFiltersContainer = document.querySelector('.trip-controls__filters');


    // Отрисовал фильтры
    render(new TripFilter(), tripControlsFiltersContainer);

    // Если точек нет — показываем заглушку и выходим
    if (points.length === 0) {
      const filterInputs = document.querySelectorAll('.trip-filters__filter-input');
      filterInputs.forEach((input) => {
        input.disabled = true;
      });
      render(new NoPointView(), this.#tripContainer);
      return;
    }

    // Отрисовал шапку сайта (маршрут / стоимость)
    render(new HeaderTripInfoBlock(), tripMainContainer, RenderPosition.AFTERBEGIN);

    // Отрисовал сортировку
    render(new TripSort(), this.#tripContainer);

    // Отрисовал список точек
    render(this.#tripListComponent, this.#tripContainer); // Создал <ul>

    for (let i = 0; i < points.length; i++) {
      const presenter = new PointPresenter({
        pointListContainer: this.#tripListComponent.element,
        point: points[i],
        destinations,
        offers
      });
      presenter.init();
    }
  }
}
