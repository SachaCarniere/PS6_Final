import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {MailToButtonComponent} from "../../mails/mailto-button";
import {AppComponent} from "../../app.component";
import {ReminderService} from "../../../services/reminder.service";
import {Reminder} from "../../../models/reminder";

@Component({
  selector: 'app-reminder-pop-up',
  templateUrl: './reminder-pop-up.component.html',
  styleUrls: ['./reminder-pop-up.component.scss']
})
export class ReminderPopUpComponent {

  reminders: Reminder[];
  remindersToEdit: Reminder[] = [];

  constructor(public dialogRef: MatDialogRef<AppComponent>, private reminderService: ReminderService, @Inject(MAT_DIALOG_DATA) data) {
    this.reminders = data.reminders;
  }

  swapReminderDismissed(reminderToEdit: Reminder) {
    console.log(this.remindersToEdit.indexOf(reminderToEdit));
    const rank: number = this.remindersToEdit.indexOf(reminderToEdit);
    if (rank == -1) {
      this.remindersToEdit.push(reminderToEdit);
    } else {
      this.remindersToEdit.splice(rank, 1);
    }
  }
}
