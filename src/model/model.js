import { getRandomPoints } from '../mock/points';
import { mockDestination } from '../mock/destinations';
import { mockOffers } from '../mock/offers';
import { POINTS_COUNT } from '../const';

/**
 * Класс для работы с точками маршрута
 * @returns {Object} - Объект с массивами точек, пунктов назначения и доп.предложений
 * @property {Array} points - Массив точек
 * @property {Array} destinations - Массив пунктов назначения
 * @property {Array} offers - Массив доп.предложений
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

  /**
   * Метод для получения массива точек
   * @returns {Array} - Массив точек
   */
  get points() {
    return this.#points;
  }

  /**
   * Метод для получения массива пунктов назначения
   * @returns {Array} - Массив пунктов назначения
   */
  get destinations() {
    return this.#destinations;
  }

  /**
   * Метод для получения массива доп.предложений
   * @returns {Array} - Массив доп.предложений
   */
  get offers() {
    return this.#offers;
  }
}
