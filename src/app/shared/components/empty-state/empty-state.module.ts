import { NgModule } from '@angular/core';
import { EmptyStateComponent } from './empty-state.component';
import { CommonModule } from '@angular/common';
import { IconModule } from '../icon/icon.module';
import { TitleModule } from '../title/title.module';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [EmptyStateComponent],
  imports: [
    CommonModule,
    IconModule,
    TitleModule,
  ],
  exports: [EmptyStateComponent]
})
export class EmptyStateModule {}
