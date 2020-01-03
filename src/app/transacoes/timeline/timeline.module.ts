import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline.component';
import { RouterModule } from '@angular/router';
import { TimelineItemComponent } from './timeline-item/timeline-item.component';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
    declarations: [
        TimelineComponent,
        TimelineItemComponent
    ],
    exports: [
        TimelineComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        MatProgressBarModule
    ]
})
export class TimeLineModule {}
