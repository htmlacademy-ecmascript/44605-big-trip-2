import TripFilter from '../view/trip-filter-view';
import NewPointView from '../view/new-point-view';
import Observable from '../framework/observable';
import { render, remove } from '../framework/render';

export default class HeaderPresenter extends Observable {
  #tripMainContainer = document.querySelector('.trip-main'); // Контейнер Header для фильтров, карты маршрута, стоимости
  #tripFilterContainer = document.querySelector('.trip-controls__filters'); // Контейнер для списка Filter
  #filterChangeHandler = null; // Функция, приходит из BodyPresnter
  #newPointButtonHandler = null; // Функция, приходит из BodyPresnter

  #filterComponent = null;
  #buttonNewPointComponent = null;

  constructor({ onFilterClick, onNewPointClick }) {
    super();
    this.#filterChangeHandler = onFilterClick;
    this.#newPointButtonHandler = onNewPointClick;
  }

  init() {
    // Создаю список фильтров
    this.#filterComponent =
      new TripFilter({
        onFilterClick: this.#filterChangeHandler
      });
    // Создаю кнопку добавления новой точки
    this.#buttonNewPointComponent =
      new NewPointView({
        onNewPointButtonClick: this.#newPointButtonHandler,
      });

    render(this.#filterComponent, this.#tripFilterContainer);
    render(this.#buttonNewPointComponent, this.#tripMainContainer);
  }

  destroy() {
    remove(this.#filterComponent);
    remove(this.#buttonNewPointComponent);
  }

  #handleNewPointButton = () => {
  };
}
