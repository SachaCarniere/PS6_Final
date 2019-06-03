import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Reminder} from '../../../models/reminder';

@Component({
  selector: 'app-reminders-list-item',
  templateUrl: './reminders-list-item.component.html',
  styleUrls: ['./reminders-list-item.component.scss']
})
export class RemindersListItemComponent implements OnInit {

  @Input() reminder: Reminder;

  @Output() reminderDeleted: EventEmitter<Reminder> = new EventEmitter();
  @Output() reminderSelected: EventEmitter<Reminder> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  onSelect() {
    this.reminderSelected.emit(this.reminder);
  }

  onDelete() {
    this.reminderDeleted.emit(this.reminder);
  }
}
