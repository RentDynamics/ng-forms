/* tslint:disable:no-unused-variable */
import { ElementRef, Inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

import {
  async, inject
} from '@angular/core/testing';

import { BlurDirective } from './blur.directive';

describe('Directive: Blur', () => {
  // simple style
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlurDirective],
      // Provide a test-double instead
      providers: [
        { provide: ElementRef, useValue: {} }
      ]
    });
  });

  it('should create an instance', inject([ElementRef], (elementRef) => {
    let component = new BlurDirective(elementRef);
    expect(component).toBeTruthy();
  }));
});