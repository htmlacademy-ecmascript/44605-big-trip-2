import { DATE_FORMAT } from '../const.js';
import { createElement } from '../render.js';
import { humanizeDate } from '../utils.js';
import dayjs from 'dayjs';

function createPointTemplate(point, destinations, offers) {

  const { basePrice, type, dateFrom, dateTo, isFavorite } = point;

  // Находим destination
  const pointDestination = destinations.find((element) => element.id === point.destination);

  // Находим все предложения для типа точки
  const offersOfTypePoints = offers.find((element) => element.type === point.type);

  // Получаем массив предложений (offers) или пустой массив, если offersOfTypePoints не определен
  const availableOffers = offersOfTypePoints ? offersOfTypePoints.offers : [];

  // Получаем выбранные предложения для этой точки с учетом типа offers
  const selectedOffers = availableOffers.filter((offer) => point.offers ? point.offers.includes(offer.id) : false);

  const timeStart = humanizeDate(dateFrom, DATE_FORMAT.hoursMinutes);
  const timeEnd = humanizeDate(dateTo, DATE_FORMAT.hoursMinutes);
  const dateStart = dayjs(dateFrom);
  const dateEnd = dayjs(dateTo);
  const durationTime = dateEnd.diff(dateStart, 'm');

  // Записыванием в переменную название класса если в point есть пометка isFavorite
  const pointFavoritClassName = isFavorite ? 'event__favorite-btn--active' : '';

  const offersHtml = selectedOffers.length > 0 ? `
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${selectedOffers.map(offer => `
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
                <h3 class="event__title">${type} ${pointDestination.name}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="2019-03-18T10:30">${timeStart}</time>
                    &mdash;
                    <time class="event__end-time" datetime="2019-03-18T11:00">${timeEnd}</time >
                  </p >
    <p class="event__duration">${durationTime} M</p>
                </div >
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
                </p>
                ${offersHtml}
                <button class="event__favorite-btn ${pointFavoritClassName}" type="button">
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

export default class TripPointView {
  constructor(point, destinations, offers) {
    this.point = point;
    this.destinations = destinations;
    this.offers = offers;
  }

  getTemplate() {
    return createPointTemplate(this.point, this.destinations, this.offers);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
