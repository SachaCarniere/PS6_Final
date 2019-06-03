import {Component, OnInit} from '@angular/core';
import {Filter} from '../../../models/filter';
import {FilterService} from '../../../services/filter.service';
import {StudentService} from '../../../services/student.service';

@Component({
  selector: 'app-student-filter-list',
  templateUrl: './student-filter-list.component.html',
  styleUrls: ['./student-filter-list.component.scss']
})
export class StudentFilterListComponent implements OnInit {
  personalsFilters: any;

  constructor(private filterService: FilterService, private studentService: StudentService) {
    this.filterService.filtersToShow$.subscribe(filters => this.personalsFilters = filters)
  }

  ngOnInit() {
  }

  onClick(filter: Filter) {
    this.studentService.applyFilter(filter);
  }

  onDefault() {
    this.studentService.resetFilter();
  }
}
