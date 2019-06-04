import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Mail} from '../models/mail';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  private url = 'http://localhost:9428/api/mails/';

  private mailList: Mail[] = [];

  public mails$: BehaviorSubject<Mail[]> = new BehaviorSubject(this.mailList);

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    this.getMails();
  }

  private static buildMail(jsonObject: Mail): Mail {
    const newMail: Mail = {};
    newMail.id = jsonObject.id;
    newMail.title = jsonObject.title;
    newMail.message = jsonObject.message;
    return newMail;
  }

  public getMails() {
    this.http.get<Mail[]>(this.url + ((this.authenticationService.currentUserValue !== null) ? this.authenticationService.currentUserValue.id : '-1'))
      .subscribe(mails => {
        for (const mail of mails)/*let i = 0; i < mails.length; i++)*/ {
          this.mailList.push(MailService.buildMail(mail));
        }
        this.mails$.next(this.mailList);
      });
  }

  addMail(mail: Mail) {
    this.http.post(this.url, {
      userId: (this.authenticationService.currentUserValue !== null) ? this.authenticationService.currentUserValue.id : '-1',
      title: mail.title,
      message: mail.message
    }).subscribe(response => {
        this.mailList.push(MailService.buildMail(response));
        this.mails$.next(this.mailList);
      });
  }

  updateMail(mail: Mail, mailUpdate: Mail) {
    this.http.put(this.url + mail.id, {
      userId: (this.authenticationService.currentUserValue !== null) ? this.authenticationService.currentUserValue.id : '-1',
      id: mail.id,
      title: (mailUpdate.title !== null) ? mailUpdate.title : mail.title,
      message: (mailUpdate.message !== null) ? mailUpdate.message : mail.message
    }).subscribe(response => {
        this.mailList = [];
        this.getMails();
      });
  }

  deleteMail(mail: Mail) {
    this.http.delete(this.url + mail.id)
      .subscribe(response => {
        this.mailList = [];
        this.getMails();
      });
  }
}
