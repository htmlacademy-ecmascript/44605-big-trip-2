import { nanoid } from 'nanoid';
import { getRandomArrayElement } from '../utils';

const mockPoints = [
  {
    basePrice: 200,
    dateFrom: '2019-12-01T07:30:56.845Z',
    dateTo: '2019-12-02T12:25:13.375Z',
    destination: '1',
    isFavorite: true,
    offers: '5',
    type: 'flight',
  },
  {
    basePrice: 300,
    dateFrom: '2019-03-04T11:55:56.845Z',
    dateTo: '2019-03-04T12:10:13.375Z',
    destination: '3',
    isFavorite: false,
    offers: ['3', '1'],
    type: 'taxi',
  },
  {
    basePrice: 120,
    dateFrom: '2025-11-17T07:55:00.845Z',
    dateTo: '2025-11-17T08:15:00.375Z',
    destination: '2',
    isFavorite: true,
    offers: '',
    type: 'check-in',
  },
];

function getRandomPoints() {
  return {
    id: nanoid(),
    ...getRandomArrayElement(mockPoints)
  };
}

export { getRandomPoints };
