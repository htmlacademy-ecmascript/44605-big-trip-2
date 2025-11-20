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

    // this.#filterModel.addObserver(this.#handleModelChange);
    // this.#pointsModel.addObserver(this.#handleModelChange);

    // Тут необходимо подписать модель на функцию обновления страницы
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
        handleViewAction: this.#handleViewAction,
        handleModelChange: this.#handleModelChange
      });

    this.#bodyPresenter.init();
  }

  // Скорее всего уберу этот метод, будет работать только основной
  #handleFilterChange = () => {
    console.log('Сработала смена фильтра');
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
}
