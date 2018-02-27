export interface Option {
    title: string;
    value: any;
    hidden?: boolean;
    click?(): void;
    isActive?(): boolean;
    setActive?(): void;
}