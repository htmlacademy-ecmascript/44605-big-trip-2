import SortView from '../view/sort-view';
import NoPointView from '../view/no-point-view';
import PointListView from '../view/point-list-view';

import PointPresenter from './point-presenter';
import NewPointPresenter from './new-point-presenter';

import { render, remove, replace } from '../framework/render';
import { sortingByPrice, sortingByDay, sortingByTime, filterPoints } from '../utils';
import { SortType, UserAction, UpdateType } from '../const';

/**
 * @class Презентер списка точек маршрута и связанных UI-элементов (хедер, фильтры, сортировка).
 */
export default class BodyPresenter {
  #tripContainer = null; // Контейнер для общего презентера(получаем в main.js)
  #pointsModel = null; // Модель общая (инициализируем в main.js)
  #filterModel = null; // Модель фильтров

  #tripSortComponent = null; // Компонент сортировки(список)
  #tripListComponent = null; // Компонент ul списка для размещения li(точек маршрута)
  #noPointView = null;
  #newPointPresenter = null;
  #pointPresenters = new Map(); // MAP для хранения созданных презентеров Point
  #currentSortType = SortType.DAY; // Переменная для хранения текущей сортировки( по умолчанию DAY )
  #currentFilter = null;
  #currentDate = new Date();
  #filteredPoints = null;

  /**
   * @constructor
   * @param tripContainer Контейнер для списка точек (область `.trip-events`)
   * @param pointsModel Модель с данными точек, направлений и офферов
   * @param filterModel Модель с фильтрами
   */
  constructor({ bodyContainer, pointsModel, filterModel }) {
    this.#tripContainer = bodyContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#handleModelChange); // Подписываемся на событие изменения модели
  }

  /**
   * Геттер презентера для получения массива точек с учетом сортировки
   */
  get points() {
    this.#currentFilter = this.#filterModel.filter;
    this.#filteredPoints = filterPoints(this.#pointsModel.points, this.#currentFilter);
    switch (this.#currentSortType) {
      case SortType.DAY:
        this.#filteredPoints.sort(sortingByDay);
        break;
      case SortType.TIME:
        this.#filteredPoints.sort(sortingByTime); // Эта сортировка работает некорректно
        break;
      case SortType.PRICE:
        this.#filteredPoints.sort(sortingByPrice);
        break;
    }
    return this.#filteredPoints;
  }

  /**
  *  Геттер презентера для получения массива пунктов назначения
  */
  get destinations() {
    return this.#pointsModel.destinations;
  }

  /**
  * Геттер презентера для получения массива доп.предложений
  */
  get offers() {
    return this.#pointsModel.offers;
  }

  /**
   * Метод инициализации BodyPresenter
   */
  init() {
    this.#renderPoints();
  }

  /**
   * Метод отрисовки компонента сортировки
   */
  #renderSortComponent() {
    const prevSortComponent = this.#tripSortComponent;

    this.#tripSortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    if (prevSortComponent === null) {
      render(this.#tripSortComponent, this.#tripContainer);
      return;
    }
    replace(this.#tripSortComponent, prevSortComponent);
    remove(prevSortComponent);
  }

  /**
   *  Метод отрисовки точек маршрута на страницу
   */
  #renderPoints() {
    if (this.points.length !== 0) {
      if (this.#noPointView !== null) {
        remove(this.#noPointView);
        this.#noPointView = null;
      }
      this.#renderSortComponent();

      if (this.#tripListComponent === null) {
        this.#tripListComponent = new PointListView();
        render(this.#tripListComponent, this.#tripContainer);
      }
      for (let i = 0; i < this.points.length; i++) {
        const pointPresenter = new PointPresenter({
          pointListContainer: this.#tripListComponent.element,
          handleEditTypeChange: this.#handleCloseAllForm,
          handleDataChange: this.#handleViewAction,
        });

        pointPresenter.init(this.destinations, this.offers, this.points[i]);
        this.#pointPresenters.set(this.points[i].id, pointPresenter); // Добавляем презентер в Map
      }
    } else {
      this.#renderEmptyPage();
    }
  }

  /**
   * Метод отрисовки пустой страницы, если массив точек маршрута пуст
   */
  #renderEmptyPage() {
    if (this.#tripSortComponent !== null) {
      remove(this.#tripSortComponent);
      this.#tripSortComponent = null;
    }
    if (this.#tripListComponent !== null) {
      remove(this.#tripListComponent);
      this.#tripListComponent = null;
    }

    const prevEmptyPage = this.#noPointView;
    this.#noPointView = new NoPointView(this.#currentFilter);
    if (prevEmptyPage === null) {
      render(this.#noPointView, this.#tripContainer);
      return;
    }
    replace(this.#noPointView, prevEmptyPage);
    remove(prevEmptyPage);
  }

  /**
   * Функция-обработчик кнопки фильтрации
   */
  #handleFilterChange = (filterName) => {

    this.#currentSortType = SortType.DAY;
    this.#currentFilter = filterName;
    this.#handleModelChange(UpdateType.MAJOR);
  };

  /**
   * Функция-обработчик кнопки добавления новой точки маршрута
   */
  #handleNewPointButton = () => {
    if (this.#noPointView !== null) {
      remove(this.#noPointView);
      this.#noPointView = null;
    }
    this.#renderSortComponent();

    if (this.#tripListComponent === null) {
      this.#tripListComponent = new PointListView();
      render(this.#tripListComponent, this.#tripContainer);
    }
    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#tripListComponent.element,
      handleEditTypeChange: this.#handleCloseAllForm,
      handleDataChange: this.#handleViewAction,
    });

    this.#newPointPresenter.init(this.destinations, this.offers);
    this.#pointPresenters.forEach((presenter) => presenter.resetViewToDefault());
  };

  /**
  * Функция обработчик клика сортировки
  * @param sortType - Тип сортировки, выбранный пользователем
  * @description При клике на сортировку происходит очистка "доски" и заново рендерятся точки, с учетом новой сортировки
  */
  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType; // Присваиваю текущей сортировке новое значение из клика
    this.#handleModelChange(UpdateType.MINOR);
  };

  /**
   * Функция для закрытия всех открытых форм редактирования - editPointView
   */
  #handleCloseAllForm = () => {
    if (this.#newPointPresenter) {
      this.#newPointPresenter.destroy();
    }
    this.#pointPresenters.forEach((presenter) => presenter.resetViewToDefault());
  };

  /**
   * Функция-обработчик, будет реагировать на изменение View
   * @param {*} actionType - Действие пользователя
   * @param {*} updateType - Тип обновления
   * @param {*} update - Обновленный объект точки маршрута
   * @description Когда пользователь изменяет интерфейс, создает/удаляет/меняет/фильтрует -
   * данная функция указывает, что необходимо сделать с моделью точек маршрута
   */
  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {

      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;

      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;

      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoints(updateType, update);
        break;
    }
  };

  /**
  * Функция-обработчик, будет реагировать на изменение модели
  * @param {string} updateType - Тип обновления
  * @param {object} data - Обновленный объект точки маршрута
  * @description При любом изменении модели будет вызвана эта функция, так как она добавлена в Observer.
  * Когда мы добавляем/удаляем/создаем новую точку маршрута мы вызываем функцию handleViewAction,
  * которая в свою очередь обновляет модель, а модель при обновлении вызывает метод _notify().
  * Этот метод проходит по всем функциям из Observer и вызывает их с аргументами
  */
  #handleModelChange = (updateType, data) => {
    switch (updateType) {

      case UpdateType.PATCH: // Обновить часть списка(одну точку маршрута)
        this.#pointPresenters.get(data.id).init(this.destinations, this.offers, data);
        break;

      case UpdateType.MINOR: // Обновить список (например, когда произошло удаление задачи или изменилась дата)
        this.#clearBoard();
        this.#renderPoints();
        break;

      case UpdateType.MAJOR: // Обновить всю "доску" (например, при переключении фильтров)
        this.#clearBoard();
        this.#renderPoints();
        break;
    }
  };

  /**
   * Функция очистки "доски" от созданных ранее точек и их презентеров
   */
  #clearBoard = () => {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  };
}
