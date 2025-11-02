import TripSort from '../view/sort-view';
import TripFilter from '../view/trip-filter-view';
import HeaderTripInfoBlock from '../view/header-info-trip';
import TripPointListView from '../view/event-list-view';
import NoPointView from '../view/no-point-view';
import PointPresenter from './point-presenter';
import { render, RenderPosition } from '../framework/render';
import { SortType } from '../const';
import { sortingByPrice, sortingByDay, sortingByTime } from '../utils';

/**
 * @class Презентер списка точек маршрута и связанных UI-элементов (хедер, фильтры, сортировка).
 */
export default class TripPresenter {
  #tripContainer = null; // Контейнер для общего презентера(получаем в main.js)
  #pointsModel = null; // Модель общая (инициализируем в main.js)

  #tripMainContainer = null; // Контейнер Header для фильтров, карты маршрута, стоимости
  #tripFiltersContainer = null; // Контейнер для списка Filter
  #tripSortComponent = null; // Компонент сортировки(список)
  #tripListComponent = null; // Компонент ul списка для размещения li(точек маршрута)
  #tripFilterComponent = null; // Компонент Filter, размещаем в this.#tripFiltersContainer
  #pointPresenters = null; // MAP для хранения созданных презентеров Point
  #currentSortType = null; // Переменная для хранения текущей сортировки( по умолчанию DAY )

  /**
   * @constructor
   * @param {HTMLElement} tripContainer Контейнер для списка точек (область `.trip-events`)
   * @param {Object} pointsModel Модель с данными точек, направлений и офферов
   */
  constructor(tripContainer, pointsModel) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#pointPresenters = new Map();
    this.#currentSortType = SortType.DAY;

    this.#pointsModel.addObserver(this.#handleModeEvent); // Добавляю функцию, которая будет вызвана при наступлении события. Какого?
  }

  /**
   * @description Геттер презентера для получения массива точек с учетом сортировки
   */
  get points() {
    switch (this.#currentSortType) {
      case SortType.TIME:
        return this.#pointsModel.points.sort(sortingByTime); // Эта сортировка работает некорректно
      case SortType.PRICE:
        return this.#pointsModel.points.sort(sortingByPrice);
    }
    return this.#pointsModel.points.sort(sortingByDay);
  }

  /**
  * @description Геттер презентера для получения массива пунктов назначения
  */
  get destinations() {
    return this.#pointsModel.destinations;
  }

  /**
  * @description Геттер презентера для получения массива доп.предложений
  */
  get offers() {
    return this.#pointsModel.offers;
  }

  init() {
    this.#renderHeader();
    this.#renderEmptyPage();
    if (this.points.length > 0) {
      this.#renderSortComponent();
      this.#renderPoints();
    }
  }

  // Функция, которая должна сработать при изменении данных точки
  #handleModeEvent = (updateType, data) => {
    console.log(updateType, data);
  };

  #renderHeader() {
    this.#tripMainContainer = document.querySelector('.trip-main');
    render(new HeaderTripInfoBlock(), this.#tripMainContainer, RenderPosition.AFTERBEGIN);
    this.#renderFilterComponent();
  }

  #renderFilterComponent() {
    this.#tripFiltersContainer = document.querySelector('.trip-controls__filters');
    this.#tripFilterComponent = new TripFilter();
    render(this.#tripFilterComponent, this.#tripFiltersContainer);
  }

  #renderEmptyPage() {
    // Если точек нет — показываем заглушку
    if (this.points.length === 0) {
      render(new NoPointView(), this.#tripContainer); // 2.1
      // 2.2 В дополнении делаем недоступными для клика все кнопки фильтрации
      const filterInputs = document.querySelectorAll('.trip-filters__filter-input');
      filterInputs.forEach((input) => {
        input.disabled = true;
      });
    }
  }

  #renderSortComponent() {
    // Инициализирую компонент сортировки(Передаю в конструктор функцию-обработчик клика)
    this.#tripSortComponent = new TripSort({
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#tripSortComponent, this.#tripContainer);
  }

  // Функция обработчик клика сортировки
  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType; // Присваиваю текущей сортировке новое значение из клика
    this.#pointPresenters.forEach((presenter) => presenter.destroy()); // У каждого презентера вызываю метод удаления компонентов
    this.#renderPoints(); // Рендерим точки после сортировки
  };

  #renderPoints() {
    this.#tripListComponent = new TripPointListView();
    render(this.#tripListComponent, this.#tripContainer);

    for (let i = 0; i < this.points.length; i++) {
      const pointPresenter = new PointPresenter({
        pointListContainer: this.#tripListComponent.element,
        point: this.points[i],
        destinations: this.destinations,
        offers: this.offers,
        closeForms: this.#closeAllForms,
      });

      pointPresenter.init(); // После инициализации вызываем главный метод, который отрисовывает Point
      this.#pointPresenters.set(this.points[i].id, pointPresenter); // Добавляем презентер в Map
    }
  }

  // Callback функция. Отправляем в презентер; При открытии формы редактирования закрываем все открытые формы редактирования
  #closeAllForms = () => {
    this.#pointPresenters.forEach((presenter) => presenter.closeForm());
  };
}

