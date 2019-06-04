import {Component, OnInit} from '@angular/core';
import {AmazingTimePickerService} from 'amazing-time-picker';
import {FormBuilder} from '@angular/forms';


@Component({
  selector: 'app-appointment-available',
  templateUrl: './appointment-available.component.html',
  styleUrls: ['./appointment-available.component.scss']
})
export class AppointmentAvailableComponent implements OnInit {
  date: Date;
  startHour: string;
  endHour: string;

  constructor(private formBuilder: FormBuilder, // this line you need
  ) {
    this.startHour = '19:00';
    this.endHour = '20:00';
    this.date = null;
  }

  ngOnInit(): void {
  }
}
