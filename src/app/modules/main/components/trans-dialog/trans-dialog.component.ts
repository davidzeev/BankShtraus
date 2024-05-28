import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Transaction } from '../../../../models/TransferData.model';

@Component({
  selector: 'app-trans-dialog',
  templateUrl: './trans-dialog.component.html',
  styleUrl: './trans-dialog.component.scss'
})
export class TransDialogComponent {
  public data!: Transaction;
  constructor(@Inject(MAT_DIALOG_DATA) data: { trans: Transaction }) {
    console.log(data);
    this.data = data.trans;
  }

}
