import {Component} from '@angular/core';
import {Student} from '../../../models/student';
import {StudentService} from '../../../services/student.service';
import {Router} from '@angular/router';
import {ColumnService} from '../../../services/column.service';
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent {
  public selection;
  public studentList: Student[] = [];

  public displayedColumns: string[];
  public columnsToShow: string[];
  public studentsData: MatTableDataSource<Student>;

  constructor(public studentService: StudentService, private columnService: ColumnService, private router: Router) {
    this.selection = new SelectionModel<Student>(true, []);
    this.studentService.students$.subscribe(students => {
      this.studentList = students;
      this.studentsData = new MatTableDataSource(this.studentList);
    });

    this.displayedColumns = this.columnService.displayedColumns;

    this.columnService.columnsToShow$.subscribe(columns => this.columnsToShow = columns);
  }

  onRowClicked(row) {
    this.router.navigate(['students/' + row.id]);
  }

  applyFilter(filterValue: string) {
    console.log(filterValue.trim().toLocaleLowerCase());
    this.studentsData.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.studentsData.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.studentsData.data.forEach(row => this.selection.select(row));
  }
}
