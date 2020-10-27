import {Component, OnInit} from '@angular/core';

import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {UserService} from './service/user.service';

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
      disDay: new FormControl(null),
      name: new FormControl(null),
      firstname: new FormControl(null),
      indisDay: new FormControl(null),
      indisDates: this.fb.array([])
    });
  }

  dates(): FormArray {
    return this.addUserForm.get('dates') as FormArray;
  }

  async ngOnInit(): Promise<void> {
    this.persons = await this.sUser.fetchPersons();
  }

  newDate(): FormGroup {
    return this.fb.group({
      date: new Date().toLocaleDateString('fr-FR')
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
      indisDates: new Date().toLocaleDateString('fr-FR')
    });
  }

  addIndisDate(): void {
    this.indisDates().push(this.newDate());
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
}
