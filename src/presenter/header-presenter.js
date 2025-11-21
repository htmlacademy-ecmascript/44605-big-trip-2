import NewPointView from '../view/new-point-view';
import FilterPresenter from './filter-presenter';
import { UpdateType } from '../const';
import { render } from '../framework/render';

export default class HeaderPresenter {
  #headerContainer = null;
  #filterViewComponent = null;
  #buttonViewComponent = null;
  #filterModel = null;
  #pointsModel = null;
  #filterPresenter = null;
  #handleNewPointButton = null;

  constructor({ headerContainer, filterModel, pointsModel, onNewPointButtonClick }) {
    this.#headerContainer = headerContainer;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;
    this.#handleNewPointButton = onNewPointButtonClick;
  }

  init() {
    this.#renderFilter();
    this.#renderButton();
  }

  /**
   * Метод для добавления на страницу компонента фильтрации
   * @description Создаю компонент, затем рендерим в контейнер "шапки". Внутри передаем функцию, изменяющую модель фильтров
   */
  #renderFilter() {
    this.#filterPresenter =
      new FilterPresenter({
        filterModel: this.#filterModel,
        pointsModel: this.#pointsModel,
        filterChangeHandler: this.#handleFilterChange,
      });

    this.#filterPresenter.init();
  }

  #renderButton() {
    this.#buttonViewComponent =
      new NewPointView({
        onNewPointButtonClick: this.#handleNewPointButton
      });

    render(this.#buttonViewComponent, this.#headerContainer);
  }

  #handleFilterChange = (newValueFilter) => {
    this.#filterModel.setFilter(UpdateType.MINOR, newValueFilter);
  };
}
