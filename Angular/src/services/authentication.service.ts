import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../models/user';
import {Student} from '../models/student';
import {stripUnnecessaryQuotes} from "@angular/compiler/src/render3/view/style_parser";

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public currentStudentSubject: BehaviorSubject<Student>;
  public currentStudent: Student;
  private url = 'http://localhost:9428/api/users/';
  private readonly lastConnexion;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentStudentSubject = new BehaviorSubject<Student>(JSON.parse(localStorage.getItem('currentUser')));
    this.lastConnexion = new Date();
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  login(emailAddress: string, password: string) {
    return this.http.post<any>(this.url + 'login/', {emailAddress, password})
      .pipe(map(userAndToken => {
        const user = userAndToken.user;
        user.token = userAndToken.token;
        // login successful if there's a jwt token in the response
        if (userAndToken && userAndToken.token && userAndToken.user.minor == undefined) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);

          //console.log(this.currentUserValue);
        }
        else {
          this.currentUserSubject.next({
            token: user.token
          });
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentStudentSubject.next(user);
          user.headTeacherId = this.getHeadTeacher(user);
          this.currentStudent=user;
        }

        return user;
      }));
  }

  private getHeadTeacher(student: Student) {
    switch (student.major) {
      case "SI":
        return 0;
      case "MAM":
        return 1;
      default:
        return 0;
    }
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public getLastConnexion(): Date {
    return this.lastConnexion;
  }
}
