import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  public NO_RESULT_EXCEPTION = 'Não foram encontrados registros!';

  public NON_UNIQUE_RESULT_EXCEPTION = 'Foram encontrados múltiplos registros!';

  private primary = ['alert', 'bg-primary', 'text-white', 'f-size'];
  private success = ['alert', 'bg-success', 'text-white', 'f-size'];
  private warning = ['alert', 'bg-warning', 'text-white', 'f-size'];
  private danger = ['alert', 'bg-danger', 'text-white', 'f-size'];

  constructor(public snackbar: MatSnackBar) {}

  public show(
    message: string,
    color?: 'primary' | 'success' | 'danger' | 'warning'
  ) {
    this.snackbar.open(message, '', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: this.selectColor(color)
    });
  }

  public showSimpleSnackBar(message: string): void {
    this.snackbar.open(message, '', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'left'
    });
  }

  public showSnack(message: string): void {
    this.snackbar.open(message, '', {
      verticalPosition: 'bottom',
      horizontalPosition: 'left'
    });
  }

  public hideSnack(): void {
    this.snackbar.dismiss();
  }

  private selectColor(color: string): string[] {
    switch (color) {
      case 'primary':
        return this.primary;
      case 'success':
        return this.success;
      case 'danger':
        return this.danger;
      case 'warning':
        return this.warning;
      default:
        return this.success;
    }
  }
}
