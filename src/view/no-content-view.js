import AbstractView from '../framework/view/abstract-view';
import { MarkupElement } from '../const';

function createEmptyPointComponent(filter = MarkupElement.EVERYTHING, error) {
  if (error) {
    return MarkupElement['ERROR'];
  }
  return MarkupElement[filter.toUpperCase()];
}

/**
 * @class Класс для создания компонента пустой страницы
 */
export default class NoContentView extends AbstractView {
  #currentFilter = null;
  #error = null;

  constructor(currentFilter, errorFlag) {
    super();
    this.#currentFilter = currentFilter;
    this.#error = errorFlag;
  }

  get template() {
    return createEmptyPointComponent(this.#currentFilter, this.#error);
  }
}
