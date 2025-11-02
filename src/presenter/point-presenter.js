import TripPointView from '../view/point-view';
import TripPointEditView from '../view/edit-point-view';
import { render, replace, remove } from '../framework/render';
import { StatusForm } from '../const';
import { UserAction, UpdateType } from '../const';

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
    this.#pointListContainer = pointListContainer; // 5.2 Контейнер для отрисовки точек маршрута
    this.#point = point; // 5.2 Точка маршрута (одна из массива всех точек Points)
    this.#destinations = destinations; // 5.2 Массив всех направлений
    this.#offers = offers; // 5.2 Массив всех офферов
    this.#closeAllForms = closeForms; // 5.2 Функция обработчик закрывает все открытые формы редактирования при открытии новой формы для редактирования у другой точки
  }

  // 5.3
  init() {
    this.#renderPoint();
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  closeForm() {
    if (this.#mode !== StatusForm.DEFAULT) {
      this.#replaceFormToCard();
    }
  }

  #replaceCardToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent); // Заменаем один компонент на другой(Инициализация ранее п.5.3)
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#closeAllForms(); // Метод проходит по MAP и вызывает метод closeForm() - закрывает если открыта форма редактирвоания
    this.#mode = StatusForm.EDIT; // После ставим статус - "в редактировании"
  };

  #replaceFormToCard = () => {
    this.#pointEditComponent.reset(this.#point);
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

  // Функция обновления данных при нажатии SAVE
  #handleFormSubmit = (updatePoint) => {
    this.#point = updatePoint;
    this.#replaceFormToCard();
    this.#replaceComponent();
  };

  #favoriteSwitch = () => {
    this.#point.isFavorite = !this.#point.isFavorite;
    this.#replaceComponent();
  };

  #renderPoint() {

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
}
