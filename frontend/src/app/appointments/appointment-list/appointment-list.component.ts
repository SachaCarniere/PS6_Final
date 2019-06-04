import {Component, OnInit} from '@angular/core';
import {Student} from "../../../models/student";
import {Queue} from "../../../models/queue";
import {AppointmentService} from "../../../services/appointment.service";
import {StudentService} from "../../../services/student.service";

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})

export class AppointmentListComponent implements OnInit {

  studentsInQueue: Student[] = [];

  private queue: Queue;

  displayedColumns: string[] = ['firstName', 'id'];
  dataSource = this.studentsInQueue;

  constructor(private appointmentService: AppointmentService, private studentService: StudentService) {
    this.getQueue();
    this.getStudents();
  }

  getQueue(): void {
    this.queue = this.appointmentService.getQueue();
  }

  getStudents() {
    for (let studentId of this.queue.queue) {
      if(this.studentService.getStudentById(studentId)) {
        this.studentsInQueue.push(this.studentService.getStudentById(studentId));
      }
    }
  }

  ngOnInit(): void {
  }
}
