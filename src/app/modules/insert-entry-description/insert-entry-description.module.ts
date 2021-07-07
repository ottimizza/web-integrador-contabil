import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsertEntryDescriptionComponent } from './pages/insert-entry-description/insert-entry-description.component';
import { NormalizedLayoutModule } from 'app/layout/normalized-layout/normalized-layout.module';
import { BetterInfoModule } from '@shared/components/better-info/better-info.module';
import { InsertEntryDescriptionRoutingModule } from './insert-entry-description.routing';
import { BreadcrumbModule } from '@shared/components/breadcrumb/breadcrumb.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [InsertEntryDescriptionComponent],
  imports: [
    CommonModule,
    InsertEntryDescriptionRoutingModule,
    NormalizedLayoutModule,
    BetterInfoModule,
    BreadcrumbModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class InsertEntryDescriptionModule { }
