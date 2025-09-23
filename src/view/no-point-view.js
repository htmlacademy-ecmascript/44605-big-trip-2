import AbstractView from '../framework/view/abstract-view';

function createEmptyPointComponent() {
  const Everthing = `<p class="trip-events__msg">Click New Event to create your first point</p>`;
  const Past = `There are no past events now`;
  const Present = `There are no present events now`;
  const Future = `There are no future events now`;

  return Everthing;
}

export default class TripPointView extends AbstractView {
  get template() {
    return createEmptyPointComponent();
  }
}
