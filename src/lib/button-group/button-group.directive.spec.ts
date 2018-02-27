/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  async, inject
} from '@angular/core/testing';

import { ButtonGroupDirective } from './button-group.directive';

describe('Component: ButtonGroup', () => {
  it('should create an instance', () => {
    let component = new ButtonGroupDirective();
    expect(component).toBeTruthy();
  });
});
