import AbstractView from '../framework/view/abstract-view';

function createNewPoint() {
  return `
  <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
  `;
}

/**
 * @class Класс для создания кнопки "New Event" в шапке сайта
 */
export default class NewPointView extends AbstractView {
  #handleNewPointButton = null;

  constructor({ onAddButtonClick }) {
    super();
    this.#handleNewPointButton = onAddButtonClick;
    this._restoreHandlers();
  }

  get template() {
    return createNewPoint();
  }

  _restoreHandlers() {
    this.element.addEventListener('click', this.#handleButtonClick);
  }

  #handleButtonClick = () => {
    this.#handleNewPointButton();
  };
}
