import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';

import { RuleCreatorComponent } from './rule-creator.component';
import { InputChipsComponent } from './input-chips/input-chips.component';
import { RuleConfiguratorComponent } from './rule-configurator/rule-configurator.component';

@NgModule({
  declarations: [
    RuleCreatorComponent,
    InputChipsComponent,
    RuleConfiguratorComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatChipsModule,
    MatFormFieldModule
  ]
})
export class RuleCreatorModule { }
