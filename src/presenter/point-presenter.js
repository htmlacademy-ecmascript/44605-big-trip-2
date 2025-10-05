import TripPointView from '../view/point-view';
import TripPointEditView from '../view/edit-point-view';
import { render, replace } from '../framework/render';

const StatusForm = {
  EDIT: 'edit',
  DEFAULT: 'default',
};

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
  #closeAllForms;
  #mode = StatusForm.DEFAULT;

  /**
   * @constructor
   * @param {Object} params
   * @param {HTMLElement} params.pointListContainer Контейнер `<ul>` для вставки точки
   * @param {Object} params.point Данные точки маршрута
   * @param {Array} params.destinations Массив направлений
   * @param {Array} params.offers Массив офферов
   */
  constructor({ pointListContainer, point, destinations, offers, closeForms }) {
    this.#pointListContainer = pointListContainer;
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#closeAllForms = closeForms;
  }

  init() {
    this.#renderPoint();
  }

  closeForm() {
    if (this.#mode !== StatusForm.DEFAULT) {
      replace(this.#pointComponent, this.#pointEditComponent);
      this.#mode = StatusForm.DEFAULT;
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  }

  #replaceCardToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#closeAllForms();
    this.#mode = StatusForm.EDIT;
  };

  #replaceFormToCard = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = StatusForm.DEFAULT;
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToCard();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #favoritSwitch = () => {
    this.#point.isFavorite = !this.#point.isFavorite;
    // Перерисовываем компонент после изменения isFavorite
    const newPointComponent = new TripPointView(
      this.#point,
      this.#destinations,
      this.#offers,
      this.#replaceCardToForm,
      this.#favoritSwitch,
    );
    replace(newPointComponent, this.#pointComponent);
    this.#pointComponent = newPointComponent;
  };

  #renderPoint() {
    this.#pointComponent = new TripPointView(
      this.#point,
      this.#destinations,
      this.#offers,
      this.#replaceCardToForm,
      this.#favoritSwitch,
    );

    this.#pointEditComponent = new TripPointEditView(
      this.#point,
      this.#destinations,
      this.#offers,
      this.#replaceFormToCard,
    );

    render(this.#pointComponent, this.#pointListContainer);
  }
}
