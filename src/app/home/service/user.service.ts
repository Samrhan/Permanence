import {Injectable} from '@angular/core';
import axios from 'axios';

axios.defaults.withCredentials = true;

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor() {
  }

  async fetchPersons(): Promise<any> {
    const res = await axios.get('https://permanence.xyz:5000/api/fetchusers');
    return res.data;
  }

  async fetchPlanning(): Promise<any> {
    const res = await axios.get('https://permanence.xyz:5000/api/planning');
    return res.data;
  }

  async AddPerson(data: any): Promise<any> {
    data.indisDay++;
    if (data.disDay !== -1) {
      data.disDay++;
    }
    if (data.p_indis !== -1) {
      data.p_indis++;
    }
    const res = await axios.post('https://permanence.xyz:5000/api/adduser', {data});
    return res.data.person;
  }

  async deletePerson(id: number): Promise<boolean> {
    await axios.delete('https://permanence.xyz:5000/api/deleteuser/' + id.toString()).catch(err => {
      return false;
    });
    return true;
  }
}
