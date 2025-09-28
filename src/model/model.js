import { getRandomPoints } from '../mock/points';
import { mockDestination } from '../mock/destinations';
import { mockOffers } from '../mock/offers';
import { POINTS_COUNT } from '../const';

/**
 * @class Модель для инициализации точек маршрута
 * @returns Объект с методами получения массива точек, направлений и офферов
 */
export default class PointsModel {
  #points;
  #destinations;
  #offers;

  constructor() {
    this.#points = Array.from({ length: POINTS_COUNT }, getRandomPoints);
    this.#destinations = mockDestination;
    this.#offers = mockOffers;
  }

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }
}
