import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntegrationsComponent } from './integrations.component';
import { NormalizedLayoutModule } from 'app/layout/normalized-layout/normalized-layout.module';
import { IntegrationsRoutingModule } from './integrations.routing';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BreadcrumbModule } from '@shared/components/breadcrumb/breadcrumb.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { IntegrationCreateDialogComponent } from './dialogs/integration-create-dialog/integration-create-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FileUploadModule } from '@shared/components/file-upload/file-upload.module';


@NgModule({
  declarations: [IntegrationsComponent, IntegrationCreateDialogComponent],
  imports: [
    CommonModule,
    IntegrationsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NormalizedLayoutModule,
    MatTooltipModule,
    BreadcrumbModule,
    MatChipsModule,
    MatIconModule,
    MatDialogModule,
    MatRadioModule,
    MatCheckboxModule,
    FileUploadModule
  ]
})
export class IntegrationsModule { }
