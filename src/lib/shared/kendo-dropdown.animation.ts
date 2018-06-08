import {
    trigger,
    state,
    style,
    transition,
    animate,
    AnimationTriggerMetadata
} from '@angular/animations';

export const KENDO_DROPDOWN_ANIMATION: AnimationTriggerMetadata = trigger('kendoDropdownAnimation', [
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