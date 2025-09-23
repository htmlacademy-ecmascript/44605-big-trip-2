import AbstractView from '../framework/view/abstract-view';

function createEmptyPointComponent() {
  const murkupElement = {
    Everthing: `
    <p class="trip-events__msg">Click New Event to create your first point</p>`,
    Past: `
    There are no past events now`,
    Present: `
    There are no present events now`,
    Future: `
    There are no future events now`,
  };

  return murkupElement.Everthing;
}

export default class TripPointView extends AbstractView {
  get template() {
    return createEmptyPointComponent();
  }
}
