import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Mail} from '../../../models/mail';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss']
})

export class MailComponent {

  @Input()
  mail: Mail;

  @Output()
  mailHasBeenSelected: EventEmitter<Mail> = new EventEmitter<Mail>();

  @Output()
  mailDeleted: EventEmitter<Mail> = new EventEmitter<Mail>();

  constructor() {

  }

  selectMail() {
    this.mailHasBeenSelected.emit(this.mail);
  }

  deleteMail() {
    this.mailDeleted.emit(this.mail);
  }
}
