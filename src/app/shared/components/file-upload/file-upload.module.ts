import { NgModule } from '@angular/core';
import { FileUploadComponent } from './file-upload.component';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DragDropDirective } from '@shared/directives/drag-drop.directive';

@NgModule({
  declarations: [FileUploadComponent, DragDropDirective],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  exports: [FileUploadComponent]
})
export class FileUploadModule {}
