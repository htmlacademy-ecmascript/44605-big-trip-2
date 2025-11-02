import { DATE_FORMAT } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizeDate } from '../utils.js';
import dayjs from 'dayjs';

function createPointComponent(point, destinations, offers) {

  const { basePrice, type, dateFrom, dateTo, isFavorite } = point;

  // Находим destination
  const pointDestination = destinations.find((element) => element.id === point.destination);
  const destinationName = pointDestination ? pointDestination.name : '';

  // Находим все предложения для типа точки
  const offersOfTypePoints = offers.find((element) => element.type === point.type);

  // Получаем массив предложений (offers) или пустой массив, если offersOfTypePoints не определен
  const availableOffers = offersOfTypePoints ? offersOfTypePoints.offers : [];

  // Получаем выбранные предложения для этой точки с учетом типа offers
  const selectedOffers = availableOffers.filter((offer) => point.offers ? point.offers.includes(offer.id) : false);

  const timeStart = humanizeDate(dateFrom, DATE_FORMAT.hoursMinutes); // Получаю время начала в формате 11:55
  const timeEnd = humanizeDate(dateTo, DATE_FORMAT.hoursMinutes); // Получаю время окончания в формате 11:55

  // Преобразую в формат dayjs
  const dateStart = dayjs(dateFrom);
  const dateEnd = dayjs(dateTo);

  // Вычисляю разницу в дате и времени от начала и конца. Результат получаю в минутах
  const durationTime = dateEnd.diff(dateStart, 'm');

  // Нужно доработать функцию, учитывать секунды.
  function formatDuration(minutes) {
    const days = Math.floor(minutes / (24 * 60));
    const hours = Math.floor(minutes % (24 * 60) / 60);
    const mins = minutes % 60;

    if (days > 0) {
      return `${days.toString().padStart(2, '0')}D ${hours.toString().padStart(2, '0')}H ${mins.toString().padStart(2, '0')}M`;
    } else if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}H ${mins.toString().padStart(2, '0')}M`;
    } else {
      return `${mins.toString().padStart(2, '0')}M`;
    }
  }

  // Записыванием в переменную название класса если в point есть пометка isFavorite
  const pointFavoriteClassName = isFavorite ? 'event__favorite-btn--active' : '';

  // Формирую кусок разметки
  // Если есть выбранные предложения для точки, то я рисую их, итерируясь по каждой точке с помощью map
  const offersHtml = selectedOffers.length > 0 ? `
      <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${selectedOffers.map((offer) => `
        <li class="event__offer">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </li>
      `).join('')}
        </ul>
    ` : '';

  return `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dateFrom}">${humanizeDate(dateFrom, DATE_FORMAT.dayMonth)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destinationName}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateFrom}">${timeStart}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateTo}">${timeEnd}</time >
          </p >
          <p class="event__duration">${formatDuration(durationTime)}</p>
        </div >
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        ${offersHtml}
        <button class="event__favorite-btn ${pointFavoriteClassName}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div >
            </li > `;
}
/**
 * Класс для создания экземляра точки маршрута
 */
export default class TripPointView extends AbstractStatefulView {
  #point;
  #destinations;
  #offers;
  #handleEditClick;
  #handleFavoriteClick;

  /**
   * @constructor
   * @param {Object} point - Данные точки маршрута
   * @param {Array} destinations - Массив направлений
   * @param {Array} offers - Массив предложений
   * @param {Function} onEditClick - Функция обработчик клика для открытия формы редактирования
   */
  constructor(point, destinations, offers, onEditClick, onFavoriteClick) {
    super();
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#handleEditClick);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#handleFavoriteClick);
  }

  get template() {
    return createPointComponent(this.#point, this.#destinations, this.#offers);
  }

  _restoreHandlers() {

  }
}
