import Observable from '../framework/Observable';
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

  get points() {
    return this.#points;
  }

  set points(points) {
    this.#points = [...points];
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  updatePoint(updateType, update) {
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

  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points
    ];

    this._notify(updateType, update);
  }

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
