import { getRandomPoints } from '../mock/points';
import { mockDestination } from '../mock/destinations';
import { mockOffers } from '../mock/offers';
import { POINTS_COUNT } from '../const';

/**
 * Класс для генерации точек маршрута
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
