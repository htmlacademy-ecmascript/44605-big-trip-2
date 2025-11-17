import NewPointView from '../view/new-point-view';
import FilterPresenter from './filter-presenter';
import { render } from '../framework/render';

export default class TripHeaderPresenter {
  #headerContainer = null;
  #filterViewComponent = null;
  #buttonViewComponent = null;
  #filterModel = null;
  #pointsModel = null;
  #filterPresenter = null;
  #filterChangeHandler = null;

  constructor({ headerContainer, filterModel, pointsModel, filterChangeHandler }) {
    this.#headerContainer = headerContainer;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;
    this.#filterChangeHandler = filterChangeHandler;
  }

  init() {
    this.#renderFilter();
    this.#renderButton();
  }

  /**
   * Метод для добавления на страницу компонента фильтрации
   * @description Создаю компонент, затем рендерим в контейнер "шапки". Внутри передаем фукнцию, изменяющую модель фильтров
   */
  #renderFilter() {
    this.#filterPresenter =
      new FilterPresenter({
        filterModel: this.#filterModel,
        pointsModel: this.#pointsModel,
      });

    // this.#filterViewComponent =
    //   new TripFilterView({
    //     currentFilter: this.#filterModel.filter,
    //     filterChangeHandler: this.#handleFilterClick,
    //   });
    // render(this.#filterViewComponent, this.#filterContainer);
  }

  #renderButton() {
    this.#buttonViewComponent =
      new NewPointView({
        onNewPointButtonClick: this.#handleButton
      });

    render(this.#buttonViewComponent, this.#headerContainer);
  }

  #handleFilterClick = (changedFilter) => {
    this.#filterModel.setFilter(changedFilter);
    console.log(changedFilter);
    this.#filterChangeHandler();
  };

  #handleButton = () => {
    console.log('Кнопка нажата');
  };
}
