import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { LoggerUtils } from '@shared/utils/logger.utills';

@Injectable({ providedIn: 'root' })
export class MessagingService {

  currentMessage = new BehaviorSubject(null);

  constructor(public afm: AngularFireMessaging) {
  this.afm.messaging.subscribe((_messaging: any) => {
    _messaging._next = (payload: any) => LoggerUtils.log(payload);
    _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
  });
  }

  requestPermission() {
    this.afm.requestToken.subscribe(token => {
      LoggerUtils.log(token);
    },
    err => {
      LoggerUtils.error('Unable to get permission to notify.', err);
    });
  }

  receiveMessage() {
    this.afm.messages.subscribe(payload => {
      this.currentMessage.next(payload);
    });
  }

}
