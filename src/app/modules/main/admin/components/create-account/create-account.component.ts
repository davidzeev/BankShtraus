import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateAccountRequestDTO } from '../../../../../models/user.model';
import { ApiService } from '../../../../../services/api.service';
import { Consts, PasswordStrength, Role } from '../../../../../models/enums.model';
import { KeyValue } from '@angular/common';
import { Branch } from '../../../../../models/BankBranch.model';
import { ListsService } from '../../../../../services/lists.service';
import { CustomValidators } from '../../../../shared/Validators/CustomValidators ';
import { UtilsService } from '../../../../../services/utils.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  public createForm: FormGroup;
  public errTxt: string | null = null;
  public accountNumberResult: number | null = null;
  public userCodeResult: string | null = null;
  public branches: Branch[] = [];
  public qaGroups: KeyValue<string, string>[] = this.listService.getQaGroups();
  public roles: KeyValue<string, number>[] = this.listService.getRoles();
  public hidePassword: boolean = true;
  public passwordStrength: PasswordStrength | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private listService: ListsService,
    private utilsService: UtilsService,
  ) {
    this.createForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      mail: ['', [Validators.email, Validators.maxLength(100)]],
      phone: ['', [Validators.maxLength(15), Validators.pattern(/^\d+$/)]],
      homePhone: ['', [Validators.maxLength(15), Validators.pattern(/^\d+$/)]],
      address: ['', [Validators.maxLength(100)]],
      userId: ['', [Validators.required, CustomValidators.maxDigits(9)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30), CustomValidators.passwordPattern()]],
      branchNumber: ['', Validators.required],
      balance: ['', [Validators.required, CustomValidators.maxDigits(23)]],
      overdraftLimit: ['', [Validators.required, CustomValidators.maxDigits(13)]],
      qaGroup: [''],
      role: [Role.regular, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadBranches(Consts.BankId);

    this.createForm.valueChanges.subscribe(() => {
      this.errTxt = null;
      this.checkPasswordStrength();
    });
  }

  private loadBranches(bankId: number): void {
    if (bankId) {
      this.listService.getBranches(bankId).subscribe(branches => {
        this.branches = branches;
      });
    }
  }

  public togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  public onPasswordInput(): void {
    this.checkPasswordStrength();
  }

  private checkPasswordStrength(): void {
    const password = this.createForm.get('password')?.value || '';
    this.passwordStrength = this.utilsService.getPasswordStrength(password);
  }

  public onSubmit(): void {
    if (this.createForm.valid) {
      const newAccount: CreateAccountRequestDTO = this.createForm.value;
      newAccount.overdraftLimit = newAccount.overdraftLimit > 0 ? -newAccount.overdraftLimit : newAccount.overdraftLimit; // in db save at negavtive
      this.apiService.createAccount(newAccount).subscribe({
        next: (response) => {
          this.accountNumberResult = response.accountNumber;
          this.userCodeResult = response.userCode;
          this.createForm.disable();
        },
        error: (error) => {
          console.error('Error creating account', error);
          this.errTxt = error.error?.detail ? error.error?.detail : error.error;
        }
      });
    } else {
      this.errTxt = 'יש להזין ערכים חוקיים לשדות';
    }
  }
}
