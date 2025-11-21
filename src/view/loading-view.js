import AbstractView from '../framework/view/abstract-view';

function createLoadingComponent() {
  return `
  <div class="trip-events__loading">
    <span class="trip-events__spinner"></span>
    <span class="trip-events__loading-text">Loading...</span>
  </div>`;
}

export default class LoadingView extends AbstractView {
  get template() {
    return createLoadingComponent();
  }
}
