import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Reminder} from "../../../models/reminder";

@Component({
  selector: 'app-reminder-pop-up-item',
  templateUrl: './reminder-pop-up-item.component.html',
  styleUrls: ['./reminder-pop-up-item.component.scss']
})
export class ReminderPopUpItemComponent implements OnInit {

  @Input() reminder: Reminder;
  @Output() onChangeEmitter: EventEmitter<Reminder> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onDismissedChange() {
    this.onChangeEmitter.emit(this.reminder);
  }
}
