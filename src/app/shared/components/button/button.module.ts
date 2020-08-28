import { NgModule } from '@angular/core';
import { ButtonComponent } from './button.component';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [ButtonComponent],
  imports: [MatButtonModule],
  exports: [ButtonComponent],
  providers: [],
})
export class ButtonModule { }
