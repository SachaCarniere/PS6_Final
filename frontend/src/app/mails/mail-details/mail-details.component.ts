import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Mail} from '../../../models/mail';
import {MailService} from '../../../services/mail.service';

@Component({
  selector: 'app-mail-details',
  templateUrl: './mail-details.component.html',
  styleUrls: ['./mail-details.component.scss']
})

export class MailDetailsComponent implements OnChanges {

  @Input()
  mailSelected: Mail;

  @Output()
  return: EventEmitter<boolean> = new EventEmitter<boolean>();

  object: string;
  message: string;

  editing: boolean;

  constructor(public mailService: MailService) {
    this.changeForm();
  }

  addMail() {
    this.mailService.addMail(this.buildMailFromForm());
    this.changeForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.changeForm();
  }

  returnButton() {
    this.return.emit(true);
  }

  onCreate() {
    this.addMail();
  }

  onEdit() {
    this.mailService.updateMail(this.mailSelected, this.buildMailFromForm());
    this.returnButton();
  }

  onBack() {
    this.mailSelected = null;
    this.changeForm();
    this.returnButton();
  }

  private changeForm() {
    if (this.mailSelected == null) {
      this.editing = false;
      this.object = '';
      this.message = '';
    } else {
      this.editing = true;
      this.object = this.mailSelected.title;
      this.message = this.mailSelected.message;
    }
  }

  private buildMailFromForm(): Mail {
    return {
      title: this.object,
      message: this.message
    };
  }
}
