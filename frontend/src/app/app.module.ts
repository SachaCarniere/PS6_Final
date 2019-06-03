import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app_routing.module';
import {LoginComponent} from './login';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StudentContainerComponent} from './students/student-container';
import {StudentListComponent} from './students/student-list';
import {HeaderComponent} from './header/header.component';
import {MailComponent} from './mails/mail';
import {MailListComponent} from './mails/mail-list';
import {StudentDetailsComponent} from './students/student-details';
import {MailDetailsComponent} from './mails/mail-details';
import {ColumnComponent} from './columns';
import {MailToButtonComponent} from './mails/mailto-button';
import {DialogChooseMailComponent} from './mails/dialog-choose-mail';
import {
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule,
  MatTableModule,
  MatListModule,
  MatDatepickerModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule
} from '@angular/material';
import {MailListItemComponent} from './mails/mail-list-item';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ColumnListComponent} from './columns/column-list/column-list.component';
import {ColumnListItemComponent} from './columns/column-list-item/column-list-item.component';
import {ColumnFormComponent} from './columns/column-form/column-form.component';
import {JwtInterceptor} from '../utils/jwt.interceptor';
import {ErrorInterceptor} from '../utils/error.interceptor';
import {StudentColumnListComponent} from './students/student-column-list/student-column-list.component';
import {RemindersComponent} from './reminders/reminders.component';
import {RemindersListComponent} from './reminders/reminders-list/reminders-list.component';
import {RemindersListItemComponent} from './reminders/reminders-list-item/reminders-list-item.component';
import {RemindersFormComponent} from './reminders/reminders-form/reminders-form.component';
import {DatePipe} from '@angular/common';
import {FiltersComponent} from './filters/filters.component';
import { FiltersListComponent } from './filters/filters-list/filters-list.component';
import { FiltersListItemComponent } from './filters/filters-list-item/filters-list-item.component';
import { FiltersFormComponent } from './filters/filters-form/filters-form.component';
import { StudentFilterListComponent } from './students/student-filter-list/student-filter-list.component';
import { ReminderPopUpComponent } from './reminders/reminder-pop-up/reminder-pop-up.component';
import { ReminderPopUpItemComponent } from './reminders/reminder-pop-up-item/reminder-pop-up-item.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StudentContainerComponent,
    StudentListComponent,
    StudentDetailsComponent,
    StudentColumnListComponent,
    HeaderComponent,
    MailComponent,
    MailListComponent,
    MailDetailsComponent,
    MailToButtonComponent,
    DialogChooseMailComponent,
    MailListItemComponent,
    ColumnComponent,
    ColumnListComponent,
    ColumnListItemComponent,
    ColumnFormComponent,
    RemindersComponent,
    RemindersListComponent,
    RemindersListItemComponent,
    RemindersFormComponent,
    ReminderPopUpComponent,
    FiltersComponent,
    FiltersListComponent,
    FiltersListItemComponent,
    FiltersFormComponent,
    StudentFilterListComponent,
    ReminderPopUpItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule
  ],
  entryComponents: [
    MailToButtonComponent,
    DialogChooseMailComponent,
    MailListItemComponent,
    MailComponent,
    ReminderPopUpComponent

  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
