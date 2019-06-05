import {Component , } from '@angular/core';
import {Mail} from '../../../models/mail';
import {MailService} from '../../../services/mail.service';


@Component({
  selector: 'app-mail-list',
  templateUrl: './mail-list.component.html',
  styleUrls: ['./mail-list.component.scss']
})
export class MailListComponent {
  public mailList: Mail[] = [];
  public mailSelected: Mail;

  constructor(public mailService: MailService) {
    this.mailService.mails$.subscribe(mails => this.mailList = mails);
  }

  mailDelete(deleted: Mail) {
    this.mailService.deleteMail(deleted);
    this.mailSelected = null;
  }

  mailHasBeenSelected(hasBeenSelected: Mail) {
    this.mailSelected = hasBeenSelected;
  }

  return($event: boolean) {
    if ($event) {
      this.mailSelected = null;
    }
  }
}
