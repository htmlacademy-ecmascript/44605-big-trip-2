import dayjs from 'dayjs';
// import dayjsPluginUTC from 'dayjs-plugin-utc';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomInteger(min, max) {
  min = Math.ceil(min); // Округляем min до ближайшего большего целого
  max = Math.floor(max); // Округляем max до ближайшего меньшего целого
  return Math.floor(Math.random() * (max - min + 1) + min); // [min, max]
}

function humanizeDate(date, format) {
  // dayjs.extend(dayjsPluginUTC);
  // return date ? dayjs.utc(date).format(format) : '';
  return date ? dayjs(date).format(format) : '';
}

function sortingByDay(a, b) {
  const dateA = dayjs(a.dateFrom).valueOf();
  const dateB = dayjs(b.dateFrom).valueOf();
  return dateA - dateB;
}

function sortingByPrice(a, b) {
  return b.basePrice - a.basePrice;
}

function sortingByTime(a, b) {
  const dateA = dayjs(a.dateFrom).valueOf();
  const dateB = dayjs(b.dateFrom).valueOf();
  return dateB - dateA;
}

export { getRandomArrayElement, getRandomInteger, humanizeDate, sortingByDay, sortingByPrice, sortingByTime };
