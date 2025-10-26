
import { getRandomInteger } from '../utils';
import { MIN_RANDOM_VALUE, MAX_RANDOM_VALUE } from '../const';

const mockDestination = [
  {
    id: '1',
    description:
      'Moscow is the capital of Russia, a city of federal significance, the administrative center of the Central Federal District and the center of the Moscow Region.',
    name: 'Moscow',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(MIN_RANDOM_VALUE, MAX_RANDOM_VALUE)}`,
        description: 'Рандомное изображение не загрузилось',
      },
    ],
  },
  {
    id: '2',
    description:
      'Novosibirsk is the third most populous city in Russia, the largest city in its Asian part, and the administrative center of the Novosibirsk Region and Novosibirsk District..',
    name: 'Novosibirsk',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(MIN_RANDOM_VALUE, MAX_RANDOM_VALUE)}`,
        description: 'Рандомное изображение не загрузилось',
      },
    ],
  },
  {
    id: '3',
    description:
      'Adler is a resort and the administrative center of the Adler district of Sochi, Krasnodar Territory, Russian Federation.',
    name: 'Adler',
    pictures: [],
  },
];

export { mockDestination };
