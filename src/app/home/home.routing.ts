import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home.component';
import {NgModule} from '@angular/core';
import {MainCalendarComponent} from './main-calendar/main-calendar.component';
import {UsersComponent} from './users/users.component';

const routes: Routes = [
  {path: '', component: HomeComponent, children: [
      {path: '', component: MainCalendarComponent},
      {path: 'users', component: UsersComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}

