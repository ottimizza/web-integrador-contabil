import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss']
})
export class EmptyStateComponent implements OnInit {

  subtitles: string[];

  @Input() firstTitle: string;
  @Input() subtitle: string;

  @Input() icon: string;
  @Output() iconPressed = new EventEmitter<boolean>();

  emit() {
    this.iconPressed.emit(true);
  }

  ngOnInit(): void {
    this.subtitles = this.subtitle.split('{icon}');
  }
}
