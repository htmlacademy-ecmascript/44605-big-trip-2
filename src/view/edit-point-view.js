import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { DATE_FORMAT } from '../const';
import { humanizeDate } from '../utils';

function createEventPointEditTemplate(point, destinations, offers) {

  const { dateFrom, dateTo, basePrice } = point;

  // Находим destination
  const pointDestination = destinations.find((element) => element.id === point.destination);

  // Находим все предложения для типа точки
  const offersOfTypePoints = offers.find((element) => element.type === point.type);

  // Получаем массив предложений (offers) или пустой массив, если offersOfTypePoints не определен
  const availableOffers = offersOfTypePoints ? offersOfTypePoints.offers : [];

  // Получаем выбранные предложения для этой точки с учетом типа offers
  // const selectedOffers = availableOffers.filter((offer) => point.offers ? point.offers.includes(offer.id) : false);
  const selectedOffers = point.offers || [];

  const dateStart = humanizeDate(dateFrom, DATE_FORMAT.fullDate);
  const dateEnd = humanizeDate(dateTo, DATE_FORMAT.fullDate);

  const offersHtml = availableOffers.length > 0 ? `
                   <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                    <div class="event__available-offers">
                      ${availableOffers.map((offer) => `
                        <div class="event__offer-selector">
                          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}" type="checkbox" name="event-offer-${offer.id}"
                          ${selectedOffers.includes(offer.id) ? 'checked' : ''}>
                          <label class="event__offer-label" for="event-offer-${offer.id}">
                            <span class="event__offer-title">${offer.title}</span>
                            &plus;&euro;&nbsp;
                            <span class="event__offer-price">${offer.price}</span>
                          </label>
                        </div>`).join('')}
                    </div>` : '';

  const destinationHtml = pointDestination.description ? `
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${pointDestination.description}</p>` : '';

  return `<form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>

                        <div class="event__type-item">
                          <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${point.type === 'taxi' ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${point.type === 'bus' ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${point.type === 'train' ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${point.type === 'ship' ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${point.type === 'drive' ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${point.type === 'flight' ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${point.type === 'check-in' ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" ${point.type === 'sightseeing' ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" ${point.type === 'restaurant' ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                        </div>
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${point.type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${pointDestination.name}" list="destination-list-1">
                    <datalist id="destination-list-1">
                    ${destinations.map((destination) => `
                       <option value='${destination.name}'></option>`)}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateStart}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateEnd}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                   ${offersHtml}
                  </section>

                  <section class="event__section  event__section--destination">
                    ${destinationHtml}
                  </section>
                </section>
              </form>`;
}

export default class TripPointEditView extends AbstractStatefulView {
  #destinations = null;
  #offers = null;
  #handleFormSubmit = null;


  constructor(point, destinations, offers, onFormSubmit) {
    super();
    this._setState(TripPointEditView.parsePointToState(point)); // Обновляю состояние _state с помощью спред-оператора разворачиваю объект Point
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleFormSubmit = onFormSubmit;

    this._restoreHandlers();
  }

  get template() {
    return createEventPointEditTemplate(this._state, this.#destinations, this.#offers);
  }

  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#handleFormSubmit); // Обработчик стрелки закрытия формы редактирования
    this.element.querySelector('.event__type-list').addEventListener('click', this.#handleToggleSubmit); // Обработчик выбора типа поездки
    this.element.querySelector('.event__available-offers')?.addEventListener('click', this.#handleMarkedOffers); // Обработчик выбора офферов(нужно сохранять их в State)
    this.element.querySelector('.event__save-btn').addEventListener('click', this.#handleSaveButtonSubmit); // Обработчик кнопки сохранения
    this.element.querySelector('.event__input--destination').addEventListener('input', this.#handleDestinationsChange); // Обработчик пункта назначения
  }

  #handleDestinationsChange = (evt) => {
    const destinationInput = this.#destinations.find((element) => element.name === evt.target.value);
    if (destinationInput) {
      this.updateElement({ destination: `${destinationInput.id}` });
    }
    // console.log(this._state);
  };

  #handleSaveButtonSubmit = (evt) => {
    evt.preventDefault();
    console.log('Save');
    this._setState(TripPointEditView.parseStateToPoint(this._state));
  };

  // Незаконченный метод, нужно описать логику выбора offers и обновления _state
  #handleMarkedOffers = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    const labelElement = document.querySelector(`label[for=${evt.target.id}]`);
    console.log(labelElement);

  };

  #handleToggleSubmit = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    this.updateElement({ type: evt.target.value });
    // console.log(this._state);
  };

  static parsePointToState(point) {
    return { ...point };
  }

  static parseStateToPoint(state) {
    return { ...state };
  }
}
