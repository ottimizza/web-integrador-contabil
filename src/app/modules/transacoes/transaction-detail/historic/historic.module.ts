import { NgModule } from '@angular/core';
import { HistoricComponent } from './historic.component';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HistoricFieldComponent } from './historic-field/historic-field.component';
import { HistoricRowComponent } from './historic-row/historic-row.component';

@NgModule({
  declarations: [
    HistoricComponent,
    HistoricFieldComponent,
    HistoricRowComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatTooltipModule
  ],
  exports: [HistoricComponent]
})
export class HistoricModule { }
