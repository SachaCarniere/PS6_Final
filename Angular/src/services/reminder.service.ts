import {Reminder} from '../models/reminder';
import {BehaviorSubject} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {
  private url = 'http://localhost:9428/api/reminders/';


  private reminderToEdit: Reminder;
  public reminderToEdit$: BehaviorSubject<Reminder> = new BehaviorSubject(this.reminderToEdit);
  private reminderOfTheDayList: Reminder[] = [];
  public remindersOfTheDay$: BehaviorSubject<Reminder[]> = new BehaviorSubject(this.reminderOfTheDayList);
  private reminderList: Reminder[] = [];
  public reminders$: BehaviorSubject<Reminder[]> = new BehaviorSubject(this.reminderList);

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    this.getReminders();
  }

  private static buildReminder(jsonObject: Object): Reminder {
    return {
      id: jsonObject['id'],
      name: jsonObject['name'],
      startDate: jsonObject['startDate'],
      endDate: jsonObject['endDate'],
      message: jsonObject['message'],
      dismissed: jsonObject['dismissed']
    };
  }

  newReminder(newReminder: Reminder) {
    this.http.post(this.url, {
      userId: ((this.authenticationService.currentUserValue !== null) ? this.authenticationService.currentUserValue.id : '-1'),
      name: newReminder.name,
      startDate: newReminder.startDate,
      endDate: newReminder.endDate,
      message: newReminder.message,
      dismissed: newReminder.dismissed
    }).subscribe(reminder => {
      this.reminderList.push(reminder);
      this.reminders$.next(this.reminderList);

      const now = new Date().toISOString();
      if (newReminder.startDate <= now && now <= newReminder.endDate && !newReminder.dismissed) {
        this.reminderOfTheDayList.push(newReminder);
      }
      this.remindersOfTheDay$.next(this.reminderOfTheDayList);
    });
  }

  deleteReminder(reminderToDelete: Reminder) {
    this.http.delete(this.url + reminderToDelete.id)
      .subscribe(() => {
        this.reminderList.splice(this.reminderList.indexOf(reminderToDelete), 1);
        this.reminders$.next(this.reminderList);

        if (reminderToDelete.id == this.reminderToEdit.id) {
          this.reminderToEdit = null;
          this.reminderToEdit$.next(this.reminderToEdit);
        }

        const now = new Date().toISOString();
        if (reminderToDelete.startDate <= now && now <= reminderToDelete.endDate && !reminderToDelete.dismissed) {
          this.reminderOfTheDayList.splice(this.reminderOfTheDayList.indexOf(reminderToDelete), 1);
          this.remindersOfTheDay$.next(this.reminderOfTheDayList);
        }
      })
  }

  selectToEditReminder(reminderToEdit: Reminder) {
    this.reminderToEdit = reminderToEdit;
    this.reminderToEdit$.next(this.reminderToEdit);
  }

  editReminder(reminderFromForm: Reminder) {
    this.http.put(this.url + this.reminderToEdit.id, {
      name: reminderFromForm.name,
      startDate: reminderFromForm.startDate,
      endDate: reminderFromForm.endDate,
      message: reminderFromForm.message,
      dismissed: reminderFromForm.dismissed
    }).subscribe(() => {
      const editedReminder = this.reminderList[this.reminderList.indexOf(this.reminderToEdit)];
      editedReminder.name = reminderFromForm.name;
      editedReminder.startDate = reminderFromForm.startDate;
      editedReminder.endDate = reminderFromForm.endDate;
      editedReminder.message = reminderFromForm.message;
      editedReminder.dismissed = reminderFromForm.dismissed;
      this.reminders$.next(this.reminderList);

      this.reminderToEdit = null;
      this.reminderToEdit$.next(this.reminderToEdit);

      const index: number = this.reminderOfTheDayList.indexOf(this.reminderToEdit);
      if (index != -1) {
        if (editedReminder.dismissed) {
          this.reminderOfTheDayList.push(editedReminder);
          this.remindersOfTheDay$.next(this.reminderOfTheDayList);
        }
      } else {
        if (!editedReminder.dismissed) {
          this.reminderOfTheDayList.splice(index, 1);
          this.remindersOfTheDay$.next(this.reminderOfTheDayList);
        }
      }
    })
  }

  swapReminderDismissed(reminderToEdit: Reminder) {
    this.http.put(this.url + reminderToEdit.id, {
      dismissed: !reminderToEdit.dismissed
    }).subscribe(() => {
      this.reminderList[this.reminderList.indexOf(reminderToEdit)].dismissed = !reminderToEdit.dismissed;
      this.reminders$.next(this.reminderList);
    })
  }

  private getReminders() {
    this.http.get<Reminder[]>(this.url + ((this.authenticationService.currentUserValue !== null) ? this.authenticationService.currentUserValue.id : '-1'))
      .subscribe(reminders => {
        const now = new Date().toISOString();
        for (const reminder of reminders) {
          const newReminder = ReminderService.buildReminder(reminder);
          if (this.authenticationService.getLastConnexion().toISOString() <= newReminder.startDate && now <= newReminder.startDate) {
            newReminder.dismissed = false;
          }
          if (newReminder.startDate <= now && now <= newReminder.endDate && !newReminder.dismissed) {
            console.log("oui");
            this.reminderOfTheDayList.push(newReminder);
          }
          this.reminderList.push(newReminder);
        }
        this.reminders$.next(this.reminderList);
        this.remindersOfTheDay$.next(this.reminderOfTheDayList);
      });
  }
}
