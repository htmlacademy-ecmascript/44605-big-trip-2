import AbstractView from '../framework/view/abstract-view';
import { FilterType } from '../const';

function createFilter(currentFilter) {
  const filterValue = Object.values(FilterType);
  return `
   <form class="trip-filters" action="#" method="get">
    ${filterValue.map((filter) => createFilterItem(currentFilter, filter)).join('')}
    </form>`;
}

function createFilterItem(currentFilter, filter) {
  return `
  <div class="trip-filters__filter">
      <input
        id="filter-${filter}"
        class="trip-filters__filter-input
        visually-hidden"
        type="radio"
        name="trip-filter"
        value="${filter}"
        ${currentFilter === filter ? 'checked' : ''}>
      <label
        class="trip-filters__filter-label"
        for="filter-${filter}">
          ${filter}
      </label>
    </div>`;

}


export default class TripFilterView extends AbstractView {
  #currentFilter = null;
  #filterChangeHandler = null;

  constructor({ currentFilter, filterChangeHandler }) {
    super();
    this.#currentFilter = currentFilter;
    this.#filterChangeHandler = filterChangeHandler;
    this.element.addEventListener('change', this.#handleFilterClick);
  }

  get template() {
    return createFilter(this.#currentFilter);
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
