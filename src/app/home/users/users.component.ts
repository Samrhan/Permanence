import {Component, OnInit} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  addUserForm: FormGroup;
  days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];


  constructor(private fb: FormBuilder) {
    this.addUserForm = this.fb.group({
      dates: this.fb.array([]),
      name: new FormControl(null),
      firstname: new FormControl(null),
      indisDay: new FormControl(null)
    });
  }

  dates(): FormArray {
    return this.addUserForm.get('dates') as FormArray;
  }

  ngOnInit(): void {
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

  resetDates(): void {
    this.addUserForm.reset();
    this.dates().clear();
  }

  onSubmit(): void {
    console.log(this.addUserForm.value);
  }
}
