import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Countries, Minors, Status, Student} from '../models/student';
import {BehaviorSubject} from 'rxjs';
import {Filter} from '../models/filter';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private url = 'http://localhost:9428/api/students/';

  private allStudent: Student[] = [];
  private studentList: Student[] = [];

  public students$: BehaviorSubject<Student[]> = new BehaviorSubject(this.studentList);

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    this.getStudents();
  }

  private static buildStudent(jsonObject: Object): Student {
    const newStudent: Student = {};
    newStudent.id = jsonObject['id'];
    newStudent.firstName = jsonObject['firstName'];
    newStudent.lastName = jsonObject['lastName'];
    newStudent.emailAddress = jsonObject['emailAddress'];
    newStudent.major = jsonObject['major'];
    newStudent.minor = jsonObject['minor'];
    newStudent.year = jsonObject['year'];
    newStudent.status = jsonObject['status'];
    newStudent.location = jsonObject['location'];
    newStudent.daysAbroad = jsonObject['daysAbroad'];
    newStudent.minorFullName = Minors[newStudent.minor];
    newStudent.statusFullName = Status[newStudent.status];
    newStudent.locationFullName = Countries[newStudent.location];
    return newStudent;
  }

  public getStudents() {
    this.http.get<Student[]>(this.url + ((this.authenticationService.currentUserValue !== null) ? this.authenticationService.currentUserValue.id : '-1'))
      .subscribe(students => {
        for (const student of students)/*let i = 0; i < students.length; i++)*/ {
          this.allStudent.push(StudentService.buildStudent(student));
        }
        this.studentList = this.allStudent;
        this.students$.next(this.studentList);
      });
  }

  public updateStudent(student: Student) {
    this.http.put(this.url + student.id, {
      firstName: student.firstName,
      lastName: student.lastName,
      emailAddress: student.emailAddress,
      major: student.major,
      minor: student.minor,
      year: student.year,
      status: student.status,
      location: student.location,
      daysAbroad: student.daysAbroad
    }).subscribe(updatedStudent => {
      const studentUpdated = this.studentList.find(studentInList => studentInList.id === student.id);
      studentUpdated.status = updatedStudent['status'];
      studentUpdated.location = updatedStudent['location'];
      studentUpdated.daysAbroad = updatedStudent['daysAbroad'];
      studentUpdated.statusFullName = Status[studentUpdated.status];
      studentUpdated.locationFullName = Countries[studentUpdated.location];

      this.students$.next(this.studentList);
    });
  }

  public getStudentById(id): Student {
    return this.studentList.find(student => student.id === id);
  }

  applyFilter(filter: Filter) {
    const newList = [];
    for (const student of this.allStudent) {
      if ((student.year === 3 && filter.year3) || (student.year === 4 && filter.year4) || (student.year === 5 && filter.year5)) {
        if ((student.statusFullName === Status.CLASS && filter.statusClass) || (student.statusFullName === Status.INTERN && filter.statusIntern) || (student.statusFullName === Status.GAPYEAR && filter.statusGapYear)) {
          if (filter.minors.filter(minor => student.minor === minor).length > 0 || filter.minors.length === 0 || student.year === 3 || student.year === 4) {
            if (filter.moreThan && student.daysAbroad >= filter.daysAbroad || !filter.moreThan && student.daysAbroad <= filter.daysAbroad) {
              if (student.location === filter.location || filter.location === '') {
                newList.push(student);
              }
            }
          }
        }
      }
    }
    this.studentList = newList;
    this.students$.next(newList);
  }

  resetFilter() {
    this.studentList = this.allStudent;
    this.students$.next(this.studentList);
  }
}
