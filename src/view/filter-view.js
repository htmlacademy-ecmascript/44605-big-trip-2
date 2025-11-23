import AbstractView from '../framework/view/abstract-view';

function createFilter(currentFilter, filters) {

  return `
   <form class="trip-filters" action="#" method="get">
    ${filters.map((filter) => createFilterItem(currentFilter, filter)).join('')}
    </form>`;
}

function createFilterItem(currentFilter, filter) {
  const { type, count } = filter;
  return `
  <div class="trip-filters__filter">
      <input
        id="filter-${type}"
        class="trip-filters__filter-input
        visually-hidden"
        type="radio"
        name="trip-filter"
        value="${type}"
        ${currentFilter === type ? 'checked' : ''}
        ${count === 0 ? 'disabled' : ''}>
  <label
    class="trip-filters__filter-label"
    for="filter-${type}">
    ${type}
  </label>
    </div > `;
}

export default class FilterView extends AbstractView {
  #currentFilter = null;
  #filters = null;
  #filterChangeHandler = null;

  constructor({ currentFilter, filters, filterChangeHandler }) {
    super();
    this.#currentFilter = currentFilter;
    this.#filters = filters;
    this.#filterChangeHandler = filterChangeHandler;
    this.element.addEventListener('change', this.#handleFilterClick);
  }

  get template() {
    return createFilter(this.#currentFilter, this.#filters);
  }

  /**
   * Функция-обработчик изменения фильтра
   * @param {*} evt - элемент, на котором сработал клик
   * @description Внутри себя вызывает функцию из конструктора, полученную из HeaderPresenter
   */
  #handleFilterClick = (evt) => {
    if (this.currentFilter === evt.target.value) {
      return;
    }
    evt.preventDefault();
    this.#filterChangeHandler(evt.target.value);
  };
}
