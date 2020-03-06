import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  currentMessage = new BehaviorSubject(null);

  constructor(private fcm: AngularFireMessaging) {
    this.fcm.messaging.subscribe((messaging: any) => {
      messaging.onMessage = messaging.onMessage.bind(messaging);
      messaging.onTokenRefresh = messaging.onTokenRefresh.bind(messaging);
    });
  }

  /**
   * request permission for notification from firebase cloud messaging
   *
   * @param userId userId
   */
  public requestPermission(userId: string) {
    this.fcm.requestToken.subscribe(
      (token: any | string) => {
        console.log(token);
        // lógica para salvar o token e o id do usuário para envio de notificações
      },
      (err: any) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  /**
   * hook method when new notification received in foreground
   */
  receiveMessage() {
    this.fcm.messages.subscribe(payload => {
      console.log('new message received. ', payload);
      this.currentMessage.next(payload);
    });
  }
}
