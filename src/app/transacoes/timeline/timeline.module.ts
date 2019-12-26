import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline.component';
import { RouterModule } from '@angular/router';
import { TimelineItemComponent } from './timeline-item/timeline-item.component';
import { FormsModule } from '@angular/forms';

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
        FormsModule
    ]
})
export class TimeLineModule {}
