import AbstractView from '../framework/view/abstract-view.js';

function createTripFilterComponent() {
  return `<form class="trip-filters" action="#" method="get">
                <div class="trip-filters__filter">
                  <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
                  <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
                </div>

                <div class="trip-filters__filter">
                  <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
                  <label class="trip-filters__filter-label" for="filter-future">Future</label>
                </div>

                <div class="trip-filters__filter">
                  <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">
                  <label class="trip-filters__filter-label" for="filter-present">Present</label>
                </div>

                <div class="trip-filters__filter">
                  <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">
                  <label class="trip-filters__filter-label" for="filter-past">Past</label>
                </div>

                <button class="visually-hidden" type="submit">Accept filter</button>
              </form>`;
}

export default class TripFilter extends AbstractView {
  #filterChangeHandler = null;

  constructor({ onFilterClick }) {
    super();
    this.#filterChangeHandler = onFilterClick;

    this._restoreHandlers();
  }

  get template() {
    return createTripFilterComponent();
  }

  _restoreHandlers() {
    this.element.addEventListener('click', this.#handleChangeFilter);
  }

  #handleChangeFilter = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    this.#filterChangeHandler();
  };
}
