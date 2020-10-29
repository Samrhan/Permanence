import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {LoginService} from '../service/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl(null),
    password: new FormControl(null)
  });
  passwdErr = false;
  missingPasswd = false;
  missingId = false;

  constructor(private sLogin: LoginService) {
  }

  ngOnInit(): void {
  }

  async login(): Promise<void> {
    const passwd = this.loginForm.controls.password.value;
    const username = this.loginForm.controls.username.value;
    this.missingPasswd = !passwd;
    this.missingId = !username;
    const validForm = !this.missingPasswd && !this.missingId;

    if (validForm) {
      const res = await this.sLogin.login({username, passwd});
      this.passwdErr = !res;
    }

  }

}
