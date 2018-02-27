/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AfterViewInit, Component, ViewChild, DebugElement } from '@angular/core';
import { NgModel } from '@angular/forms';

import { InputModule } from './input.module';
import { InputThrottleDirective } from './input-throttle.directive';

describe('InputThrottleDirective', () => {
  let component: MockWrapperComponent;
  let debugElem: DebugElement;
  let directive: InputThrottleDirective;
  let fixture: ComponentFixture<MockWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockWrapperComponent
      ],
      imports: [
        InputModule
      ],
      providers: [
        { provide: NgModel, useValue: {} }
      ]
   });
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(MockWrapperComponent);
    component = fixture.componentInstance;
    debugElem = fixture.debugElement;
    //fixture.detectChanges();
  });

  beforeEach(() => {
    /* latest way to access directive that you are testing--works in our tests only */
    //directive = debugElem.query(By.directive(InputThrottleDirective)).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create InputThrottleDirective', () => {
    expect(component.directive).toBeTruthy();
  });

  it('has access to ng model', () => {
    expect(component.directive.ngModel).toBeDefined();
  })
});

@Component({
  template: `<textarea rdInputThrottle></textarea>`
})
export class MockWrapperComponent implements AfterViewInit {
    /* alternate way you could access directive 
      @ViewChild()--works in tests and in production */
    /* you would access it this way via component.directive */
    /* not available until afterViewInit() */
    @ViewChild(InputThrottleDirective) directive: InputThrottleDirective;

    constructor() { }

    ngAfterViewInit() {
      /* directive should be defined after this point */
    }
}