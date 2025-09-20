import { getRandomPoints } from '../mock/points';
import { mockDestination } from '../mock/destinations';
import { mockOffers } from '../mock/offers';
import { POINTS_COUNT } from '../const';

export default class PointsModel {
  constructor() {
    this.points = Array.from({ length: POINTS_COUNT }, getRandomPoints);
    this.destinations = mockDestination;
    this.offers = mockOffers;
  }

  getPoints() {
    return this.points;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }
}
