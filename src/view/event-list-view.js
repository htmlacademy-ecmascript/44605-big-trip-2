import AbstractView from '../framework/view/abstract-view';

function createEventListComponent() {
  return `
  <ul class="trip-events__list"></ul>
  `;
}

/**
 * @description Класс для создания списка точек
 * @returns Тег списка ul для размещения точек маршрута li
 */
export default class TripPointListView extends AbstractView {
  get template() {
    return createEventListComponent();
  }
}
