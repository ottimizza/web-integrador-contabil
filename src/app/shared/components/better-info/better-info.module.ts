import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '../icon/icon.module';
import { BetterInfoComponent } from './better-info.component';

@NgModule({
  declarations: [BetterInfoComponent],
  imports: [CommonModule, IconModule],
  exports: [BetterInfoComponent]
})
export class BetterInfoModule {}
