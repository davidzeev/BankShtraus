import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account, LoginAccount } from '../../../../models/user.model';
import { UserService } from '../../../../services/user.service';
import { RoutingUrl } from '../../../../models/routing.model';
import { Router } from '@angular/router';
import { UtilsService } from '../../../../services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  submit = false;
  public loginForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private userSrv: UserService,
    private router: Router,
    private utilsService: UtilsService,
  ) {
    this.loginForm = this.fb.group<any>({
      userId: [null, [Validators.required]],
      userCode: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    this.autoFill();
  }
  get form() { return this.loginForm.controls };

  public tryLogin(): void {
    this.submit = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.userSrv.login(this.loginForm.value).subscribe({
      next: (resultData: Account) => {
        if (resultData) {
          // התחברות מוצלחת
          this.router.navigate([RoutingUrl.homeFull]);
        } else {
          // שגיאה בקבלת נתונים
          console.error('Error in response data:', resultData);
        }
      },
      error: (error) => {
        this.utilsService.handleServerError(error);
      }
    });
  }

  private autoFill(): void {
    this.loginForm.patchValue({ userId: 315511766, userCode: "6513FDFD", password: "315511766" })
    // this.tryLogin();
  }
}
