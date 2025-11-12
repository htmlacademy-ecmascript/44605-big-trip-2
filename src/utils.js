import dayjs from 'dayjs';
import { FilterType } from './const';
// import dayjsPluginUTC from 'dayjs-plugin-utc';

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const getRandomInteger = (min, max) => {
  min = Math.ceil(min); // Округляем min до ближайшего большего целого
  max = Math.floor(max); // Округляем max до ближайшего меньшего целого
  return Math.floor(Math.random() * (max - min + 1) + min); // [min, max]
};

const humanizeDate = (date, format) => date ? dayjs(date).format(format) : '';

const sortingByDay = (a, b) => {
  const dateA = dayjs(a.dateFrom).valueOf();
  const dateB = dayjs(b.dateFrom).valueOf();
  return dateA - dateB;
};

const sortingByPrice = (a, b) => b.basePrice - a.basePrice;

const sortingByTime = (a, b) => {
  const dateA = dayjs(a.dateTo).valueOf() - dayjs(a.dateFrom).valueOf();
  const dateB = dayjs(b.dateTo).valueOf() - dayjs(b.dateFrom).valueOf();
  return dateB - dateA;
};

/**
 * Фильтрует точки маршрута в зависимости от типа фильтра
 * @param {Array} points - Массив точек маршрута
 * @param {string} filterType - Тип фильтра (EVERYTHING, FUTURE, PRESENT, PAST)
 * @returns {Array} Отфильтрованный массив точек
 */
const filterPoints = (points, filterType) => {
  const nowDate = dayjs();

  switch (filterType) {
    case FilterType.FUTURE:
      return points.filter((point) => dayjs(point.dateFrom).isAfter(nowDate));
    case FilterType.PRESENT:
      return points.filter((point) => {
        const dateFrom = dayjs(point.dateFrom);
        const dateTo = dayjs(point.dateTo);
        return (dateFrom.isBefore(nowDate) || dateFrom.isSame(nowDate)) && (dateTo.isAfter(nowDate) || dateTo.isSame(nowDate));
      });
    case FilterType.PAST:
      return points.filter((point) => dayjs(point.dateTo).isBefore(nowDate));
    case FilterType.EVERYTHING:
    default:
      return points;
  }
};

export { getRandomArrayElement, getRandomInteger, humanizeDate, sortingByDay, sortingByPrice, sortingByTime, filterPoints };
