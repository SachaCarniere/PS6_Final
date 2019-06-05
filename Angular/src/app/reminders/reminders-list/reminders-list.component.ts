import {Component, OnInit} from '@angular/core';
import {Reminder} from '../../../models/reminder';
import {ReminderService} from '../../../services/reminder.service';

@Component({
  selector: 'app-reminders-list',
  templateUrl: './reminders-list.component.html',
  styleUrls: ['./reminders-list.component.scss']
})
export class RemindersListComponent implements OnInit {
  remindersList: Reminder[] = [];

  constructor(private reminderService: ReminderService) {
    this.reminderService.reminders$.subscribe(reminders => this.remindersList = reminders);
  }

  ngOnInit(): void {
  }

  deleteReminder(reminderToDelete: Reminder) {
    this.reminderService.deleteReminder(reminderToDelete);
  }

  selectReminder(reminderToEdit: Reminder) {
    this.reminderService.selectToEditReminder(reminderToEdit);
  }
}
