import {Component, OnInit} from '@angular/core';
import {Column} from '../../../models/column';
import {ColumnService} from '../../../services/column.service';

@Component({
  selector: 'app-student-column-list',
  templateUrl: './student-column-list.component.html',
  styleUrls: ['student-column-list.component.scss']
})
export class StudentColumnListComponent implements OnInit {

  favoritesColumns: Column[];

  constructor(private columnService: ColumnService) {
    this.columnService.favoriteColumns$.subscribe(columns => this.favoritesColumns = columns);
  }

  ngOnInit(): void {
  }

  onClick(columnsToShow: string[]) {
    this.columnService.showColumns(columnsToShow);
  }

  onDefault() {
    this.columnService.showDefaultColumns();
  }
}
