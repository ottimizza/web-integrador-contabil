import { Component, Input, OnInit, Inject, Output, EventEmitter, Optional } from '@angular/core';
import { FormattedHistoric, Historic } from '@shared/models/Historic';
import { DOCUMENT } from '@angular/common';
import { HistoricService } from '@shared/services/historic.service';
import { MatDialog } from '@angular/material';
import { EntryUtils } from '@shared/utils/entry.utils';
import { RuleDeleteConfirmDialogComponent } from '@modules/rule-list/rule-delete-confirm-dialog/rule-delete-confirm-dialog.component';
import { RuleType } from '@shared/models/Rule';

type HistoricRow = { bold: boolean, value: string }[];

@Component({
  selector: 'app-historic-card',
  templateUrl: './historic-card.component.html',
  styleUrls: ['./historic-card.component.scss']
})
export class HistoricCardComponent implements OnInit {

  @Input() public historic: FormattedHistoric;
  @Input() public entryType = 1;

  @Output() public changeDetected = new EventEmitter<number>();

  public nativeHistoric: Historic;
  public rows: HistoricRow = [];
  public haveToBeShown: boolean;

  constructor(
    @Inject(DOCUMENT) public doc: Document,
    public service: HistoricService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.nativeHistoric = Historic.parse(this.historic.historico);

    if (this.nativeHistoric.id !== undefined) {
      this.implement([
        { bold: false, value: 'Código:' },
        { bold: true, value: this.nativeHistoric.id + '.' },
      ]);
    }

    this.implement([
      { bold: true, value: this.nativeHistoric.com1 },
      { bold: false, value: this.form(this.nativeHistoric.field1.field) },
      { bold: true, value: this.nativeHistoric.com2 },
      { bold: false, value: this.form(this.nativeHistoric.field2.field) },
      { bold: true, value: this.nativeHistoric.com3 },
      { bold: false, value: this.form(this.nativeHistoric.field3.field) },
      { bold: true, value: this.nativeHistoric.com4 }
    ]);
  }

  public mustBeShown() {
    const width = window.innerWidth ?? this.doc.documentElement.clientWidth ?? this.doc.body.clientWidth;
    return width >= 968 || this.haveToBeShown;
  }

  public delete() {
    const dialogRef = this.dialog.open(RuleDeleteConfirmDialogComponent, {
      width: '595px',
      data: {
        id: this.historic.id,
        type: RuleType.HISTORIC
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.sinalize();
        this.historic = null;
        this.nativeHistoric = null;
      }
    });
  }

  public openDialog() {}

  public form(val: string) {
    return EntryUtils.fromTo(val, { tipoLancamento: this.entryType });
  }

  public verify() {
    // const val = this.rows[this.rows.length - 1].value.trim();
    // if (val === '*' || val === '') {
    //   this.rows.pop();
    //   this.verify();
    // }
    this.rows = this.rows.filter(row => row.value.trim() !== '*' && row.value.trim() !== '');
  }

  private sinalize() {
    this.changeDetected.emit(this.historic.id);
  }

  private implement(value: HistoricRow) {
    value = value.map(val => {
      val.value += ' ';
      val.value = val.value.toUpperCase();
      return val;
    });
    this.rows = this.rows.concat(value);
    this.verify();
  }
}
