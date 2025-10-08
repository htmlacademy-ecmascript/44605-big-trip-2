import dayjs from 'dayjs';
import dayjsPluginUTC from 'dayjs-plugin-utc';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function humanizeDate(date, format) {
  dayjs.extend(dayjsPluginUTC);
  return date ? dayjs.utc(date).format(format) : '';
}

export { getRandomArrayElement, humanizeDate };
