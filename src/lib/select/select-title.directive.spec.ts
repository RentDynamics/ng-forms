/* tslint:disable:no-unused-variable */
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

import {
    async, inject
} from '@angular/core/testing';

import { ImmutableService, equals } from '@rd/core';

import { SelectModule } from './select.module';
import { SelectDirective } from './select.directive';
import { SelectToggleBtnDirective } from './select-toggle-btn.directive';
import { OptionDirective } from './option.directive';
import { SelectTitleDirective } from '.';

let component: MockSelectWrapperComponent;
let fixture: ComponentFixture<MockSelectWrapperComponent>;
let toggleBtn: DebugElement;
let options: DebugElement[];
let elem: HTMLElement;

describe('Directive: SelectTitle', () => {
    let select,
        spy = {
            change: null,
            ngModelChange$: null,
            optionChange$: null,
            selectTitle: {
                setTitle: null,
                getTitleMultiple: null,
                getTitle: null,
                isEqual: null
            },
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

    it('should create a SelectTitleDirective instance', inject([ImmutableService], (immutable: ImmutableService) => {
        expect(component.selectTitle).toBeTruthy();
    }));

    describe('object multiselect', () => {

        it('should set title to "204b" when select.writeValue() is invoked with "204b" object',
            inject([ImmutableService], (immutableSvc: ImmutableService) => {
                /* Arrange */
                let result;
                let self = {
                    subscribeCallback: (res) => {
                        result = res;
                    }
                };
                spy.ngModelChange$ = spyOn(self, 'subscribeCallback').and.callThrough();
                spy.selectTitle.setTitle = spyOn(component.selectTitle, 'setTitle').and.callThrough();
                spy.selectTitle.getTitleMultiple = spyOn(component.selectTitle, 'getTitleMultiple').and.callThrough();
                spy.selectTitle.getTitle = spyOn(component.selectTitle, 'getTitle').and.callThrough();

                component.select.ngModelChange$.subscribe(self.subscribeCallback);

                /* Act */
                component.select.writeValue([{
                    id: 2,
                    address: '204b'
                }]);
                fixture.detectChanges();

                /* Assert */
                expect(spy.ngModelChange$).toHaveBeenCalled();
                expect(spy.selectTitle.setTitle).toHaveBeenCalled();
                expect(spy.selectTitle.getTitleMultiple).toHaveBeenCalled();
                expect(spy.selectTitle.getTitle).not.toHaveBeenCalled();
                expect(component.title).toEqual('204b');
            }));

        it('should set title to "103a, 204b" when select.writeValue() is invoked with "103a, 204b" objects',
            inject([ImmutableService], (immutableSvc: ImmutableService) => {
                /* Arrange */
                let result;
                let self = {
                    subscribeCallback: (res) => {
                        result = res;
                    }
                };
                spy.ngModelChange$ = spyOn(self, 'subscribeCallback').and.callThrough();
                spy.selectTitle.setTitle = spyOn(component.selectTitle, 'setTitle').and.callThrough();
                spy.selectTitle.getTitleMultiple = spyOn(component.selectTitle, 'getTitleMultiple').and.callThrough();
                spy.selectTitle.getTitle = spyOn(component.selectTitle, 'getTitle').and.callThrough();

                component.select.ngModelChange$.subscribe(self.subscribeCallback);

                /* Act */
                component.select.writeValue([
                    {
                        id: 1,
                        address: '103a'
                    }, {
                        id: 2,
                        address: '204b'
                    }]);
                fixture.detectChanges();

                /* Assert */
                expect(spy.ngModelChange$).toHaveBeenCalled();
                expect(spy.selectTitle.setTitle).toHaveBeenCalled();
                expect(spy.selectTitle.getTitleMultiple).toHaveBeenCalled();
                expect(spy.selectTitle.getTitle).not.toHaveBeenCalled();
                expect(component.title).toEqual('103a, 204b');
            }));

        it('should set title to "103a, 204b" when select.writeValue() is initially invoked with "103a, 204b, 306c"' +
            ' objects then third option is clicked',
            inject([ImmutableService], (immutableSvc: ImmutableService) => {
                /* Arrange */
                let result;
                let self = {
                    subscribeCallback: (res) => {
                        result = res;
                    }
                };
                spy.ngModelChange$ = spyOn(self, 'subscribeCallback').and.callThrough();
                spy.selectTitle.setTitle = spyOn(component.selectTitle, 'setTitle').and.callThrough();
                spy.selectTitle.getTitleMultiple = spyOn(component.selectTitle, 'getTitleMultiple').and.callThrough();
                spy.selectTitle.getTitle = spyOn(component.selectTitle, 'getTitle').and.callThrough();

                component.select.ngModelChange$.subscribe(self.subscribeCallback);

                /* Act */
                component.select.writeValue([
                    {
                        id: 1,
                        address: '103a'
                    }, {
                        id: 2,
                        address: '204b'
                    }, {
                        id: 3,
                        address: '306c'
                    }]);
                fixture.detectChanges();
                /* Act */
                component.select.options.find(o => equals(o.value, {
                    id: 3,
                    address: '306c'
                })).setActive();
                fixture.detectChanges();

                /* Assert */
                expect(spy.ngModelChange$).toHaveBeenCalled();
                expect(spy.selectTitle.setTitle).toHaveBeenCalled();
                expect(spy.selectTitle.getTitleMultiple).toHaveBeenCalled();
                expect(spy.selectTitle.getTitle).not.toHaveBeenCalled();
                expect(component.title).toEqual('103a, 204b');
            }));

        it('should set title to "3 selected" when select.writeValue() is invoked with "103a, 204b, 306c" objects',
            inject([ImmutableService], (immutableSvc: ImmutableService) => {
                /* Arrange */
                let result;
                let self = {
                    subscribeCallback: (res) => {
                        result = res;
                    }
                };
                spy.ngModelChange$ = spyOn(self, 'subscribeCallback').and.callThrough();
                spy.selectTitle.setTitle = spyOn(component.selectTitle, 'setTitle').and.callThrough();
                spy.selectTitle.getTitleMultiple = spyOn(component.selectTitle, 'getTitleMultiple').and.callThrough();
                spy.selectTitle.getTitle = spyOn(component.selectTitle, 'getTitle').and.callThrough();

                component.select.ngModelChange$.subscribe(self.subscribeCallback);

                /* Act */
                component.select.writeValue([
                    {
                        id: 1,
                        address: '103a'
                    }, {
                        id: 2,
                        address: '204b'
                    }, {
                        id: 3,
                        address: '306c'
                    }]);
                fixture.detectChanges();

                /* Assert */
                expect(spy.ngModelChange$).toHaveBeenCalled();
                expect(spy.selectTitle.setTitle).toHaveBeenCalled();
                expect(spy.selectTitle.getTitleMultiple).toHaveBeenCalled();
                expect(spy.selectTitle.getTitle).not.toHaveBeenCalled();
                expect(component.title).toEqual('3 selected');
            }));

    });

    describe('object singleselect', () => {

        beforeEach(() => {
            component.select.multiple = false;
        });

        it('should set title to "204b" when select.writeValue() is invoked with "204b" object',
            inject([ImmutableService], (immutableSvc: ImmutableService) => {
                /* Arrange */
                let result;
                let self = {
                    subscribeCallback: (res) => {
                        result = res;
                    }
                };
                spy.ngModelChange$ = spyOn(self, 'subscribeCallback').and.callThrough();
                spy.selectTitle.setTitle = spyOn(component.selectTitle, 'setTitle').and.callThrough();
                spy.selectTitle.getTitleMultiple = spyOn(component.selectTitle, 'getTitleMultiple').and.callThrough();
                spy.selectTitle.getTitle = spyOn(component.selectTitle, 'getTitle').and.callThrough();

                component.select.ngModelChange$.subscribe(self.subscribeCallback);

                /* Act */
                component.select.writeValue({
                    id: 2,
                    address: '204b'
                });
                fixture.detectChanges();

                /* Assert */
                expect(spy.ngModelChange$).toHaveBeenCalled();
                expect(spy.selectTitle.setTitle).toHaveBeenCalled();
                expect(spy.selectTitle.getTitleMultiple).not.toHaveBeenCalled();
                expect(spy.selectTitle.getTitle).toHaveBeenCalled();
                expect(component.title).toEqual('204b');
            }));

        it('should set title to "103a" when select.writeValue() is invoked with "204b" object then subsequently invoked with "103a" object',
            inject([ImmutableService], (immutableSvc: ImmutableService) => {
                /* Arrange */
                let result;
                let self = {
                    subscribeCallback: (res) => {
                        result = res;
                    }
                };
                spy.ngModelChange$ = spyOn(self, 'subscribeCallback').and.callThrough();
                spy.selectTitle.setTitle = spyOn(component.selectTitle, 'setTitle').and.callThrough();
                spy.selectTitle.getTitleMultiple = spyOn(component.selectTitle, 'getTitleMultiple').and.callThrough();
                spy.selectTitle.getTitle = spyOn(component.selectTitle, 'getTitle').and.callThrough();

                component.select.ngModelChange$.subscribe(self.subscribeCallback);

                /* Act */
                component.select.writeValue({
                    id: 2,
                    address: '204b'
                });
                fixture.detectChanges();
                /* Act */
                component.select.writeValue({
                    id: 1,
                    address: '103a'
                });
                fixture.detectChanges();


                /* Assert */
                expect(spy.ngModelChange$).toHaveBeenCalled();
                expect(spy.selectTitle.setTitle).toHaveBeenCalled();
                expect(spy.selectTitle.getTitleMultiple).not.toHaveBeenCalled();
                expect(spy.selectTitle.getTitle).toHaveBeenCalled();
                expect(component.title).toEqual('103a');
            }));

    });

});


@Component({
    template:
        `
<div rdSelect #select="rdSelect" [(ngModel)]="ngModelAry" [multiple]="true" (change)="onChange($event)" rdBlur (blur)="select.open = false">
	<button class="btn" rdSelectToggleBtn rdSelectTitle [select]="select" (title)="setTitle($event)">
		{{title}}
  </button>

	<ul rdSelectDropdown [select]="select">
        <li *ngFor="let unit of units" rdOption #option="rdOption" [select]="select" 
            [title]="unit.address" [value]="unit" [class.active]="option.isActive()">{{unit.address}}</li>
	</ul>
</div>
  `
})
export class MockSelectWrapperComponent {
    @ViewChild(SelectDirective) select: SelectDirective;
    @ViewChild(SelectTitleDirective) selectTitle: SelectTitleDirective;

    ngModelAry: any[] = [];
    title: string = null;
    units: any[] = [{
        id: 1,
        address: '103a'
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
