import { getRandomArrayElement } from '../utils';

const mockPoints = [
  {
    id: '1',
    basePrice: 200,
    dateFrom: '2019-12-01T07:30:56.845Z',
    dateTo: '2019-12-01T12:25:13.375Z',
    destination: '1',
    isFavorite: true,
    offers: '5',
    type: 'flight',
  },
  {
    id: '2',
    basePrice: 300,
    dateFrom: '2019-03-04T11:55:56.845Z',
    dateTo: '2019-03-04T12:10:13.375Z',
    destination: '3',
    isFavorite: false,
    offers: ['3', '1'],
    type: 'taxi',
  },
  {
    id: '3',
    basePrice: 120,
    dateFrom: '2019-01-10T23:55:10.845Z',
    dateTo: '2019-01-11T00:15:15.375Z',
    destination: '2',
    isFavorite: false,
    offers: '',
    type: 'check-in',
  },
];

const getRandomPoints = () => getRandomArrayElement(mockPoints);
export { getRandomPoints };
