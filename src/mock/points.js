import { getRandomArrayElement } from '../utils';

// Точки маршрута
const mockPoints = [
  {
    id: '1',
    basePrice: 200,
    dateFrom: '2019-12-01T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 'Chamonix',
    isFavorite: true,
    offers: ['4'],
    type: 'flight',
  },
  {
    id: '2',
    basePrice: 300,
    dateFrom: '2019-03-04T11:55:56.845Z',
    dateTo: '2019-07-11T11:59:13.375Z',
    destination: 'Amsterdam',
    isFavorite: false,
    offers: 'Upgrade to a business class',
    type: 'taxi',
  },
  {
    id: '3',
    basePrice: 120,
    dateFrom: '2019-01-10T12:00:10.845Z',
    dateTo: '2019-07-11T18:15:1.375Z',
    destination: 'London',
    isFavorite: false,
    offers: ['3'],
    type: 'check-in',
  },
];

const getRandomPoints = () => getRandomArrayElement(mockPoints);
export { getRandomPoints };
