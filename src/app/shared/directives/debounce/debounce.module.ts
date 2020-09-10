import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DebounceDirective } from './debounce.directive';

@NgModule({
  declarations: [DebounceDirective],
  imports: [CommonModule],
  exports: [DebounceDirective]
})
export class DebounceDirectiveModule {}
