import dayjs from 'dayjs';
import dayjsPluginUTC from 'dayjs-plugin-utc';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function humanizeDate(date, format) {
  dayjs.extend(dayjsPluginUTC);
  return date ? dayjs.utc(date).format(format) : '';
}

function sortingByDay(a, b) {
  const dateA = dayjs(a.dateFrom).valueOf();
  const dateB = dayjs(b.dateFrom).valueOf();
  return dateA - dateB;
}

function sortingByPrice(a, b) {
  return a.basePrice - b.basePrice;
}

function sortingByTime() {

}

export { getRandomArrayElement, humanizeDate, sortingByDay, sortingByPrice, sortingByTime };
