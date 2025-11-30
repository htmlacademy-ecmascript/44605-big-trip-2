import AbstractView from '../framework/view/abstract-view';
import { humanizeDate } from '../utils';
import { DATE_FORMAT } from '../const';


function createTemplate(points, destinations, offers) {

  const totalPrice = () => {
    let total = 0;

    points.forEach((point) => {
      total += point.basePrice;
      const offersOfTypePoints = offers.find((offer) => offer.type === point.type);
      const availableOffers = offersOfTypePoints ? offersOfTypePoints.offers : [];
      const selectedOffers = point.offers || [];
      const offerPrices = availableOffers.filter((offer) => selectedOffers.includes(offer.id));
      offerPrices.forEach((price) => {
        total += price.price;
      });
    });
    return total;
  };

  const firstItem = points[0];
  const lastItem = points[points.length - 1];
  const secondItem = points.length === 3 ? points[1] : null;

  const lastItemDate = humanizeDate(lastItem['dateTo'], DATE_FORMAT.dayMonth);
  const firstItemDate = humanizeDate(firstItem['dateFrom'], DATE_FORMAT.dayMonth);

  const firstItemDestinationName = (destinations.find((item) => item.id === firstItem.destination))['name'];
  const lastItemDestinationName = (destinations.find((item) => item.id === lastItem.destination))['name'];
  const secondItemDestinationName = secondItem ? (destinations.find((item) => item.id === secondItem.destination))['name'] : null;

  const destinationContent = () => {
    if (points.length > 3) {
      return `
      <h1 class="trip-info__title">${firstItemDestinationName} - ... - ${lastItemDestinationName}</h1>`;
    } else if (points.length < 3) {
      return `
      <h1 class="trip-info__title">${firstItemDestinationName} - ${lastItemDestinationName}</h1>`;
    } else if (points.length === 3) {
      return `
      <h1 class="trip-info__title">${firstItemDestinationName} - ${secondItemDestinationName} -  ${lastItemDestinationName}</h1>`;
    }
  };

  return `
  <section class="trip-main__trip-info  trip-info">
              <div class="trip-info__main">
                ${destinationContent()}
                <p class="trip-info__dates">${firstItemDate} - ${lastItemDate}</p>
              </div>
              <p class="trip-info__cost">
                Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice()}</span>
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
