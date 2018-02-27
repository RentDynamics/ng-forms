/* tslint:disable:no-unused-variable */
import { ElementRef, Inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

import {
  async, inject
} from '@angular/core/testing';

import { ColorPickerColorComponent } from './color-picker-color.component';
import { ColorPickerComponent } from '../../color-picker.component';
import { RdAngularFormsModule } from '../../../forms.module';

let component: ColorPickerColorComponent;
let fixture: ComponentFixture<ColorPickerColorComponent>;
let debugElem: DebugElement;
let elem: HTMLElement;

describe('Component: ColorPickerColor', () => {
  // simple style
  beforeEach(() => {
    TestBed.configureTestingModule({
      //declarations: [ColorPickerColorComponent, ColorPickerComponent],
      imports: [RdAngularFormsModule],
      providers: [{ provide: ColorPickerComponent, useValue: {} }]
    });

    fixture = TestBed.createComponent(ColorPickerColorComponent);
    component = fixture.componentInstance;
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  // it('provider should be defined', () => {
  //   expect(component.elem).toBeTruthy();
  // })
});
