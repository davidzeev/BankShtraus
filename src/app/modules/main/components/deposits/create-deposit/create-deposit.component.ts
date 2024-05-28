
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepositService } from '../../../../../services/deposit.service';
import { DepositTypeDTO, DepositsDTO } from '../../../../../models/Deposits.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../../../services/user.service';

@Component({
  selector: 'app-create-deposit',
  templateUrl: './create-deposit.component.html',
  styleUrl: './create-deposit.component.scss'
})

export class CreateDepositComponent implements OnInit {
  depositForm: FormGroup;
  depositTypes: DepositTypeDTO[] = [];
  selectedDepositType: DepositTypeDTO | null = null;

  constructor(
    private fb: FormBuilder,
    private depositService: DepositService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.depositForm = this.fb.group({
      accountNumber: [{ value: this.userService.getAccountDetail()!.accountNumber, disabled: true }],
      sum: ['', [Validators.required, Validators.min(1)]],
      depositTypeId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadDepositTypes();
  }

  loadDepositTypes(): void {
    this.depositService.getDepositsTypeList().subscribe(
      (data: DepositTypeDTO[]) => {
        this.depositTypes = data;
      },
      (error) => {
        console.error('Error loading deposit types:', error);
      }
    );
  }

  selectDepositType(type: DepositTypeDTO): void {
    this.selectedDepositType = type;
    this.depositForm.patchValue({ depositTypeId: type.depositTypeId });
    this.depositForm.get('sum')?.setValidators([Validators.required, Validators.min(type.minimumDeposit)]);
    this.depositForm.get('sum')?.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.depositForm.valid) {
      const newDeposit: DepositsDTO = {
        accountNumber: 10001, // מספר חשבון קבוע
        sum: this.depositForm.get('sum')?.value,
        depositTypeId: this.depositForm.get('depositTypeId')?.value
      };
      this.depositService.addDeposit(newDeposit).subscribe(
        (response) => {
          console.log('Deposit added successfully:', response);
          this.snackBar.open('הפקדון נוסף בהצלחה!', 'סגור', { duration: 3000 });
          this.depositForm.reset();
          this.selectedDepositType = null;
        },
        (error) => {
          console.error('Error adding deposit:', error);
        }
      );
    }
  }
}