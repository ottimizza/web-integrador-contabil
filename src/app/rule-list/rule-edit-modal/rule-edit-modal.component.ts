import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RuleCreateFormat } from '@shared/models/Rule';
import { DOCUMENT } from '@angular/common';

@Component({
  templateUrl: './rule-edit-modal.component.html',
  styleUrls: ['./rule-edit-modal.component.scss']
})
export class RuleEditModalComponent {

  constructor(
    public dialogRef: MatDialogRef<RuleEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { rules: RuleCreateFormat },
    @Inject(DOCUMENT) private _document: Document
  ) { }

  onNoClick() {
    this.dialogRef.close();
  }

}
