import dayjs from 'dayjs';
import dayjsPluginUTC from 'dayjs-plugin-utc';
import { RANDOM_NUMBER } from './const';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomNumber() {
  return Math.floor(Math.random() * (RANDOM_NUMBER.max - RANDOM_NUMBER.min)) + RANDOM_NUMBER.min;
}

function humanizeDate(date, format) {
  dayjs.extend(dayjsPluginUTC);
  return date ? dayjs.utc(date).format(format) : '';
}

export { getRandomArrayElement, getRandomNumber, humanizeDate };
