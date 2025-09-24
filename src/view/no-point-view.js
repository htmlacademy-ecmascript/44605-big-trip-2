import AbstractView from '../framework/view/abstract-view';
import { MurkupElement } from '../const';

function createEmptyPointComponent() {
  return MurkupElement.Everthing;
}

export default class NoPointView extends AbstractView {
  get template() {
    return createEmptyPointComponent();
  }
}
