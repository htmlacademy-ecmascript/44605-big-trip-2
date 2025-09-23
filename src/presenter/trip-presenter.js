import TripSort from '../view/sort-view';
import TripFilter from '../view/trip-filter-view';
import HeaderTripInfoBlock from '../view/header-info-trip';
import TripPointView from '../view/point-view';
import TripPointListView from '../view/event-list-view';
import TripPointEditView from '../view/edit-point-view';
import { render, RenderPosition, replace } from '../framework/render';

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
    const points = this.#pointsModel.points;
    const destinations = this.#pointsModel.destinations;
    const offers = this.#pointsModel.offers;

    const tripMainContainer = document.querySelector('.trip-main');
    const tripControlsFiltersContainer = document.querySelector('.trip-controls__filters');

    render(new HeaderTripInfoBlock(), tripMainContainer, RenderPosition.AFTERBEGIN); // Отрисовал шапку сайта (маршрут / стоимость)
    render(new TripFilter(), tripControlsFiltersContainer); // Отрисовал фильтры
    render(new TripSort(), this.#tripContainer); // Отрисовал сортировку
    render(this.#tripListComponent, this.#tripContainer); // Создал <ul>
    // render(new TripPointEditView(points[0], destinations, offers), this.#tripListComponent.element); // Создал форму редактирования точки маршрута
    for (let i = 1; i < points.length; i++) {
      this.#renderPoint(points[i], destinations, offers);
    }
  }

  /**
   * Метод для отрисовки точки
   * @param {Object} point - Иформация о точке
   * @param {Array} destinations  - Массив пунктов назначения
   * @param {Array} offers - Массив доп.предложений
   */
  #renderPoint(point, destinations, offers) {

    const eskKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', eskKeyDownHandler);
      }
    };

    const pointComponent = new TripPointView(
      point, destinations, offers,
      () => {
        replaceCardToForm();
        document.addEventListener('keydown', eskKeyDownHandler);
      }

    );

    const pointEditComponent = new TripPointEditView(
      point, destinations, offers,
      () => {
        replaceFormToCard();
        document.addEventListener('keydown', eskKeyDownHandler);
      }

    );

    function replaceCardToForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceFormToCard() {
      replace(pointComponent, pointEditComponent);
    }

    render(pointComponent, this.#tripListComponent.element);
  }
}
