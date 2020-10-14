import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {HomeRoutingModule} from './home.routing';
import { UsersComponent } from './users/users.component'; // a plugin




@NgModule({
  declarations: [
    HomeComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule {
}
