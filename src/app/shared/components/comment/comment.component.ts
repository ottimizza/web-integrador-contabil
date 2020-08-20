import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
})
export class CommentComponent {

  @Input() type: 'primary' | 'danger' | 'success' | 'info' | 'light' | 'secondary' | 'warning' | 'default' = 'default';
  @Input() deep = '';
  @Input() bold = false;

}
