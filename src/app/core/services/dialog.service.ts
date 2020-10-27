import { Injectable, TemplateRef } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

export class DialogWidth {

  constructor(public size: string) {}

  public static readonly SMALL = new DialogWidth('360px'); // NÃO RECOMENDADO
  public static readonly DEFAULT = new DialogWidth('596px');
  public static readonly LARGE = new DialogWidth('800px');
  public static readonly EXTRA_LARGE = new DialogWidth('80%');
}

@Injectable({ providedIn: 'root' })
export class DialogService {

  private refs: MatDialogRef<unknown, any>[] = [];

  constructor(
    private dialog: MatDialog
  ) {}

  public open<T>(dialog: ComponentType<unknown> | TemplateRef<unknown>, data: any = {}) {
    return this.openComplexDialog<T>(dialog, DialogWidth.DEFAULT, data, {});
  }

  public openComplexDialog<T>(
    dialog: ComponentType<unknown> | TemplateRef<unknown>,
    width = DialogWidth.DEFAULT,
    data: any = {},
    optionalConfigs: MatDialogConfig<any> = {}
  ): Observable<T> {

    const config: MatDialogConfig<any> = { width: width.size, data };
    Object.assign(config, optionalConfigs);

    const dialogRef = this.dialog.open(dialog, config);
    this.refs.push(dialogRef);
    const index = this.refs.length - 1;

    return dialogRef.afterClosed()
    .pipe(finalize(() => {
      this.refs[index] = null;
      if (this.refs.filter(ref => !!ref).length === 0) {
        this.refs = [];
      }
    }));
  }

  public getInstance(index = 0) {
    return this.refs[index];
  }

}
