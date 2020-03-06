import { Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { SwUpdate } from '@angular/service-worker';
import { RxEvent } from './rx-event.service';

@Injectable({ providedIn: 'root' })
export class UpdateSerive {

  constructor(public updates: SwUpdate, public events: RxEvent) {
    if (updates.isEnabled) {
      interval(60 * 60 * 1000)
        .subscribe(() => updates.checkForUpdate());
    }
  }

  public checkForUpdates(): void {
    console.log('Checking for updates');
    this.updates.available.subscribe(() => this.promptUser());
  }

  private promptUser(): void {
    console.log('Updating to new version');
    this.updates.activateUpdate().then(() => this.events.next('sw::update', {}));
  }

}
