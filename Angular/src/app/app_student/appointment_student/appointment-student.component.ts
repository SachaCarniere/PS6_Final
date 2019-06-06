import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {AppointmentService} from '../../../services/appointment.service';
import {Student} from '../../../models/student';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  selector: 'app-appointment-student',
  templateUrl: './appointment-student.component.html',
  styleUrls: ['./appointment-student.component.scss']
})
export class AppointmentStudentComponent implements OnInit {

  student: Student;
  register = false;
  // headTeacher: User;

  constructor(private appointmentService: AppointmentService, private authenticationService: AuthenticationService) {
    this.getStudent();
  }

  ngOnInit(): void {
  }

  getStudent() {
    this.student = this.authenticationService.currentStudent;
  }


  addInQueue(){
    this.appointmentService.getQueueByUser();
    if (!this.appointmentService.queue.queue.includes(this.student.id))
      this.appointmentService.queue.queue.push(this.student.id);
    this.appointmentService.updateQueue(this.appointmentService.queue);
    this.register=true;
  }
}
