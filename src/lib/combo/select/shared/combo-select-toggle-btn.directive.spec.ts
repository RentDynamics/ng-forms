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
import { ComboSelectToggleBtnDirective } from './combo-select-toggle-btn.directive';

describe('Directive: ComboSelectToggleBtn', () => {
  // simple style
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComboSelectToggleBtnDirective],
      // Provide a test-double instead
      providers: [
        { provide: ElementRef, useValue: {} },
        { provide: ComboSelectComponent, useValue: {} }
      ]
    });
  });

  it('should create an instance', inject([ComboSelectComponent, ElementRef], (comboselect, elementRef) => {
    let component = new ComboSelectToggleBtnDirective(comboselect, elementRef);
    expect(component).toBeTruthy();
  }));
});