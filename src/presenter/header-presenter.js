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
  #filterChangeHandler = null; // Функция, приходит из BodyPresenter
  #newPointButtonHandler = null; // Функция, приходит из BodyPresenter

  #filterComponent = null;
  #buttonNewPointComponent = null;

  constructor({ filterModel, onFilterClick, onNewPointClick }) {
    super();
    this.#filterModel = filterModel;
    this.#filterChangeHandler = onFilterClick;
    this.#newPointButtonHandler = onNewPointClick;
    this.#filterModel.addObserver(this.#handleFilterModelChange);
  }

  init(isLoading) {
    this.#renderFilter(isLoading);
    this.#renderButton(isLoading);
  }

  #renderFilter(isLoading) {
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent =
      new Filter({
        isLoading: isLoading,
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

  #renderButton(isLoading) {
    const prevButtonNewPointComponent = this.#buttonNewPointComponent;

    this.#buttonNewPointComponent =
      new NewPointView({
        isLoading: isLoading,
        onNewPointButtonClick: this.#newPointButtonHandler,
      });

    if (prevButtonNewPointComponent === null) {
      render(this.#buttonNewPointComponent, this.#tripMainContainer);
      return;
    }

    replace(this.#buttonNewPointComponent, prevButtonNewPointComponent);
    remove(prevButtonNewPointComponent);
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
