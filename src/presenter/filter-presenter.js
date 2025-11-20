import TripFilterView from '../view/trip-filter-view';
import { remove, render, replace } from '../framework/render';
import { FilterType } from '../const';
import { filterPoints } from '../utils';

export default class FilterPresenter {
  #filterContainer = document.querySelector('.trip-controls__filters');
  #filterViewComponent = null;
  #filterModel = null;
  #pointsModel = null;
  #filterChangeHandler = null;

  constructor({ filterModel, pointsModel, filterChangeHandler }) {
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;
    this.#filterChangeHandler = filterChangeHandler;
  }

  get filters() {
    const points = this.#pointsModel.points;

    return Object.values(FilterType).map((type) => ({
      type,
      count: filterPoints(points, type).length
    }));
  }

  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#filterViewComponent;
    this.#filterViewComponent = new TripFilterView({
      currentFilter: this.#filterModel.filter,
      filters: filters,
      filterChangeHandler: this.#filterChangeHandler
    });

    if (prevFilterComponent === null) {
      render(this.#filterViewComponent, this.#filterContainer);
      return;
    }
    replace(this.#filterViewComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }
}
