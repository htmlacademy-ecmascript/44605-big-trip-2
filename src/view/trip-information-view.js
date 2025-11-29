import AbstractView from '../framework/view/abstract-view';
import { humanizeDate } from '../utils';
import { DATE_FORMAT } from '../const';


function createTemplate(points, destinations, offers) {
  const firstItem = points[0];
  const firstItemDate = humanizeDate(firstItem['dateFrom'], DATE_FORMAT.dayMonth);
  return `
  <section class="trip-main__trip-info  trip-info">
              <div class="trip-info__main">
                <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

                <p class="trip-info__dates">${firstItemDate}</p>
              </div>

              <p class="trip-info__cost">
                Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
              </p>
            </section>`;
}

export default class TripInformationView extends AbstractView {
  #points = null;
  #destinations = null;
  #offers = null;

  constructor({ points, destinations, offers }) {
    super();
    this.#points = points;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() {
    return createTemplate(this.#points, this.#destinations, this.#offers);
  }
}
