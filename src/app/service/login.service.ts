import {Injectable} from '@angular/core';
import axios from 'axios';
import {Router} from '@angular/router';


axios.defaults.withCredentials = true;

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private router: Router) {
  }

  async login(credentials): Promise<boolean> {
    try {
      await axios.post('https://permanence.xyz:5000/api/login', credentials);
      this.router.navigateByUrl('/home');
      return true;
    } catch (err) {
      if (err.response.status === 403) {
        return false;
      }
    }
  }

  async logedin(): Promise<unknown> {
    const promise = new Promise(async (resolve, reject) => {
      await axios.get('https://permanence.xyz:5000/api/logedin')
        .catch(err => {
          reject();
        }).then(res => {
          // @ts-ignore
          resolve(res.data.logedin);
        });
    });
    try {
      return await promise;
    } catch {
      return false;
    }
  }
}
