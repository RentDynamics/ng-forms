import {
  AfterViewInit,
  Component,
  ContentChildren,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  Provider,
  Query,
  QueryList,
  OnInit,
  HostBinding,
  Input,
  Optional,
  Output,
  Inject,
  AfterContentInit,
  ContentChild,
  ViewChildren,
  ViewChild,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';

import { extend } from '@rd/core';
import { NgModelInput, NgModelInputValueAccessor } from '../ng-model-input';

@Directive({
  selector: 'rd-text-editor, [rd-text-editor]',
  providers: [new NgModelInputValueAccessor(TextEditorDirective)]
})
export class TextEditorDirective extends NgModelInput implements OnInit, AfterViewInit, OnDestroy {
  @Input() ngModel: string = null;
  @Input() options: {} = {};
  @Output() key: EventEmitter<string> = new EventEmitter<string>();
  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  @HostBinding('contentEditable') @Input() inline: boolean = false;

  editor: CKEDITOR.editor;
  elem: HTMLTextAreaElement;

  /* todo: wire up onNgModelTouched() */
  constructor(private changeDetectorRef: ChangeDetectorRef, elementRef: ElementRef) {
    super();
    this.elem = elementRef.nativeElement;
  }

  ngOnInit() {
    CKEDITOR.disableAutoInline = true;
  }

  ngAfterViewInit() {
    this.editor = this.inline ? this.initInlineEditor() : this.initClassicEditor();
    //Updates the <textarea> element that was replaced by the editor with the current data available in the editor.
    this.editor.setData(this.ngModel);
    this.subscribeToChangeEvent();
  }

  initInlineEditor(): CKEDITOR.editor {
    return CKEDITOR.inline(this.elem, this.options);
  }

  initClassicEditor(): CKEDITOR.editor {
    return CKEDITOR.replace(this.elem, this.options);
  }

  subscribeToChangeEvent() {
    this.editor.on('change', () => {
      let newVal = this.editor.getData();
      this.onNgModelChanged(newVal);
      this.change.emit(newVal);
      //this.changeDetectorRef.markForCheck();
    });
  }

  subscribeToKeyEvent() {
    this.editor.on('key', () => {
      let newVal = this.editor.getData();
      this.onNgModelChanged(newVal);
      this.key.emit(newVal);
      //this.changeDetectorRef.markForCheck();
    });
  }

  /* Override writeValue() of NgModelInput class */
  writeValue(newVal: any) {
    super.writeValue(newVal);
    if (this.editor)
      this.editor.setData(newVal);
  }

  ngOnDestroy() {
    if (this.editor) {
      this.editor.removeAllListeners();
      //this.editor.destroy();
    }
  }
}
