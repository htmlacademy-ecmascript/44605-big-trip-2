import TripPointView from '../view/point-view';
import TripPointEditView from '../view/edit-point-view';
import { render, replace, remove } from '../framework/render';
import { StatusForm, UserAction, UpdateType } from '../const';

/**
 * @class Презентер управления одной точкой маршрута: карточка + форма редактирования.
 */
export default class PointPresenter {
  #pointListContainer = null; // Контейнер для отрисовки точек маршрута
  #point; // Объект точки маршрута
  #destinations; // Массив всех направлений
  #offers; // Массив всех офферов
  #pointComponent;
  #pointEditComponent;
  #handleCloseAllForm;
  #handleDataUpdate = null;
  #mode = StatusForm.DEFAULT;

  /**
   * @constructor
   * @param {Object} params
   * @param {HTMLElement} params.pointListContainer Контейнер `<ul>` для вставки точки
   * @param {Object} params.point Данные точки маршрута
   * @param {Array} params.destinations Массив направлений
   * @param {Array} params.offers Массив офферов
   * @param {function} params.handleEditTypeChange - Функция-обработчик закрытия форм редактирования
   * @param {function} params.handleDataChange - Функция-обработчик, будет реагировать на действия пользователя
   */
  constructor({ pointListContainer, point, destinations, offers, handleEditTypeChange, handleDataChange }) {
    this.#pointListContainer = pointListContainer;
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleCloseAllForm = handleEditTypeChange;
    this.#handleDataUpdate = handleDataChange;
  }

  /**
   * @description Метод инициализации PointPresenter
   */
  init() {
    this.#pointComponent = new TripPointView(
      this.#point,
      this.#destinations,
      this.#offers,
      this.#handleEditArrowClick,
      this.#handleFavoriteClick,
    );

    this.#pointEditComponent = new TripPointEditView(
      this.#point,
      this.#destinations,
      this.#offers,
      this.#handleCloseEditArrowClick, // Функция замены компонента редактирования точки на компонент точки
      this.#handleFormSubmit,
    );

    render(this.#pointComponent, this.#pointListContainer);
  }

  /**
   * @description Метод удаления компонентов со страницы
   */
  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  /**
   * @description Метод закрытия всех открытых форм редактирования
   */
  resetViewToDefault() {
    if (this.#mode !== StatusForm.DEFAULT) {
      this.#replaceFormToCard();
    }
  }

  #handleEditArrowClick = () => {
    this.#replaceCardToForm();
  };

  #handleCloseEditArrowClick = () => {
    this.#replaceFormToCard();
  };

  /**
  * @description Функция обновления данных при нажатии "Избранное"
  */
  #handleFavoriteClick = () => {
    this.#point.isFavorite = !this.#point.isFavorite;
    this.#handleDataUpdate(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      this.#point
    );

    // this.#point.isFavorite = !this.#point.isFavorite;
    // this._replaceComponent();
  };

  /**
   * @description Функция открытия компонента редактирования
   */
  #replaceCardToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent); // Заменаем один компонент на другой(Инициализация ранее п.5.3)
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleCloseAllForm(); // Метод проходит по MAP и вызывает метод closeForm() - закрывает если открыта форма редактирвоания
    this.#mode = StatusForm.EDIT; // После ставим статус - "в редактировании"
  };

  /**
   * @description Фнукиця закрытия компонента редактирования
   */
  #replaceFormToCard = () => {
    this.#pointEditComponent.reset(this.#point);
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = StatusForm.DEFAULT;
  };

  /**
   * @description Функция обработчик нажатия кнопки escape для закрытия формы редактирования
   */
  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToCard();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  /**
   * @description Функция замены элемента
   */
  _replaceComponent(point) {
    const newPointComponent = new TripPointView(
      point,
      this.#destinations,
      this.#offers,
      this.#replaceCardToForm,
      this.#handleFavoriteClick,
    );
    replace(newPointComponent, this.#pointComponent);
    this.#pointComponent = newPointComponent;
  }

  /**
   * @description Функция обновления данных при нажатии SAVE
   */
  #handleFormSubmit = (updatePoint) => {
    this.#point = updatePoint;
    this.#replaceFormToCard();
    this._replaceComponent(this.#point);
  };
}
