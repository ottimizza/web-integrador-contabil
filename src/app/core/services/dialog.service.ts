import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ComponentType } from '@angular/cdk/portal';
import { Observable } from 'rxjs';

export class DialogWidth {

  constructor(public size: string) {}

  public static get DEFAULT() {
    return new DialogWidth('596px');
  }

  public static get LARGE() {
    return new DialogWidth('800px');
  }

  public static get EXTRA_LARGE() {
    return new DialogWidth('80%');
  }
}

@Injectable({ providedIn: 'root' })
export class DialogService {

  constructor(
    private dialog: MatDialog
  ) {}

  public open<T>(dialog: ComponentType<unknown> | TemplateRef<unknown>, data: any = {}) {
    return this.openComplexDialog<T>(
      dialog,
      DialogWidth.DEFAULT,
      data,
      {}
    );
  }

  public openComplexDialog<T>(
    dialog: ComponentType<unknown> | TemplateRef<unknown>,
    width = DialogWidth.DEFAULT,
    data: any = {},
    optionalConfigs: MatDialogConfig<any> = {}
  ): Observable<T> {

    const config: MatDialogConfig<any> = { width: width.size, data };
    console.log(config);
    Object.assign(config, optionalConfigs);

    const dialogRef = this.dialog.open(dialog, config);
    return dialogRef.afterClosed();
  }

}
