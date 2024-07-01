import { CurrencyPipe, KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { Bank, Branch } from '../../../../models/BankBranch.model';
import { BankTransferDTO } from '../../../../models/BankTransfer.model';
import { UserService } from '../../../../services/user.service';
import { UtilsService } from '../../../../services/utils.service';
import { ActionType } from '../../../../models/enums.model';
import { ListsService } from '../../../../services/lists.service';

@Component({
  selector: 'app-bank-transfer',
  templateUrl: './bank-transfer.component.html',
  styleUrl: './bank-transfer.component.scss'
})
export class BankTransferComponent implements OnInit {

  banks: Bank[] = [];
  branches: Branch[] = [];
  action: ActionType = ActionType.None;

  transferForm!: FormGroup;
  transferPurposes: KeyValue<number, string>[] = this.listsService.getTransferPurposes();

  constructor(
    private formBuilder: FormBuilder,
    private currencyPipe: CurrencyPipe,
    private listsService: ListsService,
    private apiService: ApiService,
    private userService: UserService,
    private utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadBanks();
    this.transferForm.valueChanges.subscribe(() => {
      this.action = ActionType.None;
    })
  }

  private initForm(): void {
    this.transferForm = this.formBuilder.group({
      beneficiaryName: ['', Validators.required],
      bankID: ['', Validators.required],
      branchID: ['', Validators.required],
      accountNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      amount: ['', [Validators.required, Validators.max(10000)]],
      transferPurpose: ['', Validators.required],
      otherPurpose: ['']
    });

    this.transferForm.get('bankID')?.valueChanges.subscribe((newValue) => {
      this.onBankSelected(newValue);
    })
  }

  public onSubmit(): void {
    if (this.transferForm.invalid) {
      return;
    }
    const formValue = this.transferForm.value;
    const accountNumber = this.userService.getAccountDetail()!.accountNumber;
    const objToSend: BankTransferDTO = {
      accountNumberSender: accountNumber,
      beneficiaryName: formValue.beneficiaryName,
      bankID: formValue.bankID,
      branchID: formValue.branchID,
      accountNumber: formValue.accountNumber,
      amount: formValue.amount,
      transferPurpose: formValue.transferPurpose,
      otherPurpose: formValue.otherPurpose,
    }
    this.apiService.performBankTransfer(objToSend).subscribe({
      next: (referenceNumber: any) => {
        debugger;
        this.transferForm.disable();
        console.log(`referenceNumber is: ${referenceNumber}`)
        this.action = ActionType.Success;
      },
      error: (error) => {
        debugger;
        this.utilsService.handleServerError(error);
        this.action = ActionType.Failed;
      }
    });
  }


  public formatInput(event: any): void {
    const inputValue = event.target.value;
    const valueWithCommas = this.currencyPipe.transform(inputValue.replace(/\D/g, '').replace(/^0+/, ''), 'ILS', 'symbol', '1.0-0')
    this.transferForm.get('amount')?.patchValue(valueWithCommas, { eventEmit: false })
  }

  private loadBanks(): void {
    this.listsService.getBanks().subscribe(banks => {
      this.banks = banks;
    });
  }

  private onBankSelected(bankId: number): void {
    this.loadBranches(bankId);
    const control = this.transferForm.get('branchID');
    control?.patchValue(null);
    control?.markAsPristine();
    control?.markAsUntouched();
  }

  private loadBranches(bankId: number): void {
    if (bankId) {
      this.listsService.getBranches(bankId).subscribe(branches => {
        this.branches = branches;
      });
    }
  }

}