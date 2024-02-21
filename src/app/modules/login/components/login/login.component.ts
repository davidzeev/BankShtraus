import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { loginUser } from '../../../../models/user.model';
import { UserService } from '../../../../services/user.service';
import { error } from 'console';
import { routingUrl } from '../../../../models/routing.model';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  submit = false;
  public loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private userSrv: UserService, private router: Router) {
    this.loginForm = this.fb.group<any>({
      userId: [null, [Validators.required]],
      userCode: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    this.loginForm.patchValue({ userId: 315511766, userCode: "6513FDFD", password: "315511766" })
  }
  get form() { return this.loginForm.controls };

  public tryLogin(): void {
    this.submit = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.userSrv.login(this.loginForm.value).subscribe(
      resultData => {
        if (resultData) {
          // התחברות מוצלחת
          this.router.navigate([routingUrl.homeFull]);
          console.log(resultData);
        } else {
          // שגיאה בקבלת נתונים
          console.error('Error in response data:', resultData);
        }
      },
      error => {
        // שגיאה בקריאה לשירות
        console.error('Error in API call:', error);
      }
    );
  }
}
