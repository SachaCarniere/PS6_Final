import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {AppointmentService} from '../../../services/appointment.service';
import {UserService} from '../../../services/user.service';
import {Student} from '../../../models/student';

@Component({
  selector: 'app-appointment-student',
  templateUrl: './appointment-student.component.html',
  styleUrls: ['./appointment-student.component.scss']
})
export class AppointmentStudentComponent implements OnInit {

  student: Student;
  headTeacher: User;

  constructor(private appointmentService: AppointmentService, private userService: UserService) {
    this.getStudent();
    this.getHeadTeacher();
  }

  ngOnInit(): void {
  }

  getStudent() {

  }

  getHeadTeacher() {
    switch (this.student.major) {
      case "SI":
        this.userService.getUserWithId(0);
      case "MAM":
        this.userService.getUserWithId(1);
      default:
        this.userService.getUserWithId(0);
    }
    this.headTeacher = this.userService.currentUser;
  }

  addInQueue(){
    this.appointmentService.getQueueByUserId(this.headTeacher.id);
    this.appointmentService.queue.queue.push(this.student.id);
    this.appointmentService.updateQueue(this.appointmentService.queue);
  }
}
