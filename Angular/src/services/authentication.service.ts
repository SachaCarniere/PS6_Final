import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../models/user';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private url = 'http://localhost:9428/api/users/';
  private readonly lastConnexion;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.lastConnexion = new Date();
  }

  static logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  login(emailAddress: string, password: string) {
    return this.http.post<any>(this.url + 'login/', {emailAddress, password})
      .pipe(map(userAndToken => {
        const user = userAndToken.user;
        user.token = userAndToken.token;
        // login successful if there's a jwt token in the response
        if (userAndToken && userAndToken.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);

          console.log(this.currentUserValue);
        }

        return user;
      }));
  }


  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public getLastConnexion(): Date {
    return this.lastConnexion;
  }
}
