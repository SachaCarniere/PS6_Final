import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ColumnService} from '../../../services/column.service';
import {Column} from '../../../models/column';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-column-form',
  templateUrl: './column-form.component.html',
  styleUrls: ['./column-form.component.scss']
})
export class ColumnFormComponent implements OnInit {

  name: string;
  startDate: Date;
  endDate: Date;
  checkId: boolean;
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  year: boolean;
  daysAbroad: boolean;
  minor: boolean;
  status: boolean;
  location: boolean;

  editing: boolean;

  constructor(private formBuilder: FormBuilder, private columnService: ColumnService,) {
    this.columnService.columnToEdit$.subscribe(column => {
        if (column != null) {
          this.editing = true;
          this.name = column.name;
          this.startDate = new Date(column.startDate);
          this.endDate = new Date(column.endDate);
          this.checkId = column.checkId;
          this.firstName = column.firstName;
          this.lastName = column.lastName;
          this.email = column.email;
          this.year = column.year;
          this.daysAbroad = column.daysAbroad;
          this.minor = column.minor;
          this.status = column.status;
          this.location = column.location;
        } else {
          this.editing = false;
          this.name = '';
          this.startDate = null;
          this.endDate = null;
          this.checkId = true;
          this.firstName = true;
          this.lastName = true;
          this.email = true;
          this.year = true;
          this.daysAbroad = true;
          this.minor = true;
          this.status = true;
          this.location = true;
        }
      }
    );
  }

  ngOnInit(): void {
  }

  onCreate() {
    this.columnService.createNewCol(this.getColumnFromForm());
    this.columnService.selectToEdit(null);
  }

  onEdit() {
    this.columnService.editColumn(this.getColumnFromForm());
  }

  onBack() {
    this.columnService.selectToEdit(null);
  }

  private getColumnFromForm(): Column {
    const formColumn: Column = {
      name: this.name,
      startDate: this.startDate.toISOString(),
      endDate: this.endDate.toISOString(),
      checkId: this.checkId,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      year: this.year,
      daysAbroad: this.daysAbroad,
      minor: this.minor,
      status: this.status,
      location: this.location
    };

    formColumn.columnsToShow = [];
    // formColumn.columnsToShow.push('select');
    if (formColumn.id) {
      formColumn.columnsToShow.push('id');
    }
    if (formColumn.firstName) {
      formColumn.columnsToShow.push('firstName');
    }
    if (formColumn.lastName) {
      formColumn.columnsToShow.push('lastName');
    }
    if (formColumn.email) {
      formColumn.columnsToShow.push('emailAddress');
    }
    if (formColumn.year) {
      formColumn.columnsToShow.push('year');
    }
    if (formColumn.daysAbroad) {
      formColumn.columnsToShow.push('daysAbroad');
    }
    if (formColumn.minor) {
      formColumn.columnsToShow.push('minorFullName');
    }
    if (formColumn.status) {
      formColumn.columnsToShow.push('statusFullName');
    }
    if (formColumn.location) {
      formColumn.columnsToShow.push('locationFullName');
    }


    if (formColumn.startDate != "") {
      const now: string = new Date().toISOString();
      formColumn.favorite = formColumn.startDate <= now && now <= formColumn.endDate;
    }

    return formColumn;
  }
}
