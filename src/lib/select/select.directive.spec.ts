/* tslint:disable:no-unused-variable */
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

import {
  async, inject
} from '@angular/core/testing';

import { ImmutableService } from '../../core';

import { SelectModule } from './select.module';
import { SelectDirective } from './select.directive';
import { Select, OptionDirective, SelectTitleDirective, SelectToggleBtnDirective } from './shared';

let component: MockSelectWrapperComponent;
let fixture: ComponentFixture<MockSelectWrapperComponent>;
let toggleBtn: DebugElement;
let options: DebugElement[];
let elem: HTMLElement;

describe('Directive: Select', () => {
  let select,
    spy = {
      change: null,
      ngModelChange$: null,
      optionChange$: null,
      writeValue: null
    };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockSelectWrapperComponent
      ],
      imports: [
        SelectModule
      ],
      // Provide a test-double instead
      providers: [
        { provide: ElementRef, useValue: {} }
      ]
    });

    TestBed.compileComponents();

    fixture = TestBed.createComponent(MockSelectWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    toggleBtn = fixture.debugElement.query(By.directive(SelectToggleBtnDirective));
    options = fixture.debugElement.queryAll(By.directive(OptionDirective));
  });

  it('should create an instance', inject([ImmutableService], (immutable: ImmutableService) => {
    expect(component).toBeTruthy();
  }));

  it('should create a SelectDirective instance', inject([ImmutableService], (immutable: ImmutableService) => {
    expect(component.select).toBeTruthy();
  }));

  describe('change()', () => {

    beforeEach(() => {
      fixture.detectChanges();
    });

    it('is invoked when setNgModel() is invoked', inject([ImmutableService], (immutableSvc: ImmutableService) => {
      /* Arrange */
      let result;
      spy.change = spyOn(component, 'onChange').and.callFake((newVal) => {
        result = newVal;
      });

      /* Act */
      elem = options[1].nativeElement;
      elem.click();
      fixture.detectChanges();

      /* Assert */
      expect(spy.change).toHaveBeenCalled();
      expect(result).toEqual([2]);
    }));

    it('is NOT invoked when value is written from an external event', inject([ImmutableService], (immutableSvc: ImmutableService) => {
      /* Arrange */
      let result;
      spy.change = spyOn(component, 'onChange').and.callFake((newVal) => {
        result = newVal;
      });

      /* Act */
      component.select.writeValue([2]);
      fixture.detectChanges();

      /* Assert */
      expect(spy.change).not.toHaveBeenCalled();
      expect(result).toBeFalsy();
    }));

  })

  describe('options', () => {

    beforeEach(() => {
      fixture.detectChanges();
    });

    it('are defined', inject([], () => {
      expect(component.select.options).toBeTruthy();
      expect(component.select.options.length).toBe(3);
    }));

    it('increase when mock component units increase', inject([], () => {
      /* Act */
      component.units.push({
        id: 999,
        address: '999z'
      });
      fixture.detectChanges();

      /* Assert */
      expect(component.select.options).toBeTruthy();
      expect(component.select.options.length).toBe(4);
    }));

    xit('decrease when mock component units decrease', inject([], () => {
      /* Act */
      component.units.shift();
      fixture.detectChanges();

      /* Assert */
      expect(component.select.options).toBeTruthy();
      expect(component.select.options.length).toBe(2);
    }));

    it('optionChange$ emits when addOption() is invoked', inject([ImmutableService], (immutableSvc: ImmutableService) => {
      /* Arrange */
      let result;
      let self = {
        subscribeCallback: (res) => {
          result = res;
        }
      };
      spy.optionChange$ = spyOn(self, 'subscribeCallback').and.callThrough();
      component.select.optionChange$.subscribe(self.subscribeCallback);

      /* Act */
      component.select.addOption({
        title: '999z',
        value: 999
      });
      fixture.detectChanges();

      /* Assert */
      expect(spy.optionChange$).toHaveBeenCalled();
      expect(spy.optionChange$).toHaveBeenCalledTimes(1);
    }));

  });


  describe('ngModelChange$', () => {

    beforeEach(() => {
      fixture.detectChanges();
    });

    it('emits when setNgModel() is invoked', inject([ImmutableService], (immutableSvc: ImmutableService) => {
      /* Arrange */
      let result;
      let self = {
        subscribeCallback: (res) => {
          result = res;
        }
      };
      spy.ngModelChange$ = spyOn(self, 'subscribeCallback').and.callThrough();

      component.select.ngModelChange$.subscribe(self.subscribeCallback);

      /* Act */
      component.select.setNgModel([2]);
      fixture.detectChanges();

      /* Assert */
      expect(spy.ngModelChange$).toHaveBeenCalled();
      expect(result).toEqual([2]);
    }));

    it('setNgModel() invokes writeValue()', inject([ImmutableService], (immutableSvc: ImmutableService) => {
      /* Arrange */
      let result;

      spy.writeValue = spyOn(component.select, 'writeValue').and.callThrough();

      /* Act */
      component.select.setNgModel([2]);
      fixture.detectChanges();

      /* Assert */
      expect(spy.writeValue).toHaveBeenCalled();
      expect(component.select.ngModel).toEqual([2]);
    }));

    it('emits when writeValue() is invoked', inject([ImmutableService], (immutableSvc: ImmutableService) => {
      /* Arrange */
      let result;
      let self = {
        subscribeCallback: (res) => {
          result = res;
        }
      };
      spy.ngModelChange$ = spyOn(self, 'subscribeCallback').and.callThrough();

      component.select.ngModelChange$.subscribe(self.subscribeCallback);

      /* Act */
      component.select.writeValue([2]);
      fixture.detectChanges();

      /* Assert */
      expect(spy.ngModelChange$).toHaveBeenCalled();
      expect(result).toEqual([2]);
    }));

  });

});


@Component({
  template:
  `
<div rdSelect #select="rdSelect" [(ngModel)]="ngModelAry" [multiple]="true" (change)="onChange($event)" rdBlur (blur)="select.open = false">
	<button class="btn" rdSelectToggleBtn [select]="select" rdSelectTitle (title)="setTitle($event)">
		{{title}}
  </button>

	<ul rdSelectDropdown [select]="select">
		<li *ngFor="let unit of units" rdOption #option="rdOption" [select]="select" [title]="unit.address" [value]="unit.id" [class.active]="option.isActive()">{{unit.address}}</li>
	</ul>
</div>
  `
})
export class MockSelectWrapperComponent {
  @ViewChild(SelectDirective) select: SelectDirective;

  ngModelAry: any[];
  title: string = null;
  units: any[] = [{
    id: 1,
    address: '103b'
  }, {
    id: 2,
    address: '204b'
  }, {
    id: 3,
    address: '306c'
  }];

  constructor() { }

  onChange($event) {

  }

  setTitle($event) {
    this.title = $event;
  }
}