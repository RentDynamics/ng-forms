import { Query } from '@angular/core';
import { ApiFilterDirective } from './api-filter.directive';

export class ApiFilterQuery implements Query {
    descendants = true;
    first = false;
    read = ApiFilterDirective;
    isViewQuery = false;
    selector = '[rdApiFilterStatic]';
}

// export interface Query {
//     descendants: boolean;
//     first: boolean;
//     read: any;
//     isViewQuery: boolean;
//     selector: any;
// }