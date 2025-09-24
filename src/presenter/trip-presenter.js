import TripSort from '../view/sort-view';
import TripFilter from '../view/trip-filter-view';
import HeaderTripInfoBlock from '../view/header-info-trip';
import TripPointView from '../view/point-view';
import TripPointListView from '../view/event-list-view';
import TripPointEditView from '../view/edit-point-view';
import NoPointView from '../view/no-point-view';
import { render, RenderPosition, replace } from '../framework/render';

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

  /**
   * Публичный метод для отрисовки страницы
   */
  init() {
    this.#renderContent();
  }

  /**
   * Приватный метод для отрисовки страницы
   */
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
      this.#renderPoint(points[i], destinations, offers);
    }
  }

  /**
   * Приватный метод для отрисовки точки маршрута
   * @param {object} point - Информация о точке
   * @param {object} destinations - Массив пунктов назначения
   * @param {object} offers - Массив доп.предложений
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
        document.removeEventListener('keydown', eskKeyDownHandler);
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
