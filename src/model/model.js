import { getRandomPoints } from '../mock/points';
import { POINTS_COUNT } from '../const';

export default class PointsModel {
  points = Array.from({ length: POINTS_COUNT }, getRandomPoints);
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
