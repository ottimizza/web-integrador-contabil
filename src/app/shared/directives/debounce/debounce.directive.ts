import {
  Directive,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  ElementRef,
} from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Directive({
  selector: '[debounce]',
})
export class DebounceDirective implements OnInit, OnDestroy {

  @Output()
  public event = new EventEmitter<Event>();

  @Input()
  public debounceTime = 300;
  @Input()
  public debounceEvent: string;
  @Input()
  public debounceActivated = true;

  private sub$ = new Subject<Event>();
  private eventsToListen = ['input', 'click'];

  constructor(public el: ElementRef<HTMLElement>) {}

  ngOnInit() {
    this.sub$
      .pipe(debounceTime(this.debounceTime), distinctUntilChanged())
      .subscribe(e => this.event.emit(e));

    if (this.debounceEvent) {
      this.eventsToListen.push(this.debounceEvent);
    }

    if (!this.debounceActivated) {
      return;
    }

    this.eventsToListen.forEach(eventName => {
      this.el.nativeElement.addEventListener(eventName, (e: Event) => this.next(e));
    });
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }

  next(value: Event) {
    this.sub$.next(value);
  }
}
