import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { GuidedTour, GuidedTourService } from '@gobsio/ngx-guided-tour';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TutorialService {

  private readonly TOUR_START_CLASS = 'tour-open';

  private previousState: boolean;
  private observer: MutationObserver;

  public afterTutorialStarted = new Subject();
  public afterTutorialClosed = new Subject();

  constructor(
    @Inject(DOCUMENT) private doc: Document
  ) {
    const elemToObserve = this.doc.body;
    this.previousState = elemToObserve.classList.contains(this.TOUR_START_CLASS);
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const target: any = mutation.target;
          const currentState = target.classList && target.classList.contains(this.TOUR_START_CLASS);
          if (this.previousState !== currentState) {
            this.previousState = currentState;
            if (currentState) {
              this.afterTutorialStarted.next();
            } else {
              this.afterTutorialClosed.next();
            }
          }
        }
      });
    });
  }

  public startTour(guidedTourService: GuidedTourService, tour: GuidedTour) {
    console.log('startTour');
    const subscription = this.afterTutorialClosed.subscribe(() => {
      this.observer.disconnect();
      subscription.unsubscribe();
    });
    this.observe();
    console.log(1);
    guidedTourService.startTour(tour);
    console.log(2);
  }

  private observe() {
    this.observer.observe(this.doc.body, { attributes: true });
  }

}
