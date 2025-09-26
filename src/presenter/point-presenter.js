import TripPointView from '../view/point-view';
import TripPointEditView from '../view/edit-point-view';
import { render, replace } from '../framework/render';

export default class PointPresenter {
  #pointListContainer;
  #point;
  #destinations;
  #offers;
  #pointComponent;
  #pointEditComponent;

  constructor({ pointListContainer, point, destinations, offers }) {
    this.#pointListContainer = pointListContainer;
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  init() {
    const replaceCardToForm = () => {
      replace(this.#pointEditComponent, this.#pointComponent);
    };

    const replaceFormToCard = () => {
      replace(this.#pointComponent, this.#pointEditComponent);
    };

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    this.#pointComponent = new TripPointView(
      this.#point, this.#destinations, this.#offers,
      () => {
        replaceCardToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    );

    this.#pointEditComponent = new TripPointEditView(
      this.#point, this.#destinations, this.#offers,
      () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    );

    render(this.#pointComponent, this.#pointListContainer);
  }
}
