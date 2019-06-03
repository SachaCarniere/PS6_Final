import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  public currentUser: User;
  public currentUser$: BehaviorSubject<User> = new BehaviorSubject(this.currentUser);

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    this.getUserWithId(authenticationService.currentUserValue.id);
  }

  private buildUser(response): User {
    const user: User = {};
    user.id = parseInt(response['id'], 10);
    user.firstName = response['firstName'];
    user.lastName = response['lastName'];
    user.emailAddress = response['emailAddress'];
    user.major = response['major'];
    return user;
  }

  public getUserWithId(id: number) {
    this.http.get('http://localhost:9428/api/users/' + id)
      .subscribe(user => {
        this.currentUser = this.buildUser(user);
        this.currentUser$.next(this.currentUser);
        localStorage.setItem('major', JSON.stringify(user['major']));
      });
  }
}
