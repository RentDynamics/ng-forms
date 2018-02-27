import * as moment from 'moment';

export const isBlur = function isBlur($windowClickEvent, elem: HTMLElement) {
  return elem !== $windowClickEvent.target && !elem.contains($windowClickEvent.target);
}

export const isMoment = function isMoment(value) {
  return moment.isMoment(value);
}
