import { CdkDragDrop } from '@angular/cdk/drag-drop';

export interface GenericDragDropList {

  drop(event: CdkDragDrop<any[]>): void;

}
