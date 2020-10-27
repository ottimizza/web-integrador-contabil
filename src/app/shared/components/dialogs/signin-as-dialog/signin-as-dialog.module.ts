import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SigninAsDialogComponent } from './signin-as-dialog.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { ComplexSearchModule } from '@shared/components/search/complex-search.module';
import { DesignSystemModule } from '@shared/components/ds.module';
import { PaginatorModule } from '@shared/components/paginator/paginator.module';

@NgModule({
  declarations: [SigninAsDialogComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,

    MatFormFieldModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTableModule,
    MatChipsModule,
    MatIconModule,

    ComplexSearchModule,
    DesignSystemModule,
    PaginatorModule
  ],
  exports: [SigninAsDialogComponent]
})
export class SigninAsDialogModule { }
