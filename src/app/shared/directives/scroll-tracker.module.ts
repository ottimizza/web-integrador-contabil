import { NgModule } from '@angular/core';
import { ScrollTrackerDirective } from './scroll-tracker.directive';

@NgModule({
  declarations: [ScrollTrackerDirective],
  exports: [ScrollTrackerDirective]
})
export class ScrollTrackerModule { }
