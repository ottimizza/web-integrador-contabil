import { Component, OnInit, Inject } from '@angular/core';
import { RxEvent } from '@app/services/rx-event.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public updateAvailable = false;

  constructor(@Inject(DOCUMENT) public document: Document, private events: RxEvent) {
  }

  public subscribeToSidebarToggleEvents() {
    this.events.subscribe('sidebar::toggle', () => {
      const body = this.document.getElementsByTagName('body')[0];

      body.classList.toggle('show-sidebar');
    });
  }

  public ngOnInit() {
  }

}


// class TestandoCoisas {
//   name: string;
// }

// function TesteDecorator(config: { age: number }) {
//   return target => {
//     Object.defineProperty(target.prototype, 'idade',)
//   }
// }
