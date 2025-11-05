import TripSort from '../view/sort-view';
import NoPointView from '../view/no-point-view';
import PointPresenter from './point-presenter';
import TripPointListView from '../view/event-list-view';
import { render, remove } from '../framework/render';
import { SortType, UserAction, UpdateType } from '../const';
import { sortingByPrice, sortingByDay, sortingByTime } from '../utils';
import HeaderPresenter from './header-presenter';

/**
 * @class Презентер списка точек маршрута и связанных UI-элементов (хедер, фильтры, сортировка).
 */
export default class BodyPresenter {
  #tripContainer = null; // Контейнер для общего презентера(получаем в main.js)
  #pointsModel = null; // Модель общая (инициализируем в main.js)

  #tripSortComponent = null; // Компонент сортировки(список)
  #tripListComponent = null; // Компонент ul списка для размещения li(точек маршрута)
  #pointPresenters = new Map(); // MAP для хранения созданных презентеров Point
  #currentSortType = SortType.DAY; // Переменная для хранения текущей сортировки( по умолчанию DAY )

  /**
   * @constructor
   * @param  tripContainer Контейнер для списка точек (область `.trip-events`)
   * @param  pointsModel Модель с данными точек, направлений и офферов
   */
  constructor(tripContainer, pointsModel) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModeChange); // Подписываемся на событие изменения модели
  }

  /**
   *  Геттер презентера для получения массива точек с учетом сортировки
   */
  get points() {
    switch (this.#currentSortType) {
      case SortType.DAY:
        return this.#pointsModel.points.sort(sortingByDay);
      case SortType.TIME:
        return this.#pointsModel.points.sort(sortingByTime); // Эта сортировка работает некорректно
      case SortType.PRICE:
        return this.#pointsModel.points.sort(sortingByPrice);
    }
    return this.#pointsModel.points;
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
    this.#renderHeader();
    this.#renderSortComponent();
    this.#renderPoints();
  }

  /**
   * Метод отрисовки "шапки" сайта
   */
  #renderHeader() {
    const headerPresenter = new HeaderPresenter({
      onFilterClick: () => console.log('filterClick'),
      onNewPointClick: () => console.log('newButtonClick')
    });
    headerPresenter.init();
  }

  /**
   *  Метод отрисовки пустой страницы, если массив точек маршрута пуст
   */
  #renderEmptyPage() {
    if (this.#tripSortComponent !== null) {
      remove(this.#tripSortComponent);
    }

    render(new NoPointView(), this.#tripContainer);
    // В дополнении делаем недоступными для клика все кнопки фильтрации
    const filterInputs = document.querySelectorAll('.trip-filters__filter-input');
    filterInputs.forEach((input) => {
      input.disabled = true;
    });
  }

  /**
   *  Метод отрисовки компонента сортировки
   * @param onSortTypeChange - Функция обработчик изменения типа сортировки
   */
  #renderSortComponent() {
    // Инициализирую компонент сортировки(Передаю в конструктор функцию-обработчик клика)
    this.#tripSortComponent = new TripSort({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#tripSortComponent, this.#tripContainer);
  }

  /**
   *  Метод отрисовки точек маршрута на страницу
   */
  #renderPoints() {
    if (this.points.length !== 0) {
      if (this.#tripListComponent === null) {
        this.#tripListComponent = new TripPointListView();
        render(this.#tripListComponent, this.#tripContainer);
      }
      for (let i = 0; i < this.points.length; i++) {
        const pointPresenter = new PointPresenter({
          pointListContainer: this.#tripListComponent.element,
          handleEditTypeChange: this.#handleCloseAllForm,
          handleDataChange: this.#handleViewAction,
        });

        pointPresenter.init(this.points[i], this.destinations, this.offers);
        this.#pointPresenters.set(this.points[i].id, pointPresenter); // Добавляем презентер в Map
      }
    } else {
      this.#renderEmptyPage();
    }
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
    this.#clearBoard();
    this.#renderPoints();
  };

  /**
   * Функция для закрытия всех открытых форм редактирования - editPointView
   */
  #handleCloseAllForm = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetViewToDefault());
  };

  /**
   * Функция очистки "доски" от созданных ранее точек и их презентеров
   */
  #clearBoard = () => {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  };

  /**
   * Функция-обработчик, будет реагировать на действия пользователя
   * @param {*} actionType - Действие пользователя
   * @param {*} updateType - Тип обновления
   * @param {*} update - Обновленный объект точки маршрута
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
  */
  #handleModeChange = (updateType, data) => {
    switch (updateType) {

      case UpdateType.PATCH: // Обновить часть списка(одну точку маршрута)
        this.#pointPresenters.get(data.id).init(data, this.destinations, this.offers);
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
}
