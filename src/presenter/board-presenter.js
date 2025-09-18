import TripSort from '../view/sort-view';
import TripPoint from '../view/point-view';
import TripList from '../view/event-list-view';
import TripPointEdit from '../view/edit-point-view';
// import NewTripPoint from '../view/add-new-point-view';
import { render } from '../render';

export default class BoardPresenter {
  // Сохраняю в переменную создание класса. Переменная имеет методы класса
  TripListComponent = new TripList();

  constructor({ boardContainer, pointsModel }) {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.boardPoints = [...this.pointsModel.getPoints()]; // Копируем моковые данные и помещаем в новый массив boardPoints

    render(new TripSort(), this.boardContainer); // Отрисовал сортировку
    render(this.TripListComponent, this.boardContainer); // Создал <ul>
    render(
      new TripPointEdit({ point: this.boardPoints[0] }),
      this.TripListComponent.getElement()
    ); // Создал форму редактирования точки маршрута
    for (let i = 1; i < this.boardPoints.length; i++) {
      render(
        new TripPoint({ point: this.boardPoints[i] }),
        this.TripListComponent.getElement()
      ); // Создал точки маршрута
    }
  }
}
