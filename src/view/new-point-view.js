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
  constructor() {
    super();
    this._restoreHandlers();
  }

  get template() {
    return createNewPoint();
  }

  _restoreHandlers() {
    this.element.querySelector('.trip-main__event-add-btn')?.addEventListener('click', this.#handleButtonClick);
  }

  #handleButtonClick = () => {
    console.log('Add button click');
  };
}
