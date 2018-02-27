import {
    trigger,
    state,
    style,
    transition,
    animate,
    AnimationEntryMetadata
} from '@angular/core';

export const KENDO_DROPDOWN_ANIMATION: AnimationEntryMetadata = trigger('kendoDropdownAnimation', [
    transition(':leave', [
        style({
            "transform": "translateY(0px)",
        }),
        animate(100, style({
            "transform": "translateY(-200px)",
        }))
    ]),
    transition(':enter', [
        style({
            "transform": "translateY(-200px)",
        }),
        animate(100, style({
            "transform": "translateY(0px)",
        }))
    ])
])