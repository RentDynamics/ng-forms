/* tslint:disable:no-unused-variable */
import { ElementRef, Inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

import {
  async, inject
} from '@angular/core/testing';

import { ColorPickerComponent } from './color-picker.component';

let component: ColorPickerComponent;
let fixture: ComponentFixture<ColorPickerComponent>;
let debugElem: DebugElement;
let elem: HTMLElement;

describe('Component: ColorPicker', () => {
  // simple style
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColorPickerComponent],
    });

    fixture = TestBed.createComponent(ColorPickerComponent);
    component = fixture.componentInstance;
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  // it('provider should be defined', () => {
  //   expect(component.elem).toBeTruthy();
  // })
});
