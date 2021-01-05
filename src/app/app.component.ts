import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { RxEvent } from '@app/services/rx-event.service';
import { DOCUMENT } from '@angular/common';
import { UpdateSerive } from '@app/services/update.service';
import { MessagingService } from '@app/services/messaging.service';
import { environment } from '@env';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  public updateAvailable = false;

  constructor(
    @Inject(DOCUMENT) public document: Document,
    public events: RxEvent,
    public updateService: UpdateSerive,
    public messagingService: MessagingService,
  ) {
    this.updateService.checkForUpdates();
    this.events.subscribe('sw::update', () => {
      this.updateAvailable = true;
    });
  }

  public subscribeToSidebarToggleEvents() {
    this.events.subscribe('sidebar::toggle', () => {
      const body = this.document.getElementsByTagName('body')[0];

      body.classList.toggle('show-sidebar');
    });
  }

  refresh() {
    window.location.reload();
  }

  public ngOnInit() {
    this.messagingService.receiveMessage();
    this.messagingService.currentMessage.subscribe(msg => console.log(msg));
    this.setVariables();
  }

  private setVariables() {
    const theme = environment.theme;
    this.document.documentElement.style.setProperty('--primary-color', theme.primaryColor);
    this.document.documentElement.style.setProperty('--secondary-color', theme.secondaryColor);
    this.document.documentElement.style.setProperty('--primary-accent', theme.primaryAccent);
    this.document.documentElement.style.setProperty('--dark-legacy', theme.dark);
  }

}
