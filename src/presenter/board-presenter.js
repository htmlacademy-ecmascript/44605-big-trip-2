import TripHeaderPresenter from './trip-header-presenter';
import BodyPresenter from './body-presenter';
import { FilterType } from '../const';

export default class BoardPresenter {
  #headerContainer = null;
  #bodyContainer = null;
  #pointsModel = null;
  #filterModel = null;
  #headerPresenter = null;
  #bodyPresenter = null;

  /**
   * @constructor
   * @param {Object} params - Объект с данными
   * @param {*} params.headerContainer - Контейнер для размещения фильтров и кнопки "NewEvent"
   * @param {*} params.bodyContainer - Контейнер для размещения точек маршрута
   * @param {*} params.pointsModel - Модель с данными маршрута
   * @description Конструктор принимает на вход контейнер для размещения точек маршрута и модель, сожержащую информацию о всех точках, направлениях и доп.предложениях
   */
  constructor({ headerContainer, bodyContainer, pointsModel, filterModel }) {
    this.#headerContainer = headerContainer;
    this.#bodyContainer = bodyContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
  }

  init() {
    this.#renderHeader();
    this.#renderBody();
  }

  #renderHeader() {
    this.#headerPresenter = new TripHeaderPresenter({
      headerContainer: this.#headerContainer,
      filterModel: this.#filterModel,
      pointsModel: this.#pointsModel,
      filterChangeHandler: this.#handleFilterChange
    });
    this.#headerPresenter.init();
  }

  #renderBody() {
    this.#bodyPresenter =
      new BodyPresenter({
        bodyContainer: this.#bodyContainer,
        pointsModel: this.#pointsModel,
        filterModel: this.#filterModel,
      });
    this.#bodyPresenter.init();
  }

  #handleFilterChange = () => {
    console.log('Сработала смена фильтра');
  }
}
