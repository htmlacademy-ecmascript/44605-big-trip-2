import TripPointView from '../view/point-view';
import TripPointEditView from '../view/edit-point-view';
import { render, replace } from '../framework/render';

/**
 * @class Презентер управления одной точкой маршрута: карточка + форма редактирования.
 */
export default class PointPresenter {
  #pointListContainer;
  #point;
  #destinations;
  #offers;
  #pointComponent;
  #pointEditComponent;

  /**
   * @constructor
   * @param {Object} params
   * @param {HTMLElement} params.pointListContainer Контейнер `<ul>` для вставки точки
   * @param {Object} params.point Данные точки маршрута
   * @param {Array} params.destinations Массив направлений
   * @param {Array} params.offers Массив офферов
   */
  constructor({ pointListContainer, point, destinations, offers }) {
    this.#pointListContainer = pointListContainer;
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  init() {
    this.#renderPoint();
  }

  #renderPoint() {
    const replaceCardToForm = () => {
      replace(this.#pointEditComponent, this.#pointComponent);
    };

    const replaceFormToCard = () => {
      replace(this.#pointComponent, this.#pointEditComponent);
    };

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const favoritSwitch = () => {
      this.#point.isFavorite = !this.#point.isFavorite;
      // Перерисовываем компонент после изменения isFavorite
      const newPointComponent = new TripPointView(
        this.#point, this.#destinations, this.#offers,
        () => {
          replaceCardToForm();
          document.addEventListener('keydown', escKeyDownHandler);
        },
        favoritSwitch
      );
      replace(newPointComponent, this.#pointComponent);
      this.#pointComponent = newPointComponent;
    };

    this.#pointComponent = new TripPointView(
      this.#point, this.#destinations, this.#offers,
      () => {
        replaceCardToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      },
      favoritSwitch
    );

    this.#pointEditComponent = new TripPointEditView(
      this.#point, this.#destinations, this.#offers,
      () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    );

    render(this.#pointComponent, this.#pointListContainer);
  }
}
