import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ReminderService} from '../../../services/reminder.service';
import {Reminder} from '../../../models/reminder';

@Component({
  selector: 'app-reminders-form',
  templateUrl: './reminders-form.component.html',
  styleUrls: ['./reminders-form.component.scss']
})
export class RemindersFormComponent implements OnInit {

  name: string;
  startDate: Date;
  endDate: Date;
  message: string;
  dismissed: boolean;

  editing: boolean;

  constructor(private formBuilder: FormBuilder, private reminderService: ReminderService) {
    reminderService.reminderToEdit$.subscribe(reminderToEdit => {
      if (reminderToEdit != null) {
        this.editing = true;
        this.name = reminderToEdit.name;
        this.startDate = new Date(reminderToEdit.startDate);
        this.endDate = new Date(reminderToEdit.endDate);
        this.message = reminderToEdit.message;
        this.dismissed = !reminderToEdit.dismissed;
      } else {
        this.editing = false;
        this.name = '';
        this.startDate = null;
        this.endDate = null;
        this.message = '';
        this.dismissed = true;
      }
    });
  }

  ngOnInit(): void {
  }

  onEdit() {
    this.reminderService.editReminder(this.buildReminderFromFrom());
  }

  onCreate() {
    this.reminderService.newReminder(this.buildReminderFromFrom());
    this.reminderService.selectToEditReminder(null);
  }

  onBack() {
    this.reminderService.selectToEditReminder(null);
  }

  private buildReminderFromFrom(): Reminder {
    return {
      name: this.name,
      startDate: this.startDate.toISOString(),
      endDate: this.endDate.toISOString(),
      message: this.message,
      dismissed: !this.dismissed
    };
  }
}
