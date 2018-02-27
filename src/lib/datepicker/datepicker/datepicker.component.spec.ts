/* tslint:disable:no-unused-variable */
import { ElementRef, Inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

import {
  async, inject
} from '@angular/core/testing';

import { DatepickerComponent } from './datepicker.component';
import { DropdownBuilderComponent } from '../shared';

let component: DatepickerComponent;
let fixture: ComponentFixture<DatepickerComponent>;
let debugElem: DebugElement;
let elem: HTMLElement;

describe('Component: Datepicker', () => {
  // simple style
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatepickerComponent, DropdownBuilderComponent],
      providers: [{
        provide: ElementRef,
        useValue: {
          nativeElement: {}
        }
      }]
    });

    fixture = TestBed.createComponent(DatepickerComponent);
    component = fixture.componentInstance;
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  // it('provider should be defined', () => {
  //   expect(component.elem).toBeTruthy();
  // })
});
