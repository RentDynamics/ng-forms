/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AfterViewInit, Component, ViewChild, DebugElement } from '@angular/core';
import { NgControl } from '@angular/forms';

import { CoreApiService, ImmutableService, TextMsgItApiService } from '../core';
import { CoreApiServiceMock } from '../core/testing';

import { UiMaskDirective } from './ui-mask.directive';
import { RdAngularFormsModule } from './forms.module';

describe('Directive: UiMask', () => {
  let component: MockWrapperComponent;
  let debugElem: DebugElement;
  let directive: UiMaskDirective;
  let fixture: ComponentFixture<MockWrapperComponent>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockWrapperComponent
      ],
      imports: [
        RdAngularFormsModule
      ],
      providers: [
        ImmutableService,
        { provide: NgControl, useValue: {} },
        { provide: CoreApiService, useValue: CoreApiServiceMock },
        { provide: TextMsgItApiService, useValue: CoreApiServiceMock },
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockWrapperComponent);
    component = fixture.componentInstance;
    debugElem = fixture.debugElement;
    fixture.detectChanges();
  });

  beforeEach(() => {
    /* latest way to access directive that you are testing--in our tests */
    //directive = debugElem.query(By.directive(UiMaskDirective)).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create UiMaskDirective', () => {
    expect(component.directive).toBeTruthy();
  });

  describe('initial value', () => {

    beforeEach(() => {
      component.uiMaskNgModel = '4358909518';
      fixture.detectChanges();
    });

    // it('uiMaskDirective view value should be (435) 890-9518', () => {
    //   expect(component.directive.ngModel.control.value).toBe('(435) 890-9518');
    // });

  });
});

@Component({
  template:
  `<input rdUiMask="(999) 999-9999" />`
})
export class MockWrapperComponent implements AfterViewInit {
  /* alternate way you could access directive 
    @ViewChild()--works in tests and in production */
  /* you would access it this way via component.directive */
  /* not available until afterViewInit() */
  @ViewChild(UiMaskDirective) directive: UiMaskDirective;

  uiMaskNgModel: string;

  constructor() { }

  ngAfterViewInit() {
    /* directive should be defined now */
  }

}