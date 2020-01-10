import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatProgressBarModule } from '@angular/material/progress-bar';

import { TimelineComponent } from './timeline.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    declarations: [
        TimelineComponent
    ],
    exports: [
        TimelineComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        MatProgressBarModule,
        MatTooltipModule
    ]
})
export class TimeLineModule {}
