import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { loginUser } from '../../../../models/user.model';
import { UserService } from '../../../../services/user.service';
import { error } from 'console';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  submit = false;
  public loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private userSrv: UserService) {
    this.loginForm = this.fb.group<any>({
      tz: [null, [Validators.required]],
      userCode: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  get form() { return this.loginForm.controls };
  public tryLogin(): void {
    this.submit = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.userSrv.login(this.loginForm.value).subscribe(resultData => {
      console.log(resultData)
    },
      error => {
        console.log(error);
      });
  }
}
