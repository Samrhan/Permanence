import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AppComponent} from './app.component';

const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', loadChildren: () => import(`./home/home.module`).then(m => m.HomeModule)},
  {path: '**', redirectTo: ''}
];

export const appRoutingModule = RouterModule.forRoot(routes);
