import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SidePushModalComponent } from './side-push-modal/side-push-modal.component';


@NgModule({
  declarations: [
    ModalComponent,
    SidePushModalComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
  ],
  entryComponents: [
    ModalComponent
  ],
  exports: [
    ModalComponent,
    SidePushModalComponent
  ]
})
export class ModalModule {
}
