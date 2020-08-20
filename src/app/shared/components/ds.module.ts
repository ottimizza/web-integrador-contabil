import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerticalAlignerModule } from './vertical-aligner/vertical-aligner.module';
import { CardModule } from './card/card.module';
import { InfoModule } from './info/info.module';
import { InputModule } from './input/input.module';
import { VerticalAlignerComponent } from './vertical-aligner/vertical-aligner.component';
import { CardComponent } from './card/card.component';
import { InfoComponent } from './info/info.component';
import { InputComponent } from './input/input.component';

@NgModule({
  imports: [
    CommonModule,
    VerticalAlignerModule,
    CardModule,
    InfoModule,
    InputModule
  ],
  exports: [
    VerticalAlignerComponent,
    CardComponent,
    InfoComponent,
    InputComponent
  ]
})
export class DesignSystemModule {}
