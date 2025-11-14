import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../const.js';

function createFilterComponent(filter, loaderFlag) {
  return `<form class="trip-filters" action="#" method="get">
                <div class="trip-filters__filter">
                  <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" ${loaderFlag ? 'disabled' : ''} ${filter === FilterType.EVERYTHING ? 'checked' : ''}>
                  <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
                </div>

                <div class="trip-filters__filter">
                  <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future" ${loaderFlag ? 'disabled' : ''} ${filter === FilterType.FUTURE ? 'checked' : ''}>
                  <label class="trip-filters__filter-label" for="filter-future">Future</label>
                </div>

                <div class="trip-filters__filter">
                  <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present" ${loaderFlag ? 'disabled' : ''} ${filter === FilterType.PRESENT ? 'checked' : ''}>
                  <label class="trip-filters__filter-label" for="filter-present">Present</label>
                </div>

                <div class="trip-filters__filter">
                  <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" ${loaderFlag ? 'disabled' : ''} ${filter === FilterType.PAST ? 'checked' : ''}>
                  <label class="trip-filters__filter-label" for="filter-past">Past</label>
                </div>

                <button class="visually-hidden" type="submit">Accept filter</button>
              </form>`;
}

export default class Filter extends AbstractView {
  #currentFilter = null;
  #filterChangeHandler = null;
  #isLoading = null;

  constructor({ isLoading, currentFilter, onFilterClick }) {
    super();
    this.#isLoading = isLoading;
    this.#currentFilter = currentFilter;
    this.#filterChangeHandler = onFilterClick;
    this._restoreHandlers();
  }

  get template() {
    return createFilterComponent(this.#currentFilter, this.#isLoading);
  }

  _restoreHandlers() {
    this.element.addEventListener('click', this.#handleChangeFilter);
  }

  #handleChangeFilter = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    evt.preventDefault();
    this.#filterChangeHandler(evt.target.value);
  };
}
