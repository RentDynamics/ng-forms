import {Component, EventEmitter, Input, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
	selector: 'rd-bootstrap-filter',
	templateUrl: './bootstrap-filter.component.html',
})
export class BootstrapFilterComponent implements OnInit {
	@Input() list: any[] = [];
	@Input() filterBy: string;
	@Output() updateList: EventEmitter<any> = new EventEmitter<any>();

	constructor() {
	}

	ngOnInit(): void {
		this.updateList.emit({ array: this.list.slice()});
	}

	ngOnChanges(change: SimpleChanges){
		let listChange: SimpleChange = change['list'];
		if (listChange && listChange.currentValue !== listChange.previousValue){
			this.updateList.emit({ array: this.list.slice() });
		}
	}

	filter(filterString: string): void {
		if (filterString)
			this.updateList.emit({ array: this.list.filter(x => x[this.filterBy].toLowerCase().indexOf(filterString.toLowerCase()) !== -1) });
		else
			this.updateList.emit({ array: this.list.slice() });
	}

	preventDefault(event: Event) {
		event.preventDefault();
		event.stopPropagation();
	}
}