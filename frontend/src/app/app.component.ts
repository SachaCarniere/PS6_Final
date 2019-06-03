import {Component} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {DialogChooseMailComponent} from "./mails/dialog-choose-mail";
import {MatDialog} from "@angular/material";
import {ReminderPopUpComponent} from "./reminders/reminder-pop-up/reminder-pop-up.component";
import {ReminderService} from "../services/reminder.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  showHead: boolean = false;

  constructor(private router: Router, private dialog: MatDialog, private reminderService: ReminderService) {

    // on route change to '/login', set the variable showHead to false
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        const regExp = /\/login*/;
        this.showHead = !regExp.test(event['url']);
      }
    });

    this.showReminders();
  }

  showReminders() {
    this.reminderService.remindersOfTheDay$.subscribe(reminders => {
      if (reminders[0] != null) {
        const dialogRef = this.dialog.open(ReminderPopUpComponent, {
          width: '80%',
          data: {reminders: reminders}
        });

        dialogRef.afterClosed().subscribe(result => {
          result.forEach(reminder => this.reminderService.swapReminderDismissed(reminder));
        });
      }
    });
  }
}
