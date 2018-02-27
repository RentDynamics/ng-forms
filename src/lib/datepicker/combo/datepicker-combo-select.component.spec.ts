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
import { DatepickerComboSelectComponent } from './datepicker-combo-select.component';

declare var moment;

let component: DatepickerComboSelectComponent;
let fixture: ComponentFixture<DatepickerComboSelectComponent>;
let debugElem: DebugElement;
let elem: HTMLInputElement;

describe('Component: DatepickerComboSelect', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RdAngularFormsModule
      ],
      providers: [
        { provide: CoreApiService, useValue: CoreApiServiceMock },
      ],
    });

    fixture = TestBed.createComponent(DatepickerComboSelectComponent);
    component = fixture.componentInstance;
    debugElem = fixture.debugElement.query(By.css('input'));
    elem = debugElem.nativeElement;
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('inputNgModel is set to ngModel onInit()', () => {
    /* Arrange */
    component.ngModel = moment('12/13/2016', component.momentFormat);

    /* Act */
    component.ngOnInit();
    fixture.detectChanges();

    /* Assert */
    expect(component.inputNgModel).toBeTruthy();
    expect(component.inputNgModel).toBe('12/13/2016');
  });

  it('ngModel gets set to inputNgModel onInputBlur() when in the correct format', () => {
    /* Arrange */
    component.inputNgModel = '12/10/2016';

    /* Act */
    component.onInputBlur();
    fixture.detectChanges();

    /* Assert */
    expect(component.ngModel).toBeTruthy();
    expect(component.ngModel.day).toBeTruthy();
    expect(component.ngModel.day()).toBe(6);
    expect(component.ngModel.format).toBeTruthy();
    expect(component.ngModel.format(component.momentFormat)).toBe('12/10/2016');
  });

  it('ngModel doesnt change onInputBlur() when inputNgModel is NOT in the correct format', () => {
    /* Arrange */
    component.ngModel = moment('12/10/2016', component.momentFormat);
    component.inputNgModel = 'abc';

    /* Act */
    component.onInputBlur();
    fixture.detectChanges();

    /* Assert */
    expect(component.ngModel).toBeTruthy();
    expect(component.ngModel.day).toBeTruthy();
    expect(component.ngModel.day()).toBe(6);
    expect(component.ngModel.format).toBeTruthy();
    expect(component.ngModel.format(component.momentFormat)).toBe('12/10/2016');
  });
});
