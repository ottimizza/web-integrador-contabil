import { NgModule } from '@angular/core';
import { CommentComponent } from './comment.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [CommentComponent],
  imports: [CommonModule],
  exports: [CommentComponent]
})
export class CommentModule {}
