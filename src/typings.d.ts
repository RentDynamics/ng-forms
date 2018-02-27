// Typings reference file, see links for more information
// https://github.com/typings/typings
// https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html

declare var System: any;

interface JQuery {
    pickmeup(options?: {});
    pickmeup(eventName: string, value?: any);
    fullCalendar(options?: any);
    // datepicker(eventName: string, value?: any);
    // datetimepicker(eventName: string, value?: any);
    // datetimepicker(options?: {});
}

interface HTMLElement {
    getContext(dimension: string): any;
}
