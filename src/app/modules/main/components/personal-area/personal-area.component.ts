import { Component, OnInit } from '@angular/core';
import { Account } from '../../../../models/user.model';
import { ApiService } from '../../../../services/api.service';
import { UserService } from '../../../../services/user.service';
import { Role } from '../../../../models/enums.model';

@Component({
  selector: 'app-personal-area',
  templateUrl: './personal-area.component.html',
  styleUrl: './personal-area.component.scss'
})

export class PersonalAreaComponent implements OnInit {
  account: Account | null = null;

  public get Role(): typeof Role {
    return Role;
  }

  constructor(private apiService: ApiService, private userService: UserService) { }

  ngOnInit(): void {
    const accountNumber = this.userService.getAccountDetail()!.accountNumber;
    if (accountNumber) {
      this.apiService.getAccount(accountNumber).subscribe(
        (account: Account) => {
          this.account = account;
        },
        (error) => {
          console.error('Error fetching account details', error);
        }
      );
    } else {
      console.error('No account number found in user details');
    }
  }
}
