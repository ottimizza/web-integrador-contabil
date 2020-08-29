import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SigninAsDialogComponent } from './signin-as-dialog.component';
import { MatPaginatorModule, MatFormFieldModule, MatSnackBarModule, MatDialogModule, MatTableModule, MatChipsModule, MatIconModule } from '@angular/material';
import { ComplexSearchModule } from '@shared/components/search/complex-search.module';
import { DesignSystemModule } from '@shared/components/ds.module';

@NgModule({
  declarations: [SigninAsDialogComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,

    MatPaginatorModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTableModule,
    MatChipsModule,
    MatIconModule,

    ComplexSearchModule,
    DesignSystemModule
  ],
  exports: [SigninAsDialogComponent]
})
export class SigninAsDialogModule { }
