/* tslint:disable:no-unused-variable */

import {
  async, inject
} from '@angular/core/testing';

import { isMoment, isBlur } from './helpers';

describe('Helpers', () => {
  it('isMoment()', () => {
    expect(isMoment);
  });

  it('isBlur()', () => {
    expect(isBlur).toBeTruthy();
  });
});
