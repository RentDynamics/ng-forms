// Typings reference file, see links for more information
// https://github.com/typings/typings
// https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html

declare var System: any;
// declare var module: any;

interface HTMLElement {
    getContext(dimension: string): any;
    pickmeup(options?: {});
    pickmeup(eventName: string, value?: any);
}

interface JQuery {
    pickmeup(options?: {});
    pickmeup(eventName: string, value?: any);
    fullCalendar(options?: any);

    HTMLElement: HTMLElement

    // datepicker(eventName: string, value?: any);
    // datetimepicker(eventName: string, value?: any);
    // datetimepicker(options?: {});
}

// interface JQuery<HTMLElement> {
//         getContext(dimension: string): any;
//         pickmeup(options?: {});
//         pickmeup(eventName: string, value?: any);
// }

