import { NgModule } from '@angular/core';
import { FieldSetComponent } from './fieldset.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [FieldSetComponent],
  imports: [CommonModule],
  exports: [FieldSetComponent]
})
export class FieldSetModule {}
