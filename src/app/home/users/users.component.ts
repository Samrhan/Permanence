import {Component, OnInit} from '@angular/core';

import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../service/user.service';
import * as moment from 'moment';
import {Moment} from 'moment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  addUserForm: FormGroup;
  days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
  persons = [];

  constructor(private fb: FormBuilder, private sUser: UserService) {
    this.addUserForm = this.fb.group({
      dates: this.fb.array([]),
      lastname: new FormControl(null, [Validators.required, Validators.minLength(1)]),
      firstname: new FormControl(null, [Validators.required, Validators.minLength(1)]),
      indisDay: new FormControl(null, [Validators.required, Validators.minLength(1)]),
      p_indis: new FormControl(-1),
      disDay: new FormControl(-1),
      indisDates: this.fb.array([]),
      rp: new FormControl(false),
      partial: new FormControl(false)
    });
  }

  dates(): FormArray {
    return this.addUserForm.get('dates') as FormArray;
  }

  async ngOnInit(): Promise<void> {
    const data = await this.sUser.fetchPersons();
    this.persons = data.people;
  }

  newDate(): FormGroup {
    return this.fb.group({
      date: ''
    });
  }

  addDate(): void {
    this.dates().push(this.newDate());
  }

  removeDate(i: number): void {
    this.dates().removeAt(i);
  }

  indisDates(): FormArray {
    return this.addUserForm.get('indisDates') as FormArray;
  }

  newIndisDate(): FormGroup {
    return this.fb.group({
      indisDates: ''
    });
  }

  addIndisDate(): void {
    this.indisDates().push(this.newIndisDate());
  }

  removeIndisDate(i: number): void {
    this.indisDates().removeAt(i);
  }

  resetDates(): void {
    this.addUserForm.reset();
    this.dates().clear();
    this.indisDates().clear();
  }

  async onSubmit(): Promise<void> {
    this.persons.push(await this.sUser.AddPerson(this.addUserForm.value));
    this.resetDates();
  }

  async deletePerson(id: number): Promise<void> {
    const res = await this.sUser.deletePerson(id);
    if (res) {
      this.persons.splice(this.persons.indexOf(this.persons.find(p => p.id === id)), 1);
    }
  }

  dateFormat(date: Date): string {
    return moment(date).format('DD/MM/YYYY');
  }
}
