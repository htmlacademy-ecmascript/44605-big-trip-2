import Filter from '../view/filter-view';
import NewPointView from '../view/new-point-view';
import Observable from '../framework/observable';
import { render, remove, replace } from '../framework/render';
import { UpdateType } from '../const';

export default class HeaderPresenter extends Observable {
  #tripMainContainer = document.querySelector('.trip-main'); // Контейнер Header для фильтров, карты маршрута, стоимости
  #tripFilterContainer = document.querySelector('.trip-controls__filters'); // Контейнер для списка Filter
  #currentFilter = null;
  #filterModel = null;
  #filterChangeHandler = null; // Функция, приходит из BodyPresnter
  #newPointButtonHandler = null; // Функция, приходит из BodyPresnter

  #filterComponent = null;
  #buttonNewPointComponent = null;

  constructor({ filterModel, onFilterClick, onNewPointClick }) {
    super();
    this.#filterModel = filterModel;
    this.#filterChangeHandler = onFilterClick;
    this.#newPointButtonHandler = onNewPointClick;
    this.#filterModel.addObserver(this.#handleFilterModelChange);
  }

  init() {
    this.#renderFilter();
    this.#renderButton();
  }

  destroyFilter() {
    remove(this.#filterComponent);
  }

  destroyButton() {
    remove(this.#buttonNewPointComponent);
  }

  #renderFilter() {
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent =
      new Filter({
        currentFilter: this.#filterModel.filter,
        onFilterClick: this.#handleFilterChange
      });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#tripFilterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #renderButton() {
    this.#buttonNewPointComponent =
      new NewPointView({
        onNewPointButtonClick: this.#newPointButtonHandler,
      });
    render(this.#buttonNewPointComponent, this.#tripMainContainer);
  }

  #handleFilterModelChange = () => {
    this.#renderFilter();
  };

  #handleFilterChange = (filter) => {
    if (filter === this.#filterModel.filter) {
      return;
    }
    this.#filterModel.setFilter(UpdateType.MAJOR, filter);
    this.#filterChangeHandler();
  };
}
