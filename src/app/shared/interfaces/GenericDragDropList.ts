import { CdkDragDrop } from '@angular/cdk/drag-drop';

export interface GenericDragDropList<T> {

  drop(event: CdkDragDrop<T[]>): void;

}
