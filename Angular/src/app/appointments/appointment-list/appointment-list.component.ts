import {Component, OnInit} from '@angular/core';
import {Student} from "../../../models/student";
import {Queue} from "../../../models/queue";
import {AppointmentService} from '../../../services/appointment.service';
import {StudentService} from '../../../services/student.service';
import {MatTableDataSource} from '@angular/material';
import {Router} from "@angular/router";

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})

export class AppointmentListComponent implements OnInit {

  studentsInQueue: Student[] = [];

  private queue: Queue;

  displayedColumns: string[] = ['id','firstName','lastName'];
  dataSource: MatTableDataSource<Student>;

  constructor(private appointmentService: AppointmentService, private studentService: StudentService, private router: Router) {
    this.appointmentService.queue$.subscribe(queue => {
      this.queue = queue;
      this.getStudents();
    });
  }

  getStudents() {
    for (let studentId of this.queue.queue) {
      if(this.studentService.getStudentById(studentId)) {
        this.studentsInQueue.push(this.studentService.getStudentById(studentId));
      }
    }
    this.dataSource = new MatTableDataSource(this.studentsInQueue);
  }

  onRowClicked(row) {
    this.router.navigate(['students/' + row.id]);
  }

  ngOnInit(): void {
  }
}
