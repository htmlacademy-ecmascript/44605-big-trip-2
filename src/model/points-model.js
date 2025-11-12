import Observable from '../framework/observable';
import { getRandomPoints } from '../mock/points';
import { mockDestination } from '../mock/destinations';
import { mockOffers } from '../mock/offers';
import { POINTS_COUNT } from '../const';

/**
 * @class Модель для инициализации точек маршрута
 * @returns Объект с методами получения массива точек, направлений и офферов
 */
export default class PointsModel extends Observable {
  #points;
  #destinations;
  #offers;

  constructor() {
    super();
    this.#points = Array.from({ length: POINTS_COUNT }, getRandomPoints);
    this.#destinations = mockDestination;
    this.#offers = mockOffers;
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

  /**
   * Метод обновления новой точки маршрута
   * @param {*} updateType - Тип обновления
   * @param {*} update - Обновленный объект точки маршрута
   */
  updatePoints(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can`t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  /**
   * Метод добавления новой точки маршрута
   * @param {*} updateType - Тип обновления
   * @param {*} update - Новый объект точки маршрута
   */
  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points
    ];

    this._notify(updateType, update);
  }

  /**
  * Метод удаления новой точки маршрута
  * @param {*} updateType - Тип обновления
  * @param {*} update - Новый объект точки маршрута
  */
  deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can`t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1)
    ];

    this._notify(updateType);
  }
}
