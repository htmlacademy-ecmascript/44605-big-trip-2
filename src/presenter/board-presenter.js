import HeaderPresenter from './header-presenter';
import BodyPresenter from './body-presenter';

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
   * @description Конструктор принимает на вход контейнер для размещения точек маршрута и модель, содержащую информацию о всех точках, направлениях и доп.предложениях
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
    this.#headerPresenter = new HeaderPresenter({
      headerContainer: this.#headerContainer,
      filterModel: this.#filterModel,
      pointsModel: this.#pointsModel,
      onNewPointButtonClick: this.#handleNewPointButton
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

  #handleNewPointButton = () => {
    this.#bodyPresenter.createNewPoint();
  };
}
