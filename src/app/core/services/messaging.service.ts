import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { LoggerUtils } from '@shared/utils/logger.utills';

@Injectable({ providedIn: 'root' })
export class MessagingService {

  currentMessage = new BehaviorSubject(null);

  constructor(private afm: AngularFireMessaging) {
    this.afm.messaging.subscribe((messaging: any) => {
      messaging._next = (payload: any) => LoggerUtils.log(payload);
      messaging.onTokenRefresh = messaging.onTokenRefresh.bind(messaging);
    });
  }

  requestPermission() {
    this.afm.requestToken.subscribe(token => LoggerUtils.log(token),
    err => LoggerUtils.error('Unable to get permission to notify.', err));
  }

  receiveMessage() {
    this.afm.messages.subscribe(payload => this.currentMessage.next(payload));
  }

}
