import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private sLogin: LoginService) {
  }

  title = 'Permanence';

  async ngOnInit(): Promise<void> {
    const logedin = await this.sLogin.logedin();
    if (!logedin) {
      await this.router.navigateByUrl('/login');
    } else {
      if (this.router.url.split('/')[1] !== 'home') {
        await this.router.navigateByUrl('/home');
      }
    }
  }

}
