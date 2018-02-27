/* tslint:disable:no-unused-variable */
import { ElementRef, Inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

import {
  async, inject
} from '@angular/core/testing';

import { PickmeupDirective } from './pickmeup.directive';
import { RdAngularFormsModule } from '../../forms.module';
//import { SIMPLE_SORT_DIRECTIVES } from './index';

describe('Directive: Pickmeup', () => {
  // simple style
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RdAngularFormsModule],
      // Provide a test-double instead
      providers: [
        { provide: ElementRef, useValue: {} }
      ]
    });
  });

  it('should create an instance', inject([ElementRef], (elementRef) => {
    let component = new PickmeupDirective(elementRef);
    expect(component).toBeTruthy();
  }));
});