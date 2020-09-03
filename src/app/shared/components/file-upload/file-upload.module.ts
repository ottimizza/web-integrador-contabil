import { NgModule } from '@angular/core';
import { FileUploadComponent } from './file-upload.component';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
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
