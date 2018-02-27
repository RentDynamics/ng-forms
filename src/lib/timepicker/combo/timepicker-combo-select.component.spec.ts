/* tslint:disable:no-unused-variable */
import { ElementRef, Inject, ChangeDetectorRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Rx';

import {
  async, inject
} from '@angular/core/testing';

import { CoreApiService } from '../../../core';
import { CoreApiServiceMock } from '../../../core/testing';

import { RdAngularFormsModule } from '../../forms.module';
import { TimePickerComboSelectComponent } from './timepicker-combo-select.component';

declare var moment;

let component: TimePickerComboSelectComponent;
let fixture: ComponentFixture<TimePickerComboSelectComponent>;
let debugElem: DebugElement;
let elem: HTMLInputElement;

describe('Component: TimePickerComboSelect', () => {
  // simple style
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RdAngularFormsModule
      ],
      providers: [
        { provide: CoreApiService, useValue: CoreApiServiceMock },
      ],
    });

    fixture = TestBed.createComponent(TimePickerComboSelectComponent);
    component = fixture.componentInstance;
    debugElem = fixture.debugElement.query(By.css('input'));
    elem = debugElem.nativeElement;
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('onTimeSelected() sets ngModel', () => {
    /* Act */
    component.onTimeSelected('9:00 am');
    /* Assert */
    expect(component.ngModel).toBeTruthy();
    expect(component.ngModel).toBe('9:00 am');
  });

  it('times are set correctly when min and max values are provided', () => {
    /* Arrange */
    component.min = moment('8:30 am', 'h:mm a');
    component.max = moment('10:30 am', 'h:mm a');

    /* Act */
    component.ngOnInit();
    fixture.detectChanges();

    /* Assert */
    expect(component.times).toBeTruthy();
    expect(component.times.length).toBe(9);
    expect(component.times).toEqual([
      '8:30 am', '8:45 am', '9:00 am', '9:15 am',
      '9:30 am', '9:45 am', '10:00 am', '10:15 am',
      '10:30 am'
    ]);
  });

  it('inputNgModel is set to ngModel onInit()', () => {
    /* Arrange */
    component.ngModel = '8:45 am';
    component.min = moment('8:30 am', 'h:mm a');
    component.max = moment('10:30 am', 'h:mm a');

    /* Act */
    component.ngOnInit();
    fixture.detectChanges();

    /* Assert */
    expect(component.inputNgModel).toBeTruthy();
    expect(component.inputNgModel).toBe('8:45 am');
  });

  it('isValidInput() resolves truthy when value is in times array', () => {
    /* Arrange */
    component.min = moment('8:30 am', 'h:mm a');
    component.max = moment('10:30 am', 'h:mm a');

    /* Act */
    component.ngOnInit();
    let result = component.isValidInput('8:30 am');
    fixture.detectChanges();

    /* Assert */
    expect(result).toBeTruthy();
  });

  it('isValidInput() resolves falsy when value is NOT in times array', () => {
    /* Arrange */
    component.min = moment('8:30 am', 'h:mm a');
    component.max = moment('10:30 am', 'h:mm a');

    /* Act */
    component.ngOnInit();
    let result = component.isValidInput('8:15 am');
    fixture.detectChanges();

    /* Assert */
    expect(result).toBeFalsy();
  });

  it('ngModel gets set to inputNgModel onInputBlur() when in the correct format', () => {
    /* Arrange */
    component.ngModel = '8:30 am';
    component.min = moment('8:30 am', 'h:mm a');
    component.max = moment('10:30 am', 'h:mm a');

    /* Act */
    component.ngOnInit();
    component.inputNgModel = '10:30 am';
    component.onInputBlur();
    fixture.detectChanges();

    /* Assert */
    expect(component.ngModel).toBeTruthy();
    expect(component.ngModel).toBe('10:30 am');
    expect(component.inputNgModel).toBeTruthy();
    expect(component.inputNgModel).toBe('10:30 am');
  });

  it('ngModel doesnt change onInputBlur() when inputNgModel is NOT in the correct format', () => {
    /* Arrange */
    component.ngModel = '8:30 am';
    component.min = moment('8:30 am', 'h:mm a');
    component.max = moment('10:30 am', 'h:mm a');

    /* Act */
    component.ngOnInit();
    component.inputNgModel = 'abc'
    component.onInputBlur();
    fixture.detectChanges();

    /* Assert */
    expect(component.ngModel).toBeTruthy();
    expect(component.ngModel).toBe('8:30 am');
    expect(component.inputNgModel).toBeTruthy();
    expect(component.inputNgModel).toBe('8:30 am');
  });
});
