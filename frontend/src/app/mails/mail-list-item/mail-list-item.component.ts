import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Mail} from '../../../models/mail';

@Component({
  selector: 'app-mail-list-item',
  templateUrl: './mail-list-item.component.html',
  styleUrls: ['./mail-list-item.component.scss']
})

export class MailListItemComponent {

  @Input()
  mail: Mail;

  @Output()
  mailHasBeenSelected: EventEmitter<Mail> = new EventEmitter<Mail>();

  constructor() {

  }

  selectMail() {
    this.mailHasBeenSelected.emit(this.mail);
  }
}
