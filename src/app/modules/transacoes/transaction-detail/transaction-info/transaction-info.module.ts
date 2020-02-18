import { NgModule } from '@angular/core';
import { TransactionInfoComponent } from './transaction-info.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [TransactionInfoComponent],
    exports: [TransactionInfoComponent],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class TransactionInfoModule { }