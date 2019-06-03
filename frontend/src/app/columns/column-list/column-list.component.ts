import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Column} from '../../../models/column';
import {ColumnService} from '../../../services/column.service';

@Component({
  selector: 'app-column-list',
  templateUrl: './column-list.component.html',
  styleUrls: ['./column-list.component.scss']
})
export class ColumnListComponent implements OnInit {

  columns: Column[];

  constructor(private columnService: ColumnService) {
    this.columnService.personalColumns$.subscribe(columns => this.columns = columns);
  }

  ngOnInit(): void {
  }

  deleteColumn(column: Column) {
    this.columnService.deleteColumn(column);
  }

  swapFavorite(column: Column) {
    this.columnService.swapFavorite(column);
  }

  selectColumn(column: Column) {
    this.columnService.selectToEdit(column);
  }
}
