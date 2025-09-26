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
  #tripMainContainer;
  #tripControlsFiltersContainer;

  constructor({ tripContainer, pointsModel }) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#tripListComponent = new TripPointListView();
    this.#tripMainContainer = document.querySelector('.trip-main');
    this.#tripControlsFiltersContainer = document.querySelector('.trip-controls__filters');
  }

  init() {
    this.#renderHeader();
    this.#renderSorting();
    this.#renderPoints();
  }

  /**
   * @returns {HTMLElement} Маршрут, стоимость и фильтры в шапке сайта
   */
  #renderHeader() {
    // Отрисовал шапку сайта (маршрут / стоимость)
    render(new HeaderTripInfoBlock(), this.#tripMainContainer, RenderPosition.AFTERBEGIN);
    render(new TripFilter(), this.#tripControlsFiltersContainer);
  }

  /**
   * @returns {HTMLElement} Элемент сортировки точек маршрута
   */
  #renderSorting() {
    render(new TripSort(), this.#tripContainer);
  }

  /**
   * @returns {HTMLElement}  Список точек маршрута, либо стартовую страницу
   */
  #renderPoints() {
    const points = this.#pointsModel.points;
    const destinations = this.#pointsModel.destinations;
    const offers = this.#pointsModel.offers;
    const filterInputs = document.querySelectorAll('.trip-filters__filter-input');

    // Если точек нет — показываем заглушку и выходим
    if (points.length === 0) {
      filterInputs.forEach((input) => {
        input.disabled = true;
      });
      render(new NoPointView(), this.#tripContainer);
    } else {
      //Иначе добавляем ul и отрисовываем список точек
      render(this.#tripListComponent, this.#tripContainer);
      for (let i = 0; i < points.length; i++) {
        const pointPresenter = new PointPresenter({
          pointListContainer: this.#tripListComponent.element,
          point: points[i],
          destinations,
          offers
        });
        pointPresenter.init();
      }
    }
  }
}
