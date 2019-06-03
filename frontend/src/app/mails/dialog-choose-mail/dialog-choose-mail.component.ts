import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {MailToButtonComponent} from '../mailto-button';
import {MailService} from '../../../services/mail.service';
import {Mail} from '../../../models/mail';
import {StudentService} from '../../../services/student.service';
import {Student} from '../../../models/student';

@Component({
  selector: 'app-dialog-choose-mail',
  templateUrl: 'dialog-choose-mail.component.html',
  styleUrls: ['./dialog-choose-mail.component.scss']
})
export class DialogChooseMailComponent {
  mailToLink: string;
  mailSelected: Mail;
  mails: Mail[];
  students: Student[];

  constructor(public dialogRef: MatDialogRef<MailToButtonComponent>, public mailService: MailService, public studentService: StudentService) {
      this.mailService.mails$.subscribe(mails => this.mails = mails);
      this.studentService.students$.subscribe(students => this.students = students);
  }

  displayMailContent(mail: Mail) {
    this.mailSelected = mail;
    this.mailToLink = '';
    for (const student of this.students) {
      this.mailToLink += student.emailAddress;
      this.mailToLink += ',';
    }
    this.mailToLink = this.mailToLink.slice(0, -1);
    this.mailToLink += '?subject=' + mail.title + '&body=' + mail.message;
  }
}
