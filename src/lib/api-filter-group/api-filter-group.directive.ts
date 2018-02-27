import {
  Directive, Input, ChangeDetectorRef, ContentChildren, Output, EventEmitter, Query, QueryList,
  OnChanges, SimpleChange, SimpleChanges
} from '@angular/core';

import { CoreApiSelectorFilter } from '@rd/core';
import { ApiFilterDirective } from './api-filter.directive';

@Directive({
  selector: '[rdApiFilterGroup]'
})
export class ApiFilterGroupDirective {
  @Input() filters: CoreApiSelectorFilter = {};
  @Output() filtersChange = new EventEmitter<CoreApiSelectorFilter>();
  @ContentChildren(ApiFilterDirective) filterDirectives: QueryList<ApiFilterDirective> =
  new QueryList<ApiFilterDirective>();

  constructor() {
    this.filterDirectives.changes.subscribe((value: ApiFilterDirective[]) =>
      console.log('filter directives changed', value)
    );
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    let filtersChange = changes['filters'];
  }

  ngAfterContentInit() {
    let self = this;
    
    this.filterDirectives.forEach((directive) => {
      // directive
      directive.change.subscribe((result) => {
        let newFilters = self.filters;
        newFilters[directive.name] = result;
        this.filtersChange.emit(newFilters);
        console.log('filter directive change', directive); 
        //this.changeDetectorRef.detectChanges();
      });
    });
  }
}
