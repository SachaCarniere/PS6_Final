import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {StudentService} from '../../../services/student.service';
import {Student} from '../../../models/student';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})

export class StudentDetailsComponent {
  student: Student;
  dayAbroadNbs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40];
  selectedNb: number;
  modificationDate = '';
  isModifying = false;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private location: Location
  ) {
    this.getStudent();
  }

  getStudent(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.student = this.studentService.getStudentById(id);
  }

  goBack(): void {
    this.location.back();
  }

  modifying(): void {
    this.isModifying = !this.isModifying;
  }

  validate() {
    this.modifying();
    console.log(this.student.statusFullName);
    this.studentService.updateStudent(this.student);
    if (this.student.daysAbroad !== this.selectedNb) {
      this.setModificationDate();
    }
    this.getStudent();
    console.log(this.student.statusFullName);
  }

  private setModificationDate(): void {
    const n = new Date();
    const y = n.getFullYear();
    const m = n.getMonth() + 1;
    const d = n.getDate();
    const h = n.getHours();
    const min = n.getMinutes();
    this.modificationDate = 'Modifié le ' + d + '/' + m + '/' + y + ' à ' + h + ':' + min;
  }
}
