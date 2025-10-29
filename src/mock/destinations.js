
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
  {
    id: '4',
    description:
      'Saint Petersburg is Russia’s cultural capital, famous for the Hermitage and canals.',
    name: 'Saint Petersburg',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(MIN_RANDOM_VALUE, MAX_RANDOM_VALUE)}`,
        description: 'Набережные Санкт‑Петербурга'
      },
    ],
  },
  {
    id: '5',
    description:
      'Kazan is a city on the Volga River, known for the Kazan Kremlin and Tatar culture.',
    name: 'Kazan',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(MIN_RANDOM_VALUE, MAX_RANDOM_VALUE)}`,
        description: 'Казанский Кремль'
      },
    ],
  },
  {
    id: '6',
    description:
      'Sochi is a Black Sea resort city, gateway to the Caucasus mountains.',
    name: 'Sochi',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(MIN_RANDOM_VALUE, MAX_RANDOM_VALUE)}`,
        description: 'Побережье Сочи'
      },
    ],
  },
  {
    id: '7',
    description:
      'Vladivostok is a Pacific port city, terminus of the Trans‑Siberian Railway.',
    name: 'Vladivostok',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(MIN_RANDOM_VALUE, MAX_RANDOM_VALUE)}`,
        description: 'Золотой мост'
      },
    ],
  },
  {
    id: '8',
    description:
      'Murmansk is an Arctic city famous for Northern Lights and polar nights.',
    name: 'Murmansk',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(MIN_RANDOM_VALUE, MAX_RANDOM_VALUE)}`,
        description: 'Полярные пейзажи'
      },
    ],
  },
  {
    id: '9',
    description:
      'Irkutsk is a gateway to Lake Baikal, the world’s deepest lake.',
    name: 'Irkutsk',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(MIN_RANDOM_VALUE, MAX_RANDOM_VALUE)}`,
        description: 'Озеро Байкал'
      },
    ],
  },
  {
    id: '10',
    description:
      'Kaliningrad is a Baltic exclave with Prussian heritage and seaside resorts.',
    name: 'Kaliningrad',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(MIN_RANDOM_VALUE, MAX_RANDOM_VALUE)}`,
        description: 'Балтийское побережье'
      },
    ],
  },
  {
    id: '11',
    description:
      'Yekaterinburg sits on the border of Europe and Asia, an industrial and cultural hub.',
    name: 'Yekaterinburg',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(MIN_RANDOM_VALUE, MAX_RANDOM_VALUE)}`,
        description: 'Панорама Екатеринбурга'
      },
    ],
  },
];

export { mockDestination };
