import { NgModule } from '@angular/core';
import { CardComponent } from './card.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [CardComponent],
  imports: [CommonModule],
  exports: [CardComponent]
})
export class CardModule { }
