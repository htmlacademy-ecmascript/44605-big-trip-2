import SortView from '../view/sort-view';
import NoContentView from '../view/no-content-view';
import PointListView from '../view/point-list-view';
import LoadingView from '../view/loading-view';
import TripInformationView from '../view/trip-information-view';

import PointPresenter from './point-presenter';
import NewPointPresenter from './new-point-presenter';
import UiBlocker from '../framework/ui-blocker/ui-blocker';

import { render, remove, replace, RenderPosition } from '../framework/render';
import { sortingByPrice, sortingByDay, sortingByTime, filterPoints } from '../utils';
import { SortType, UserAction, UpdateType, TimeLimit, FilterType } from '../const';

/**
 * @class Презентер списка точек маршрута и связанных UI-элементов (хедер, фильтры, сортировка).
 */
export default class BodyPresenter {
  #headerContainer = null;
  #bodyContainer = null; // Контейнер для общего презентера(получаем в main.js)
  #pointsModel = null; // Модель общая (инициализируем в main.js)
  #filterModel = null; // Модель фильтров

  #sortComponent = null; // Компонент сортировки(список)
  #loadingViewComponent = new LoadingView();
  #tripInfoComponent = null;
  #pointListContainer = null; // Компонент ul списка для размещения li(точек маршрута)
  #noContentView = null;
  #newPointPresenter = null;
  #pointPresenters = new Map(); // MAP для хранения созданных презентеров Point
  #currentSortType = SortType.DAY; // Переменная для хранения текущей сортировки( по умолчанию DAY )
  #currentFilter = null;
  #filteredPoints = null;
  #isLoading = true;
  #UiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  /**
   * @constructor
   * @param {Object} params
   * @param params.bodyContainer Контейнер для списка точек (область `.trip-events`)
   * @param params.pointsModel Модель с данными точек, направлений и офферов
   * @param params.filterModel Модель с фильтрами
   */
  constructor({ headerContainer, bodyContainer, pointsModel, filterModel }) {
    this.#headerContainer = headerContainer;
    this.#bodyContainer = bodyContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#filterModel.addObserver(this.#handleModelChange);
    this.#pointsModel.addObserver(this.#handleModelChange);
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
        this.#filteredPoints.sort(sortingByTime);
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

  createNewPoint() {
    this.#filterModel.setFilter(UpdateType.MINOR, FilterType.EVERYTHING);
    this.#currentSortType = SortType.DAY;
    if (this.#noContentView) {
      remove(this.#noContentView);
      this.#noContentView = null;
    }
    this.#renderSortComponent();
    if (!this.#pointListContainer) {
      this.#renderPointListContainer();
    }

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#pointListContainer.element,
      handleEditTypeChange: this.#handleCloseAllForm,
      handleDataChange: this.#handleViewAction,
    });

    this.#newPointPresenter.init(this.destinations, this.offers);
    this.#pointPresenters.forEach((presenter) => presenter.resetViewToDefault());
  }

  /**
   * Метод отрисовки компонента сортировки
   */
  #renderSortComponent() {
    const prevSortComponent = this.#sortComponent;

    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    if (prevSortComponent === null) {
      render(this.#sortComponent, this.#bodyContainer);
      return;
    }
    replace(this.#sortComponent, prevSortComponent);
    remove(prevSortComponent);
  }

  #renderPointListContainer() {
    this.#pointListContainer = new PointListView();
    render(this.#pointListContainer, this.#bodyContainer);
  }

  #renderTripInfo() {
    const prevTripInfoComponent = this.#tripInfoComponent;

    this.#tripInfoComponent = new TripInformationView({
      points: this.points,
      destinations: this.destinations,
      offers: this.offers
    });

    if (prevTripInfoComponent === null) {
      render(this.#tripInfoComponent, this.#headerContainer, RenderPosition.AFTERBEGIN);
      return;
    }
    replace(this.#tripInfoComponent, prevTripInfoComponent);
  }

  /**
   *  Метод отрисовки точек маршрута на страницу
   */
  #renderPoints() {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }
    if (this.#noContentView) {
      remove(this.#noContentView);
      this.#noContentView = null;
    }
    if (this.points.length !== 0) {
      this.#renderSortComponent();
      this.#renderTripInfo();
      this.#renderPointListContainer();
      for (let i = 0; i < this.points.length; i++) {
        this.#renderPoint(this.points[i]);
      }
    } else {
      this.#renderNoContent();
    }
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListContainer.element,
      handleEditTypeChange: this.#handleCloseAllForm,
      handleDataChange: this.#handleViewAction,
    });

    pointPresenter.init(this.destinations, this.offers, point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  /**
   * Метод отрисовки пустой страницы, если массив точек маршрута пуст
   */
  #renderNoContent(errorFlag) {
    if (this.#sortComponent) {
      remove(this.#sortComponent);
      this.#sortComponent = null;
    }
    if (this.#pointListContainer) {
      remove(this.#pointListContainer);
      this.#pointListContainer = null;
    }

    const prevEmptyPage = this.#noContentView;
    this.#noContentView = new NoContentView(this.#currentFilter, errorFlag);
    if (prevEmptyPage === null) {
      render(this.#noContentView, this.#bodyContainer);
      return;
    }
    replace(this.#noContentView, prevEmptyPage);
    remove(prevEmptyPage);
  }

  #renderLoading() {
    render(this.#loadingViewComponent, this.#bodyContainer);
  }

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
  #handleViewAction = async (actionType, updateType, update) => {
    this.#UiBlocker.block();
    switch (actionType) {
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
          this.#newPointPresenter.setSaved();
          this.#newPointPresenter = null;
        } catch (err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch (err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoints(updateType, update);
        } catch (err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }
    this.#UiBlocker.unblock();
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
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(this.destinations, this.offers, data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderPoints();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingViewComponent);
        if (data) {
          this.#renderNoContent(data);
          return;
        }
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
