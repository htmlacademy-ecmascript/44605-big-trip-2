import dayjs from 'dayjs';
import { DATE_FORMAT, TIME_FORMAT } from './const';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function humanizeDate(date) {
  return date ? dayjs(date).format(DATE_FORMAT) : '';
}

function humanizeTime(date) {

  return date ? dayjs(date).format(TIME_FORMAT) : '';
}

export { getRandomArrayElement, getRandomNumber, humanizeDate, humanizeTime };
