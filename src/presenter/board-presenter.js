import TripSort from '../view/sort-view';
import TripFilter from '../view/trip-filter-view';
import HeaderTripInfoBlock from '../view/header-info-trip';
import TripPointView from '../view/point-view';
import TripPointListView from '../view/event-list-view';
import TripPointEditView from '../view/edit-point-view';
import { render, RenderPosition } from '../render';

export default class TripPresenter {

  constructor({ tripContainer, pointsModel }) {
    this.tripContainer = tripContainer;
    this.pointsModel = pointsModel;
    this.tripListComponent = new TripPointListView();
  }

  init() {
    const destinations = this.pointsModel.getDestinations();
    const points = this.pointsModel.getPoints();
    const offers = this.pointsModel.getOffers();

    const tripControlsFiltersContainer = document.querySelector('.trip-controls__filters');
    const tripMainContainer = document.querySelector('.trip-main');

    render(new HeaderTripInfoBlock(), tripMainContainer, RenderPosition.AFTERBEGIN);
    render(new TripFilter(), tripControlsFiltersContainer);
    render(new TripSort(), this.tripContainer); // Отрисовал сортировку
    render(this.tripListComponent, this.tripContainer); // Создал <ul>
    render(new TripPointEditView(points[0], destinations, offers), this.tripListComponent.getElement()); // Создал форму редактирования точки маршрута
    for (let i = 1; i < points.length; i++) {
      render(new TripPointView(points[i], destinations, offers), this.tripListComponent.getElement()); // Создал точки маршрута
    }
  }
}
