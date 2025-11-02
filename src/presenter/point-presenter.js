import TripPointView from '../view/point-view';
import TripPointEditView from '../view/edit-point-view';
import { render, replace, remove } from '../framework/render';
import { StatusForm } from '../const';

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
    this.#pointListContainer = pointListContainer; // Контейнер для отрисовки точек маршрута
    this.#point = point; // Точка маршрута (одна из массива всех точек Points)
    this.#destinations = destinations; // Массив всех направлений
    this.#offers = offers; // Массив всех офферов
    this.#closeAllForms = closeForms; // Функция обработчик закрывает все открытые формы редактирования при открытии новой формы для редактирования у другой точки
  }

  /**
   * @description Метод инициализации PointPresenter
   */
  init() {
    this.#pointComponent = new TripPointView(
      this.#point,
      this.#destinations,
      this.#offers,
      this.#replaceCardToForm, // Функция замены компонента точки на компонент редактирования
      this.#favoriteSwitch, // Функция обработки клика на звезду(избранное)
    );

    this.#pointEditComponent = new TripPointEditView(
      this.#point,
      this.#destinations,
      this.#offers,
      this.#replaceFormToCard, // Функция замены компонента редактирования точки на компонент точки
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
  closeForm() {
    if (this.#mode !== StatusForm.DEFAULT) {
      this.#replaceFormToCard();
    }
  }

  /**
   * @description Функция открытия компонента редактирования
   */
  #replaceCardToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent); // Заменаем один компонент на другой(Инициализация ранее п.5.3)
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#closeAllForms(); // Метод проходит по MAP и вызывает метод closeForm() - закрывает если открыта форма редактирвоания
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
  #replaceComponent = () => {
    const newPointComponent = new TripPointView(
      this.#point,
      this.#destinations,
      this.#offers,
      this.#replaceCardToForm,
      this.#favoriteSwitch,
    );
    replace(newPointComponent, this.#pointComponent);
    this.#pointComponent = newPointComponent;
  };

  /**
   * @description Функция обновления данных при нажатии SAVE
   */
  #handleFormSubmit = (updatePoint) => {
    this.#point = updatePoint;
    this.#replaceFormToCard();
    this.#replaceComponent();
  };

  /**
 * @description Функция обновления данных при нажатии "Избранное"
 */
  #favoriteSwitch = () => {
    this.#point.isFavorite = !this.#point.isFavorite;
    this.#replaceComponent();
  };
}
