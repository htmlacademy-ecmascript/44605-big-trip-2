import SortView from '../view/sort-view';
import NoContentView from '../view/no-content-view';
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
  #bodyContainer = null; // Контейнер для общего презентера(получаем в main.js)
  #pointsModel = null; // Модель общая (инициализируем в main.js)
  #filterModel = null; // Модель фильтров
  #handleViewAction = null;
  #handleModelChange = null;

  #SortComponent = null; // Компонент сортировки(список)
  #pointListContainer = null; // Компонент ul списка для размещения li(точек маршрута)
  #NoContentView = null;
  #newPointPresenter = null;
  #pointPresenters = new Map(); // MAP для хранения созданных презентеров Point
  #currentSortType = SortType.DAY; // Переменная для хранения текущей сортировки( по умолчанию DAY )
  #currentFilter = null;
  #currentDate = new Date();
  #filteredPoints = null;

  /**
   * @constructor
   * @param {Object} params
   * @param params.bodyContainer Контейнер для списка точек (область `.trip-events`)
   * @param params.pointsModel Модель с данными точек, направлений и офферов
   * @param params.filterModel Модель с фильтрами
   * @param params.handleViewAction Функция-обработчик, будет реагировать на изменение View
   * @param params.handleModelChange Функция-обработчик, будет реагировать на изменение модели
   */
  constructor({ bodyContainer, pointsModel, filterModel, handleViewAction, handleModelChange }) {
    this.#bodyContainer = bodyContainer;
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
    const prevSortComponent = this.#SortComponent;

    this.#SortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    if (prevSortComponent === null) {
      render(this.#SortComponent, this.#bodyContainer);
      return;
    }
    replace(this.#SortComponent, prevSortComponent);
    remove(prevSortComponent);
  }

  /**
   *  Метод отрисовки точек маршрута на страницу
   */
  #renderPoints() {
    this.#renderSortComponent();
    for (let i = 0; i < this.points.length; i++) {
      this.#renderPoint();
    }
    // if (this.points.length !== 0) {
    //   if (this.#noPointView !== null) {
    //     remove(this.#noPointView);
    //     this.#noPointView = null;
    //   }
    //   this.#renderSortComponent();

    //   if (this.#tripListComponent === null) {
    //     this.#tripListComponent = new PointListView();
    //     render(this.#tripListComponent, this.#bodyContainer);
    //   }
    //   for (let i = 0; i < this.points.length; i++) {
    //     const pointPresenter = new PointPresenter({
    //       pointListContainer: this.#tripListComponent.element,
    //       handleEditTypeChange: this.#handleCloseAllForm,
    //       handleDataChange: this.#handleViewAction,
    //     });

    //     pointPresenter.init(this.destinations, this.offers, this.points[i]);
    //     this.#pointPresenters.set(this.points[i].id, pointPresenter); // Добавляем презентер в Map
    //   }
    // } else {
    //   this.#renderEmptyPage();
    // }
  }


  #renderPoint() {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListContainer,
      handleEditTypeChange: ,
      handleDataChange
    })
  }

  #renderPointListContainer() {
    this.#pointListContainer = new PointListView();
  }

  /**
   * Метод отрисовки пустой страницы, если массив точек маршрута пуст
   */
  #renderEmptyPage() {
    if (this.#SortComponent !== null) {
      remove(this.#SortComponent);
      this.#SortComponent = null;
    }
    if (this.#tripListComponent !== null) {
      remove(this.#tripListComponent);
      this.#tripListComponent = null;
    }

    const prevEmptyPage = this.#noPointView;
    this.#noPointView = new NoPointView(this.#currentFilter);
    if (prevEmptyPage === null) {
      render(this.#noPointView, this.#bodyContainer);
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
      render(this.#tripListComponent, this.#bodyContainer);
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
   * Функция очистки "доски" от созданных ранее точек и их презентеров
   */
  #clearBoard = () => {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  };
}
