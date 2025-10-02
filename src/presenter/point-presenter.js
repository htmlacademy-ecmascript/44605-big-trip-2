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
    console.log('CloseForm is run');
  }

  #renderPoint() {

    const replaceCardToForm = () => {
      this.#closeAllForms();
      this.#mode = StatusForm.EDIT;
      document.addEventListener('keydown', escKeyDownHandler);
      replace(this.#pointEditComponent, this.#pointComponent);

    };

    const replaceFormToCard = () => {
      this.#mode = StatusForm.DEFAULT;
      document.removeEventListener('keydown', escKeyDownHandler);
      replace(this.#pointComponent, this.#pointEditComponent);
    };

    function escKeyDownHandler(evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    }

    const favoritSwitch = () => {
      this.#point.isFavorite = !this.#point.isFavorite;
      // Перерисовываем компонент после изменения isFavorite
      const newPointComponent = new TripPointView(
        this.#point,
        this.#destinations,
        this.#offers,
        replaceCardToForm,
        favoritSwitch,
      );
      replace(newPointComponent, this.#pointComponent);
      this.#pointComponent = newPointComponent;
    };

    this.#pointComponent = new TripPointView(
      this.#point,
      this.#destinations,
      this.#offers,
      replaceCardToForm,
      favoritSwitch,
    );

    this.#pointEditComponent = new TripPointEditView(
      this.#point,
      this.#destinations,
      this.#offers,
      replaceFormToCard,
    );

    render(this.#pointComponent, this.#pointListContainer);
  }
}
