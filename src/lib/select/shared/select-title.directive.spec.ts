// /* tslint:disable:no-unused-variable */
// import * as Rx from "rxjs";
// import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
// import { TestBed } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';
// import { ComponentFixture } from '@angular/core/testing';
//
// import {
//   async, inject
// } from '@angular/core/testing';
//
// import { ImmutableService } from '@rd/core';
//
// import { SelectTitleDirective } from './select-title.directive';
// import { OptionDirective } from './option.directive';
// import { SelectModule } from '../select.module';
// import { SelectDirective } from '../select.directive';
// import { Select } from '../shared';
//
// let component: MockSelectTitleWrapperComponent;
// let fixture: ComponentFixture<MockSelectTitleWrapperComponent>;
// let debugElem: DebugElement;
// let elem: HTMLElement;
//
// const AGGREGATE_AFTER: number = 2;
//
// xdescribe('Directive: SelectTitle', () => {
//   let select,
//     spy = {
//       setTitle: null
//     };
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         MockSelectTitleWrapperComponent
//       ],
//       imports: [
//         SelectModule
//       ],
//       // Provide a test-double instead
//       providers: [
//         { provide: ElementRef, useValue: {} }
//       ]
//     });
//
//     fixture = TestBed.createComponent(MockSelectTitleWrapperComponent);
//     component = fixture.componentInstance;
//   });
//
//   it('should create an instance', inject([ImmutableService], (immutable: ImmutableService) => {
//     expect(component).toBeTruthy();
//     expect(component.select).toBeTruthy();
//     expect(component.selectTitle).toBeTruthy();
//   }));
//
//   describe('optionChange$', () => {
//
//     beforeEach(() => {
//       fixture.detectChanges();
//     });
//
//     it('SelectTitleDirective emits correct title when options are emitted (deferred)', inject([ImmutableService], (immutableSvc: ImmutableService) => {
//       /* Arrange */
//       let result;
//       component.select.writeValue([999]);
//       fixture.detectChanges();
//
//       /* Act */
//       spy.setTitle = spyOn(component, 'setTitle').and.callThrough();
//       component.units.push({
//         id: 999,
//         address: '999z'
//       });
//       fixture.detectChanges();
//
//       /* Assert */
//       expect(spy.setTitle).toHaveBeenCalled();
//       expect(component.title).toBe('999z');
//     }));
//
//   });
//
//   describe('ngModelChange$', () => {
//
//     beforeEach(() => {
//       fixture.detectChanges();
//     });
//
//     it('SelectTitleDirective emits correct title on initialization (one selected)', inject([ImmutableService], (immutableSvc: ImmutableService) => {
//       /* Arrange */
//       let result;
//       spy.setTitle = spyOn(component, 'setTitle').and.callThrough();
//
//       /* Act */
//       component.select.writeValue([2]);
//       fixture.detectChanges();
//
//       /* Assert */
//       expect(spy.setTitle).toHaveBeenCalled();
//       expect(component.title).toBe('204b');
//     }));
//
//     it('SelectTitleDirective emits correct title on initialization (two selected)', inject([ImmutableService], (immutableSvc: ImmutableService) => {
//       /* Arrange */
//       let result;
//       spy.setTitle = spyOn(component, 'setTitle').and.callThrough();
//
//       /* Act */
//       component.select.writeValue([2, 3]);
//       fixture.detectChanges();
//
//       /* Assert */
//       expect(spy.setTitle).toHaveBeenCalled();
//       expect(component.title).toBe('204b, 306c');
//     }));
//
//     it('SelectTitleDirective emits aggregate title on initialization (three selected)', inject([ImmutableService], (immutableSvc: ImmutableService) => {
//       /* Arrange */
//       let result;
//       spy.setTitle = spyOn(component, 'setTitle').and.callThrough();
//
//       /* Act */
//       component.select.writeValue([1, 2, 3]);
//       fixture.detectChanges();
//
//       /* Assert */
//       expect(spy.setTitle).toHaveBeenCalled();
//       expect(component.title).toBe('3 selected');
//     }));
//
//   });
//
// });
//
//
// @Component({
//   template:
//   `
// <div rdSelect #select="rdSelect" [(ngModel)]="ngModelAry" [multiple]="true" rdBlur (blur)="select.open = false">
// 	<button class="btn" rdSelectToggleBtn [select]="select" rdSelectTitle [aggregateAfter]="AGGREGATE_AFTER" (title)="setTitle($event)">
// 		{{title}}
//   </button>
//
// 	<ul rdSelectDropdown [select]="select">
// 		<li *ngFor="let unit of units" rdOption #option="rdOption" [select]="select" [title]="unit.address" [value]="unit.id" [class.active]="option.isActive()">{{unit.address}}</li>
// 	</ul>
// </div>
//   `
// })
// export class MockSelectTitleWrapperComponent {
//   @ViewChild(SelectDirective) select: SelectDirective;
//   @ViewChild(SelectTitleDirective) selectTitle: SelectTitleDirective;
//
//   AGGREGATE_AFTER = AGGREGATE_AFTER;
//   ngModelAry: any[];
//   title: string = null;
//   units: any[] = [{
//     id: 1,
//     address: '103b'
//   }, {
//     id: 2,
//     address: '204b'
//   }, {
//     id: 3,
//     address: '306c'
//   }];
//
//   constructor() {
//
//   }
//
//   setTitle($event) {
//     this.title = $event;
//   }
// }
