import { NgModule } from '@angular/core';
import { TextComponent } from './text.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [TextComponent],
  imports: [CommonModule],
  exports: [TextComponent]
})
export class TextModule {}
