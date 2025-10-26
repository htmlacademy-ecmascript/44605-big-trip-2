import TripPointView from '../view/point-view';
import TripPointEditView from '../view/edit-point-view';
import { render, replace } from '../framework/render';
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
    this.#pointListContainer = pointListContainer; // 5.2 Контейнер для отрисовки точек маршрута
    this.#point = point; // 5.2 Точка маршрута (одна из массива всех точек Points)
    this.#destinations = destinations; // 5.2 Массив всех направлений
    this.#offers = offers; // 5.2 Массив всех офферов
    this.#closeAllForms = closeForms; // 5.2 Функция обработчик клика
  }

  // 5.3
  init() {
    this.#renderPoint();
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
      this.#favoritSwitch,
    );
    replace(newPointComponent, this.#pointComponent);
    this.#pointComponent = newPointComponent;
  };

  #handleFormSubmit = (updatePoint) => {
    this.#point = updatePoint;
    this.#replaceFormToCard();
    this.#replaceComponent();
  };

  #favoritSwitch = () => {
    this.#point.isFavorite = !this.#point.isFavorite;
    // Перерисовываем компонент после изменения isFavorite
    this.#replaceComponent();
  };

  #renderPoint() {
    // 5.3.1
    this.#pointComponent = new TripPointView(
      this.#point,
      this.#destinations,
      this.#offers,
      this.#replaceCardToForm, // Функция замены компонента точки на компонент редактирования
      this.#favoritSwitch, // Функция обработки клика на звезду(избранное)
    );

    // 5.3.2
    this.#pointEditComponent = new TripPointEditView(
      this.#point,
      this.#destinations,
      this.#offers,
      this.#replaceFormToCard, // Функция замены компонента редактирования точки на компонент точки
      this.#handleFormSubmit,
    );

    // 5.3.3
    render(this.#pointComponent, this.#pointListContainer);
  }
}
