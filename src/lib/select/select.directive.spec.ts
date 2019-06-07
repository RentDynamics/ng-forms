/* tslint:disable:no-unused-variable */
import { Component, ElementRef, Inject, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

import {
  async, inject
} from '@angular/core/testing';

import { ImmutableService } from '@rd/core';

import { SelectModule } from './select.module';
import { SelectDirective } from './select.directive';
import { SelectToggleBtnDirective } from './select-toggle-btn.directive';
import { OptionDirective } from './option.directive';

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

  it('when hasOption() is invoked with option which already exists, should return truthy',
    inject([ImmutableService], (immutable: ImmutableService) => {
      expect(component.select.hasOption(component.options.first)).toBeTruthy();
    }));

  it('when hasOption() is invoked with new OptionDirective, should return falsy',
    inject([ImmutableService], (immutable: ImmutableService) => {
      expect(component.select.hasOption(new OptionDirective(immutable))).toBeFalsy();
    }));

  describe('change()', () => {

    beforeEach(() => {
      fixture.detectChanges();
    });

    it('when setNgModel() is invoked should invoke onChange() method', inject([ImmutableService], (immutableSvc: ImmutableService) => {
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
      expect(result).toEqual([{
        id: 2,
        address: '204b'
      }]);
    }));

    it('when value is written from an external event should NOT invoke onChange() method',
      inject([ImmutableService], (immutableSvc: ImmutableService) => {
        /* Arrange */
        let result;
        spy.change = spyOn(component, 'onChange').and.callFake((newVal) => {
          result = newVal;
        });

        /* Act */
        component.select.writeValue([{
          id: 2,
          address: '204b'
        }]);
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

    it('should be defined', inject([], () => {
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
      component.select.setNgModel([{
        id: 2,
        address: '204b'
      }]);
      fixture.detectChanges();

      /* Assert */
      expect(spy.ngModelChange$).toHaveBeenCalled();
      expect(result).toEqual([{
        id: 2,
        address: '204b'
      }]);
    }));

    it('setNgModel() invokes writeValue()', inject([ImmutableService], (immutableSvc: ImmutableService) => {
      /* Arrange */
      let result;

      spy.writeValue = spyOn(component.select, 'writeValue').and.callThrough();

      /* Act */
      component.select.setNgModel([{
        id: 2,
        address: '204b'
      }]);
      fixture.detectChanges();

      /* Assert */
      expect(spy.writeValue).toHaveBeenCalled();
      expect(component.select.ngModel).toEqual([{
        id: 2,
        address: '204b'
      }]);
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
      component.select.writeValue([{
        id: 2,
        address: '204b'
      }]);
      fixture.detectChanges();

      /* Assert */
      expect(spy.ngModelChange$).toHaveBeenCalled();
      expect(result).toEqual([{
        id: 2,
        address: '204b'
      }]);
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
		<li *ngFor="let unit of units" rdOption #option="rdOption" [select]="select" [title]="unit.address" [value]="unit" [class.active]="option.isActive()">{{unit.address}}</li>
	</ul>
</div>
  `
})
export class MockSelectWrapperComponent {
  @ViewChild(SelectDirective) select: SelectDirective;
  @ViewChildren(OptionDirective) options: QueryList<OptionDirective>;

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
