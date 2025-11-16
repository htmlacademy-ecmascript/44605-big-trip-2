import TripPointEditView from '../view/point-edit-view';
import { render, remove, RenderPosition } from '../framework/render';
import { StatusForm, UserAction, UpdateType } from '../const';
import { DEFAULT_POINT } from '../const';

/**
 * @class Презентер управления одной точкой маршрута: карточка + форма редактирования.
 */
export default class NewPointPresenter {
  #pointListContainer = null; // Контейнер для отрисовки точек маршрута
  #point = null; // Объект точки маршрута
  #destinations = null; // Массив всех направлений
  #offers = null; // Массив всех офферов

  #buttonNewPoint = null;
  #pointEditComponent = null;
  #handleCloseAllForm = null;
  #handleDataUpdate = null;
  #mode = StatusForm.DEFAULT;

  /**
   * @constructor
   * @param {Object} params
   * @param {HTMLElement} params.pointListContainer Контейнер `<ul>` для вставки точки
   * @param {function} params.handleEditTypeChange - Функция-обработчик закрытия форм редактирования
   * @param {function} params.handleDataChange - Функция-обработчик, будет реагировать на действия пользователя
   */
  constructor({ pointListContainer, handleEditTypeChange, handleDataChange }) {
    this.#pointListContainer = pointListContainer;
    this.#handleCloseAllForm = handleEditTypeChange; // пока не использую
    this.#handleDataUpdate = handleDataChange;
  }

  /**
   * Метод инициализации NewPointPresenter
   */
  init(destinations, offers, point = DEFAULT_POINT) {
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;

    this.#buttonNewPoint = document.querySelector('.trip-main__event-add-btn');
    this.#buttonNewPoint.disabled = true;

    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointEditComponent = new TripPointEditView({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onCloseEditFormButtonClick: this.#handleCloseNewPointForm, // click on Cancel
      onSaveFormButtonClick: this.#handleSaveNewPointForm, // click on Save
      onDeletePointButtonClick: this.#handleCloseNewPointForm,
    });

    if (prevPointEditComponent === null) {
      render(this.#pointEditComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);
      document.addEventListener('keydown', this.#escKeyDownHandler);
    }
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#pointEditComponent);
    this.#buttonNewPoint.disabled = false;
  }

  #handleCloseNewPointForm = () => {
    this.destroy();
  };

  #handleSaveNewPointForm = (updatedPoint) => {
    this.#handleDataUpdate(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      updatedPoint
    );
    this.destroy();
    this.#buttonNewPoint.disabled = false;
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#handleCloseNewPointForm();
    }
  };
}
