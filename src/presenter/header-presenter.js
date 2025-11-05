import TripFilter from '../view/trip-filter-view';
import NewPointView from '../view/new-point-view';
import Observable from '../framework/observable';
import { render, remove } from '../framework/render';

export default class HeaderPresenter extends Observable {
  #tripMainContainer = document.querySelector('.trip-main'); // Контейнер Header для фильтров, карты маршрута, стоимости
  #tripFilterContainer = document.querySelector('.trip-controls__filters'); // Контейнер для списка Filter
  #handleFilterChange = null; // Функция, приходит из BodyPresnter
  #handleNewPointButton = null; // Функция, приходит из BodyPresnter

  #filterComponent = null;
  #buttonNewPointComponent = null;

  constructor({ onFilterClick, onNewPointClick }) {
    super();
    this.#handleFilterChange = onFilterClick;
    this.#handleNewPointButton = onNewPointClick;
  }

  init() {
    this.#filterComponent =
      new TripFilter({
        onFilterClick: this.#handleFilterChange
      });

    this.#buttonNewPointComponent =
      new NewPointView({
        onNewPointButtonClick: this.#handleNewPointButton,
      });

    render(this.#filterComponent, this.#tripFilterContainer);
    render(this.#buttonNewPointComponent, this.#tripMainContainer);
  }

  destroy() {
    remove(this.#filterComponent);
    remove(this.#buttonNewPointComponent);
  }
}
