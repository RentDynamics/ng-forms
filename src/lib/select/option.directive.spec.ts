/* tslint:disable:no-unused-variable */
import { ElementRef, Inject, EventEmitter } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

import {
  async, inject
} from '@angular/core/testing';

import { ImmutableService } from '@rd/core';

import { OptionDirective } from './option.directive';
import { SelectModule } from './select.module';
import { SelectDirective } from './select.directive';


describe('Directive: Option', () => {
  let select;
  // simple style
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        SelectModule
      ],
      // Provide a test-double instead
      providers: [
        { provide: ElementRef, useValue: {} }
      ]
    });
  });

  describe('options', () => {

    beforeEach(inject([], () => {
      select = new SelectDirective();
    }));

    it('when option directive is destoyed should not invoke removeOption on SelectDirective',
      inject([ImmutableService], (immutableSvc: ImmutableService) => {
        /* Arrange */
        let result;
        let optionDirective = new OptionDirective(immutableSvc);

        optionDirective.select = select;
        optionDirective.select.multiple = true;
        optionDirective.value = 1;
        optionDirective.select.addOption(optionDirective);
        optionDirective.select.setNgModel([1, 2, 3, 4]);

        /* Act */
        optionDirective.ngOnDestroy();

        /* Assert */
        expect(select.options.length).toBe(1);
      }));

  });

  describe('numeric ngModel', () => {

    beforeEach(inject([], () => {
      select = new SelectDirective();
    }));

    it('isActive() resolves truthy when option.value is in selector.ngModel array',
      inject([ImmutableService], (immutableSvc: ImmutableService) => {
        /* Arrange */
        let result;
        let optionDirective = new OptionDirective(immutableSvc);

        optionDirective.select = select;
        optionDirective.select.multiple = true;
        optionDirective.value = 1;
        optionDirective.select.addOption(optionDirective);
        optionDirective.select.setNgModel([1, 2, 3, 4]);

        /* Act */
        result = optionDirective.isActive();

        /* Assert */
        expect(result).toBeTruthy();
        expect(select.options.length).toBe(1);
      }));

    it('isActive() resolves falsy when option.value is NOT in selector.ngModel array',
      inject([ImmutableService], (immutableSvc: ImmutableService) => {
        /* Arrange */
        let result;
        let optionDirective = new OptionDirective(immutableSvc);

        optionDirective.select = select;
        optionDirective.select.multiple = true;
        optionDirective.value = 240;
        optionDirective.select.addOption(optionDirective);
        optionDirective.select.setNgModel([1, 2, 3, 4]);

        /* Act */
        result = optionDirective.isActive();

        /* Assert */
        expect(result).toBeFalsy();
        expect(select.options.length).toBe(1);
      }));

    it('setActive() splices existing value from selector.ngModel array',
      inject([ImmutableService], (immutableSvc: ImmutableService) => {
        /* Arrange */
        let result;
        let optionDirective = new OptionDirective(immutableSvc);

        optionDirective.select = select;
        optionDirective.select.multiple = true;
        optionDirective.value = 1;
        optionDirective.select.addOption(optionDirective);
        optionDirective.select.setNgModel([1, 2, 3, 4]);

        /* Act */
        optionDirective.setActive();
        result = optionDirective.select.ngModel;

        /* Assert */
        expect(result.length).toBe(3);
        expect(result).toEqual([2, 3, 4]);
      }));

  });

  describe('object ngModel', () => {

    beforeEach(() => {
      select = new SelectDirective();
    });

    it('isActive() resolves truthy when option.value is in selector.ngModel array',
      inject([ImmutableService], (immutableSvc: ImmutableService) => {
        /* Arrange */
        let result;
        let optionDirective = new OptionDirective(immutableSvc);

        optionDirective.select = select;
        optionDirective.select.multiple = true;
        optionDirective.value = { id: 1 };
        optionDirective.select.addOption(optionDirective);
        optionDirective.select.setNgModel([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);

        /* Act */
        result = optionDirective.isActive();

        /* Assert */
        expect(result).toBeTruthy();
        expect(select.options.length).toBe(1);
      }));

    it('isActive() resolves falsy when option.value is NOT in selector.ngModel array',
      inject([ImmutableService], (immutableSvc: ImmutableService) => {
        /* Arrange */
        let result;
        let optionDirective = new OptionDirective(immutableSvc);

        optionDirective.select = select;
        optionDirective.select.multiple = true;
        optionDirective.value = { id: 432 };
        optionDirective.select.addOption(optionDirective);
        optionDirective.select.setNgModel([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);

        /* Act */
        result = optionDirective.isActive();

        /* Assert */
        expect(result).toBeFalsy();
        expect(select.options.length).toBe(1);
      }));

    it('setActive() splices existing value from selector.ngModel array',
      inject([ImmutableService], (immutableSvc: ImmutableService) => {
        /* Arrange */
        let result;
        let optionDirective = new OptionDirective(immutableSvc);

        optionDirective.select = select;
        optionDirective.select.multiple = true;
        optionDirective.value = { id: 1 };
        optionDirective.select.addOption(optionDirective);
        optionDirective.select.setNgModel([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);

        /* Act */
        optionDirective.setActive();
        result = optionDirective.select.ngModel;

        /* Assert */
        expect(result.length).toBe(3);
        expect(result).toEqual([{ id: 2 }, { id: 3 }, { id: 4 }]);
      }));

  });
});
