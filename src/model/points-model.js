import Observable from '../framework/observable';
import { UpdateType } from '../const';

/**
 * @class Модель для инициализации точек маршрута
 * @returns Объект с методами получения массива точек, направлений и офферов
 */
export default class PointsModel extends Observable {
  #points = [];
  #destinations = [];
  #offers = [];
  #pointApiService = null;

  constructor({ pointApiService }) {
    super();
    this.#pointApiService = pointApiService;
  }

  /**
   * @description Геттер модели получения массива точек маршрута
   */
  get points() {
    return this.#points;
  }

  /**
  * @description Сеттер модели получения массива точек маршрута
  */
  set points(points) {
    this.#points = [...points];
  }

  /**
   * @description Геттер модели получения массива пунктов назначения
   */
  get destinations() {
    return this.#destinations;
  }

  /**
   * @description Геттер модели получения массива доп.предложений
   */
  get offers() {
    return this.#offers;
  }

  async init() {
    try {
      const point = await this.#pointApiService.points;
      this.#points = point.map(this.#adaptToClient);
      this.#offers = await this.#pointApiService.offers;
      this.#destinations = await this.#pointApiService.destinations;
    } catch (err) {
      this.#points = [];
    }

    this._notify(UpdateType.INIT);
  }

  /**
   * Метод обновления новой точки маршрута
   * @param {*} updateType - Тип обновления
   * @param {*} update - Обновленный объект точки маршрута
   */
  async updatePoints(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\t update unexisting point');
    }
    try {
      const response = await this.#pointApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1)
      ];

      this._notify(updateType, updatedPoint);
    } catch (err) {
      throw new Error('Can\t update point');
    }
  }

  /**
   * Метод добавления новой точки маршрута
   * @param {*} updateType - Тип обновления
   * @param {*} update - Новый объект точки маршрута
   */
  async addPoint(updateType, update) {
    try {
      const response = await this.#pointApiService.addPoint(update);
      const newPoint = this.#adaptToClient(response);
      this.#points = [newPoint, ...this.#points];
      this._notify(updateType, newPoint);
    } catch (err) {
      throw new Error('Can\t add new point');
    }
  }

  /**
  * Метод удаления новой точки маршрута
  * @param {*} updateType - Тип обновления
  * @param {*} update - Новый объект точки маршрута
  */
  async deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can`t update unexisting point');
    }
    try {
      await this.#pointApiService.deletePoint(update);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1)
      ];
      this._notify(updateType);
    } catch (err) {
      throw new Error('Can\t delete point');
    }
  }

  #adaptToClient(point) {
    const adaptedPoint = {
      ...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
      dateTo: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'],
      isFavorite: point['is_favorite']
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }
}
