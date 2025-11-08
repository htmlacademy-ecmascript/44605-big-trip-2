import PointView from '../view/point-view';
import TripPointEditView from '../view/point-edit-view';
import { render, replace, remove, RenderPosition } from '../framework/render';
import { StatusForm, UserAction, UpdateType } from '../const';
import { defaultPoint } from '../mock/points';

/**
 * @class Презентер управления одной точкой маршрута: карточка + форма редактирования.
 */
export default class PointPresenter {
  #pointListContainer = null; // Контейнер для отрисовки точек маршрута
  #point = null; // Объект точки маршрута
  #destinations = null; // Массив всех направлений
  #offers = null; // Массив всех офферов
  #pointComponent = null;
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
    this.#handleCloseAllForm = handleEditTypeChange;
    this.#handleDataUpdate = handleDataChange;
  }

  /**
   * Метод инициализации PointPresenter
   */
  init(destinations, offers, point = defaultPoint) {
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onEditFormButtonClick: this.#handleOpenFormArrow,
      onFavoriteButtonClick: this.#handleFavoriteButton,
    });

    this.#pointEditComponent = new TripPointEditView({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onCloseEditFormButtonClick: this.#handleCloseFormArrow,
      onSaveFormButtonClick: this.#handleSaveButton,
      onDeletePointButtonClick: this.#handleDeleteButton,
    });

    if (this.#point === defaultPoint) {
      render(this.#pointComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);
      return;
    }

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }
    if (this.#mode === StatusForm.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }
    if (this.#mode === StatusForm.EDIT) {
      replace(this.#pointComponent, prevPointEditComponent);
      this.#mode = StatusForm.DEFAULT;
    }
    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  /**
   * Метод удаления компонентов со страницы
   */
  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  /**
   *  Метод закрытия всех открытых форм редактирования
   */
  resetViewToDefault() {
    if (this.#mode !== StatusForm.DEFAULT) {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToCard();
    }
  }

  /**
 *  Функция открытия компонента редактирования
 */
  #replaceCardToForm() {
    replace(this.#pointEditComponent, this.#pointComponent); // Заменаем один компонент на другой(Инициализация ранее п.5.3)
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleCloseAllForm(); // Метод проходит по MAP и вызывает метод resetViewToDefault() - закрывает если открыта форма редактирвоания
    this.#mode = StatusForm.EDIT; // После ставим статус - "в редактировании"
  }

  /**
   *  Функиця закрытия компонента редактирования
   */
  #replaceFormToCard() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = StatusForm.DEFAULT;
  }

  // Бестолковый метод, проще сразу вызывать replace напрямую
  #handleOpenFormArrow = () => {
    this.#replaceCardToForm();
  };

  // Бестолковый метод, проще сразу вызывать replace напрямую
  #handleCloseFormArrow = () => {
    this.#replaceFormToCard();
  };

  /**
  *  Функция обновления данных при нажатии "Избранное"
  */
  #handleFavoriteButton = () => {
    this.#handleDataUpdate(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      { ...this.#point, isFavorite: !this.#point.isFavorite },
    );
  };

  /**
   * Функция обработчик нажатия кнопки escape для закрытия формы редактирования
   */
  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToCard();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  /**
   * Функция обновления данных при нажатии SAVE
   * @param {object} updatePoint - Обновленный объект, приходит из State формы редактирования
   * @description проброс идет только в форму редактирования PointEditView
   */
  #handleSaveButton = (updatePoint) => {
    const isMinorUpdate =
      this.#point.dateFrom !== updatePoint.dateFrom || this.#point.dateTo !== updatePoint.dateTo;
    this.#handleDataUpdate(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      updatePoint
    );
  };

  /**
    *  Функция удаления элемента при нажатии DELETE
    */
  #handleDeleteButton = () => {
    this.#handleDataUpdate(
      UserAction.DELETE_POINT,
      UpdateType.MAJOR,
      this.#point
    );
  };
}
