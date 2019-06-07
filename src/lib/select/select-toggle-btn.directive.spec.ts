/* tslint:disable:no-unused-variable */
import { Component, ElementRef, Inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

import {
  async, inject
} from '@angular/core/testing';

import { ImmutableService } from '@rd/core';

import { SelectToggleBtnDirective } from './select-toggle-btn.directive';
import { OptionDirective } from './option.directive';
import { SelectModule } from './select.module';

describe('Directive: SelectToggleBtn', () => {
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
    let self = new SelectToggleBtnDirective();
    expect(self).toBeTruthy();
  }));

});
