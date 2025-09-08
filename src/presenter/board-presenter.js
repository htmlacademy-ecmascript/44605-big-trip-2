import TripSort from '../view/sort-view';
import EventList from '../view/event-list-view';
import EventPoint from '../view/point-view';
import EventPointEdit from '../view/edit-point-view';
import NewPoint from '../view/add-new-point-view';
import { render } from '../render';

export default class BoardPresenter {
  // Сохраняю в переменную создание класса. Переменная имеет методы класса
  EventListComponent = new EventList();
  EventPointComponent = new EventPoint();
  EventEditComponent = new EventPointEdit();
  EventPointEditComponent = new EventPointEdit();

  constructor({ boardContainer }) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(new TripSort(), this.boardContainer); // Отрисовал сортировку
    render(new NewPoint(), this.boardContainer);
    render(this.EventListComponent, this.boardContainer); // Создал <ul>
    render(this.EventEditComponent, this.EventListComponent.getElement()); // Создал форму редактирования точки маршрута
    for (let i = 0; i < 3; i++) {
      render(new EventPoint(), this.EventListComponent.getElement()); // Создал точки маршрута
    }
  }
}
