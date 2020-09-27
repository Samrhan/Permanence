import {Component, OnInit} from '@angular/core';
import {SHA256} from 'crypto-js';
import {FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    id: new FormControl(null),
    password: new FormControl(null)
  });
  psswdErr = false;
  missingPasswd = '';
  missingId = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  async login(): Promise<void> {
    const passwd = this.loginForm.controls.password.value;
    const id = this.loginForm.controls.id.value;
    if (passwd && id) {
      this.missingId = '';
      this.missingPasswd = '';
      const hash = new SHA256(passwd).toString();
      await fetch(`http://permanence.xyz:4001/api/login/${id}`, {
          method: 'POST',
          headers: {
            passwd: hash
          }
        }
      ).then(res => res.json()).then(json => {
        console.log(json);
        if (json.state === 'failed') {
          this.psswdErr = true;
          this.loginForm.controls.password.setValue('');
        }
      });
    } else {
      if (!passwd) {
        this.missingPasswd = 'is-invalid';
      }else{
        this.missingPasswd = '';
      }
      if (!id) {
        this.missingId = 'is-invalid';
      }else{
        this.missingId = '';
      }
    }
  }

}
