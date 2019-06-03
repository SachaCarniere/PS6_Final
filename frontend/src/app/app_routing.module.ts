import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login';
import {StudentContainerComponent} from './students/student-container';
import {MailListComponent} from './mails/mail-list';
import {StudentDetailsComponent} from './students/student-details';
import {ColumnComponent} from './columns';
import {AuthGuardService} from '../services/authGuard.service';
import {RemindersComponent} from './reminders/reminders.component';
import {FiltersComponent} from './filters/filters.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},

  {path: '', component: StudentContainerComponent, canActivate: [AuthGuardService]},
  {path: 'students', component: StudentContainerComponent, canActivate: [AuthGuardService]},
  {path: 'students/:id', component: StudentDetailsComponent, canActivate: [AuthGuardService]},
  {path: 'filters', component: FiltersComponent, canActivate: [AuthGuardService]},
  {path: 'columns', component: ColumnComponent, canActivate: [AuthGuardService]},
  {path: 'reminders', component: RemindersComponent, canActivate: [AuthGuardService]},
  {path: 'mails', component: MailListComponent, canActivate: [AuthGuardService]},

  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
