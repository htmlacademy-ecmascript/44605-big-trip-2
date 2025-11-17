import TripFilterView from '../view/trip-filter-view';
import { render } from '../framework/render';

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

  get filter() {
    this.#filterModel.filter;
  }

  init() {
    console.log(this.filter);
  }


}
