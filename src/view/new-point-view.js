import AbstractView from '../framework/view/abstract-view';

function createNewPoint(loaderFlag) {
  return `
  <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button" ${loaderFlag ? 'disabled' : ''}>New event</button>
  `;
}

/**
 * @class Класс для создания кнопки "New Event" в шапке сайта
 */
export default class NewPointView extends AbstractView {
  #handleNewPointButton = null;
  #isLoading = null;

  constructor({ isLoading, onNewPointButtonClick }) {
    super();
    this.#isLoading = isLoading;
    this.#handleNewPointButton = onNewPointButtonClick;
    this._restoreHandlers();
  }

  get template() {
    return createNewPoint(this.#isLoading);
  }

  _restoreHandlers() {
    this.element.addEventListener('click', this.#handleButtonClick);
  }

  #handleButtonClick = () => {
    this.#handleNewPointButton();
  };
}
