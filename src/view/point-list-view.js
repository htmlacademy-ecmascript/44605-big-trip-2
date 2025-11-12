import AbstractView from '../framework/view/abstract-view';

function createEventListComponent() {
  return `
  <ul class="trip-events__list"></ul>
  `;
}

/**
 * @class Класс для создания элемента списка
 * @returns Тег списка ul для размещения точек маршрута li
 */
export default class PointListView extends AbstractView {
  get template() {
    return createEventListComponent();
  }
}
