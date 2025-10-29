import { nanoid } from 'nanoid';
import { getRandomArrayElement } from '../utils';

const mockPoints = [
  {
    basePrice: 200,
    dateFrom: '2019-12-01T07:30:56.845Z',
    dateTo: '2019-12-02T12:25:13.375Z',
    destination: '1', // Moscow
    isFavorite: true,
    offers: ['5'], // flight: business class
    type: 'flight',
  },
  {
    basePrice: 300,
    dateFrom: '2019-03-04T11:55:56.845Z',
    dateTo: '2019-03-04T12:10:13.375Z',
    destination: '3', // Adler
    isFavorite: false,
    offers: ['3', '1'], // taxi: translator, comfort
    type: 'taxi',
  },
  {
    basePrice: 120,
    dateFrom: '2025-11-17T07:55:00.845Z',
    dateTo: '2025-11-17T08:15:00.375Z',
    destination: '2', // Novosibirsk
    isFavorite: true,
    offers: ['22'], // check-in: early check-in
    type: 'check-in',
  },
  {
    basePrice: 80,
    dateFrom: '2025-06-10T09:00:00.000Z',
    dateTo: '2025-06-10T14:30:00.000Z',
    destination: '4', // Saint Petersburg
    isFavorite: false,
    offers: ['17', '19'], // sightseeing: guide + river cruise
    type: 'sightseeing',
  },
  {
    basePrice: 65,
    dateFrom: '2025-07-02T07:20:00.000Z',
    dateTo: '2025-07-02T13:40:00.000Z',
    destination: '5', // Kazan
    isFavorite: false,
    offers: ['7', '8'], // train: compartment + bedding
    type: 'train',
  },
  {
    basePrice: 40,
    dateFrom: '2025-08-15T10:00:00.000Z',
    dateTo: '2025-08-15T16:00:00.000Z',
    destination: '6', // Sochi
    isFavorite: true,
    offers: ['10', '11'], // bus: legroom + wifi
    type: 'bus',
  },
  {
    basePrice: 220,
    dateFrom: '2025-09-01T05:30:00.000Z',
    dateTo: '2025-09-01T08:45:00.000Z',
    destination: '7', // Vladivostok
    isFavorite: false,
    offers: ['14', '16'], // drive: insurance + unlimited mileage
    type: 'drive',
  },
  {
    basePrice: 150,
    dateFrom: '2025-07-20T12:00:00.000Z',
    dateTo: '2025-07-22T09:00:00.000Z',
    destination: '9', // Irkutsk (Baikal)
    isFavorite: true,
    offers: ['12', '13'], // ship: sea view + meals
    type: 'ship',
  },
  {
    basePrice: 95,
    dateFrom: '2025-12-10T18:30:00.000Z',
    dateTo: '2025-12-10T20:00:00.000Z',
    destination: '8', // Murmansk
    isFavorite: false,
    offers: ['20'], // restaurant: tasting menu
    type: 'restaurant',
  },
  {
    basePrice: 180,
    dateFrom: '2025-05-05T06:15:00.000Z',
    dateTo: '2025-05-05T09:30:00.000Z',
    destination: '10', // Kaliningrad
    isFavorite: false,
    offers: ['6', '5'], // flight: baby food + business
    type: 'flight',
  },
];

function getRandomPoints() {
  return {
    id: nanoid(),
    ...getRandomArrayElement(mockPoints)
  };
}

export { getRandomPoints };
