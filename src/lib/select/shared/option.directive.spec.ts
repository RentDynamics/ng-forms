/* tslint:disable:no-unused-variable */
import { ElementRef, Inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

import {
  async, inject
} from '@angular/core/testing';

import { ImmutableService } from '../../../core';

import { OptionDirective } from './option.directive';
import { SelectModule } from '../select.module';
import { SelectDirective } from '../select.directive';

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

  it('should create an instance', inject([ImmutableService], (immutable: ImmutableService) => {
    let self = new OptionDirective(immutable);
    expect(self).toBeTruthy();
  }));

  describe('numeric ngModel', () => {

    beforeEach(inject([], () => {
      select = new SelectDirective();
    }));

    it('isActive() resolves truthy when option.value is in selector.ngModel array', inject([ImmutableService], (immutableSvc: ImmutableService) => {
      /* Arrange */
      let result;
      let self = new OptionDirective(immutableSvc);

      self.select = select;
      self.select.multiple = true;
      self.value = 1;
      self.select.addOption(self);
      self.select.setNgModel([1, 2, 3, 4]);

      /* Act */
      result = self.isActive();

      /* Assert */
      expect(result).toBeTruthy();
      expect(select.options.length).toBe(1);
    }));

    it('isActive() resolves falsy when option.value is NOT in selector.ngModel array', inject([ImmutableService], (immutableSvc: ImmutableService) => {
      /* Arrange */
      let result;
      let self = new OptionDirective(immutableSvc);

      self.select = select;
      self.select.multiple = true;
      self.value = 240;
      self.select.addOption(self);
      self.select.setNgModel([1, 2, 3, 4]);

      /* Act */
      result = self.isActive();

      /* Assert */
      expect(result).toBeFalsy();
      expect(select.options.length).toBe(1);
    }));

    it('setActive() splices existing value from selector.ngModel array', inject([ImmutableService], (immutableSvc: ImmutableService) => {
      /* Arrange */
      let result;
      let self = new OptionDirective(immutableSvc);

      self.select = select;
      self.select.multiple = true;
      self.value = 1;
      self.select.addOption(self);
      self.select.setNgModel([1, 2, 3, 4]);

      /* Act */
      self.setActive();
      result = self.select.ngModel;

      /* Assert */
      expect(result.length).toBe(3);
      expect(result).toEqual([2, 3, 4]);
    }));

  });

  describe('object ngModel', () => {

    beforeEach(() => {
      select = new SelectDirective();
    });

    it('isActive() resolves truthy when option.value is in selector.ngModel array', inject([ImmutableService], (immutableSvc: ImmutableService) => {
      /* Arrange */
      let result;
      let self = new OptionDirective(immutableSvc);

      self.select = select;
      self.select.multiple = true;
      self.value = { id: 1 };
      self.select.addOption(self);
      self.select.setNgModel([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);

      /* Act */
      result = self.isActive();

      /* Assert */
      expect(result).toBeTruthy();
      expect(select.options.length).toBe(1);
    }));

    it('isActive() resolves falsy when option.value is NOT in selector.ngModel array', inject([ImmutableService], (immutableSvc: ImmutableService) => {
      /* Arrange */
      let result;
      let self = new OptionDirective(immutableSvc);

      self.select = select;
      self.select.multiple = true;
      self.value = { id: 432 };
      self.select.addOption(self);
      self.select.setNgModel([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);

      /* Act */
      result = self.isActive();

      /* Assert */
      expect(result).toBeFalsy();
      expect(select.options.length).toBe(1);
    }));

    it('setActive() splices existing value from selector.ngModel array', inject([ImmutableService], (immutableSvc: ImmutableService) => {
      /* Arrange */
      let result;
      let self = new OptionDirective(immutableSvc);

      self.select = select;
      self.select.multiple = true;
      self.value = { id: 1 };
      self.select.addOption(self);
      self.select.setNgModel([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);

      /* Act */
      self.setActive();
      result = self.select.ngModel;

      /* Assert */
      expect(result.length).toBe(3);
      expect(result).toEqual([{ id: 2 }, { id: 3 }, { id: 4 }]);
    }));

  });
});