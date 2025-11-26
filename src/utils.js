import dayjs from 'dayjs';
import { FilterType } from './const';

const humanizeDate = (date, format) => date ? dayjs(date).format(format) : '';

const sortingByDay = (firstItem, secondItem) => {
  const dateA = dayjs(firstItem.dateFrom).valueOf();
  const dateB = dayjs(secondItem.dateFrom).valueOf();
  return dateA - dateB;
};

const sortingByPrice = (firstItem, secondItem) => secondItem.basePrice - firstItem.basePrice;

const sortingByTime = (firstItem, secondItem) => {
  const firstDate = dayjs(firstItem.dateTo).valueOf() - dayjs(firstItem.dateFrom).valueOf();
  const secondDate = dayjs(secondItem.dateTo).valueOf() - dayjs(secondItem.dateFrom).valueOf();
  return secondDate - firstDate;
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

export { humanizeDate, sortingByDay, sortingByPrice, sortingByTime, filterPoints };
