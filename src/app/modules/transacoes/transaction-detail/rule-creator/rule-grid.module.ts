import { NgModule } from '@angular/core';
import { RuleGridComponent } from './rule-grid.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ScrollTrackerModule } from '@shared/directives/scroll-tracker.module';

@NgModule({
  declarations: [
    RuleGridComponent,
  ],
  imports: [
    MatDialogModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatTooltipModule,
    MatButtonModule,
    ScrollTrackerModule,
    MatTableModule,
    MatPaginatorModule
  ],
  exports: [
    RuleGridComponent
  ]
})
export class RuleGridModule { }
