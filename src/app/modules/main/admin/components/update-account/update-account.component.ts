import { Component, Input, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account, UpdateAccountRequestDTO } from '../../../../../models/user.model';
import { ApiService } from '../../../../../services/api.service';
import { Consts, Role } from '../../../../../models/enums.model';
import { KeyValue } from '@angular/common';
import { Branch } from '../../../../../models/BankBranch.model';
import { ListsService } from '../../../../../services/lists.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.scss']
})
export class UpdateAccountComponent implements OnInit {
  @Input() accountNumberInput: number | null = null;
  public updateForm: FormGroup;
  public account: Account | null = null;
  public errTxt: string | null = null;
  public action: number | null = null;
  public branches: Branch[] = [];
  public qaGroups: KeyValue<string, string>[] = this.listService.getQaGroups();
  public roles: KeyValue<string, number>[] = this.listService.getRoles();

  @ViewChild('deleteModal') deleteModal!: TemplateRef<any>;
  private dialogRef: MatDialogRef<any> | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private listService: ListsService,
    public dialog: MatDialog
  ) {
    this.updateForm = this.fb.group({
      accountNumber: ['', Validators.required],
      firstName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      mail: ['', [Validators.email, Validators.maxLength(100)]],
      phone: ['', [Validators.maxLength(15), Validators.pattern('^[0-9]*$')]],
      homePhone: ['', [Validators.maxLength(15), Validators.pattern('^[0-9]*$')]],
      address: ['', Validators.maxLength(100)],
      branchNumber: ['', Validators.required],
      userId: ['', Validators.required],
      qaGroup: [''],
      balance: ['', [Validators.required, Validators.pattern('^-?\\d{1,20}(\\.\\d{1,2})?$')]],
      overdraftLimit: ['', [Validators.required, Validators.pattern('^-?\\d{1,10}(\\.\\d{1,2})?$')]],
      role: ['', [Validators.required, Validators.pattern('^[1-2]$')]]
    });
  }

  ngOnInit(): void {
    if (this.accountNumberInput) {
      this.updateForm.patchValue({ accountNumber: this.accountNumberInput });
      this.fetchAccountDetails();
    }
    this.loadBranches(Consts.BankId);
    this.updateForm.get('accountNumber')?.valueChanges.subscribe(() => {
      this.account = null;
    });

    this.updateForm.valueChanges.subscribe(() => {
      this.action = null;
      this.errTxt = null;
    });
  }

  private loadBranches(bankId: number): void {
    if (bankId) {
      this.listService.getBranches(bankId).subscribe(branches => {
        this.branches = branches;
      });
    }
  }

  public fetchAccountDetails(): void {
    const accountNumber = this.updateForm.get('accountNumber')?.value;
    if (accountNumber) {
      this.apiService.getAccount(accountNumber).subscribe({
        next: (account: Account) => {
          account.overdraftLimit = -account.overdraftLimit; // in db save at negavtive
          this.account = account;
          this.updateForm.patchValue(account, { emitEvent: false });
        },
        error: (error) => {
          this.errTxt = error.error;
        }
      });
    }
  }

  public onSubmit(): void {
    if (this.updateForm.valid) {
      const updatedAccount: UpdateAccountRequestDTO = this.updateForm.value;
      updatedAccount.overdraftLimit = updatedAccount.overdraftLimit > 0 ? -updatedAccount.overdraftLimit : updatedAccount.overdraftLimit; // in db save at negavtive

      this.apiService.updateAccount(this.account!.accountNumber, updatedAccount).subscribe({
        next: (response) => {
          this.action = 1;
        },
        error: (error) => {
          console.error('Error updating account', error);
          this.errTxt = error.error?.detail ? error.error?.detail : error.error;
        }
      });
    }
  }

  public openDeleteModal(): void {
    this.dialogRef = this.dialog.open(this.deleteModal);
  }

  public closeDeleteModal(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  public deleteUser(): void {
    const accountNumber = this.updateForm.get('accountNumber')?.value;
    if (accountNumber) {
      this.apiService.deleteAccount(accountNumber).subscribe({
        next: () => {
          this.action = 2;  // Indicates successful deletion
          this.updateForm.reset();
          this.account = null;
          this.closeDeleteModal();
        },
        error: (error) => {
          console.error('Error deleting account', error);
          this.errTxt = error.error?.detail ? error.error?.detail : error.error;
        }
      });
    }
  }
}
