/* tslint:disable:no-unused-variable */
import { Component, ElementRef, Inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

import {
  async, inject
} from '@angular/core/testing';

import { ImmutableService } from '../../../core';

import { SelectDropdownDirective } from './select-dropdown.directive';
import { OptionDirective } from './option.directive';
import { SelectModule } from '../select.module';
import { SelectDirective } from '../select.directive';

@Component({
  template:
  `
<div rdSelect #select="rdSelect" [(ngModel)]="ngModelAry" [multiple]="true" rdBlur (blur)="select.open = false">
	<button class="btn" rdSelectToggleBtn [select]="select" rdSelectDropdown (dropdown)="dropdown = $event">
		{{dropdown}}
  </button>

	<ul rdSelectDropdown [select]="select">
		<li *ngFor="let unit of units" rdOption #option="rdOption" [select]="select" [dropdown]="unit.address" [value]="unit.id" [class.active]="option.isActive()">{{unit.address}}</li>
	</ul>
</div>
  `
})
export class MockSelectDropdownComponent {

}

describe('Directive: SelectDropdown', () => {
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
    });//.compileComponents();
  });

  it('should create an instance', inject([ImmutableService], (immutable: ImmutableService) => {
    let self = new SelectDropdownDirective();
    expect(self).toBeTruthy();
  }));

});