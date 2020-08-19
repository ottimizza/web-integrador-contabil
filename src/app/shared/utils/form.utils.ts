import { FormControl, FormGroup } from '@angular/forms';

export class FormUtils {

  public static groupBuilder(controls: string[]) {
    const formGroup: any = {};
    controls.forEach(ctrl => {
      formGroup[ctrl] = new FormControl();
    });

    return new FormGroup(formGroup);
  }

}
