import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {HomeRoutingModule} from './home.routing';
import {UsersComponent} from './users/users.component';
import {ReactiveFormsModule} from '@angular/forms';
import {PeriodeComponent} from './periode/periode.component';


@NgModule({
  declarations: [
    HomeComponent,
    UsersComponent,
    PeriodeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule
  ]
})
export class HomeModule {
}
