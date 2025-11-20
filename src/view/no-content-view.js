import AbstractView from '../framework/view/abstract-view';
import { MarkupElement } from '../const';

function createEmptyPointComponent(filter) {
  return MarkupElement[filter];
}

/**
 * @class Класс для создания компонента пустой страницы
 */
export default class NoContentView extends AbstractView {
  #currentFilter = null;

  constructor(currentFilter) {
    super();
    this.#currentFilter = currentFilter;
  }

  get template() {
    return createEmptyPointComponent(this.#currentFilter);
  }
}
