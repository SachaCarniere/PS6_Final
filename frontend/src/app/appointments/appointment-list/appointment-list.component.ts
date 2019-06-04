import {Component, OnInit} from '@angular/core';
import {Student} from "../../../models/student";

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})

export class AppointmentListComponent implements OnInit {

  studentsInQueue: Student[] = [
    { id: 11, firstName: 'Dr Nice' },
    { id: 12, firstName: 'Narco' },
    { id: 13, firstName: 'Bombasto' },
    { id: 14, firstName: 'Celeritas' },
    { id: 15, firstName: 'Magneta' },
    { id: 16, firstName: 'RubberMan' },
    { id: 17, firstName: 'Dynama' },
    { id: 18, firstName: 'Dr IQ' },
    { id: 19, firstName: 'Magma' },
    { id: 20, firstName: 'Tornado' }
  ];

  displayedColumns: string[] = ['firstName', 'id'];
  dataSource = this.studentsInQueue;

  constructor() {
  }

  ngOnInit(): void {
  }
}
