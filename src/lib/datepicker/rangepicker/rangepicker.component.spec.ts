/* tslint:disable:no-unused-variable */
import { Component, ElementRef, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

import {
  async, inject
} from '@angular/core/testing';

import { RangepickerComponent } from './rangepicker.component';
import { DatepickerHelper, DatepickerQuickAccessButton, DatepickerToggleButton, DATE_TYPE_ENUM, DropdownBuilderComponent } from '../shared';

let component: TestHostComponent;
let fixture: ComponentFixture<TestHostComponent>;
let debugElem: DebugElement;
let elem: HTMLElement;
let quickAccessBtnEl: DebugElement;

@Component({
  template: `
  <rd-rangepicker (change)="onRangeChange($event)" [(ngModel)]="ngModelRange" [momentFormat]="'MM/DD/Y'" style="display: inline-block;">
      <a rd-datepicker-toggle-button class="btn btn-default" uib-btn-radio="0" uncheckable>
        <div *ngIf="ngModelRange">{{ngModelRange.join(', ')}}&nbsp;&nbsp;<i class="fa fa-sort-desc" style="vertical-align: text-top;"></i></div>
        <div *ngIf="!ngModelRange" class="md-placeholder">select date</div>
      </a>

      <!-- <button rd-datepicker-quick-access-button *ngFor="let quickAccessRange of quickAccessRangesAsArray" [value]="quickAccessRange.value" class="btn btn-default btn-block">
        {{quickAccessRange.name}}
      </button> -->
  </rd-rangepicker>`
})
class TestHostComponent {
  ngModelRange: any[] = [];
  newVal: any[];
  quickAccessRangesAsArray: any[] = [{ value: 2, name: 'two days from now' }];
  onRangeChange($event) { this.newVal = $event; }
}

describe('Component: Rangepicker', () => {
  // simple style
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, RangepickerComponent, DatepickerQuickAccessButton, DropdownBuilderComponent, DatepickerToggleButton],
      imports: [FormsModule],
      providers: [{
        provide: ElementRef,
        useValue: {
          nativeElement: {}
        }
      }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    quickAccessBtnEl = fixture.debugElement.query(By.css('button')); // find hero
    fixture.detectChanges();
  })

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  // it('provider should be defined', () => {
  //   expect(component.elem).toBeTruthy();
  // })
});
