/* tslint:disable:no-unused-variable */
import { ElementRef, Inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

import {
  async, inject
} from '@angular/core/testing';

import { ComboSelectComponent } from '../combo-select.component';
import { ComboSelectInputDirective } from './combo-select-input.directive';

describe('Directive: ComboSelectInput', () => {
  // simple style
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComboSelectInputDirective],
      // Provide a test-double instead
      providers: [
        { provide: ElementRef, useValue: {} },
        { provide: ComboSelectComponent, useValue: {} }
      ]
    });
  });

  it('should create an instance', inject([ComboSelectComponent, ElementRef], (comboselect, elementRef) => {
    let component = new ComboSelectInputDirective(comboselect, elementRef);
    expect(component).toBeTruthy();
  }));
});