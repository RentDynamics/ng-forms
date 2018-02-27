/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  async, inject
} from '@angular/core/testing';

import { ButtonGroupButtonDirective } from './button-group-button.directive';

describe('Component: ButtonGroupButton', () => {
  it('should create an instance', () => {
    let component = new ButtonGroupButtonDirective();
    expect(component).toBeTruthy();
  });
});
