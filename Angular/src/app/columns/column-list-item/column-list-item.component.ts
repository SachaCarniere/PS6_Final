import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Column} from "../../../models/column";

@Component({
  selector: 'app-column-list-item',
  templateUrl: './column-list-item.component.html',
  styleUrls: ['./column-list-item.component.scss']
})
export class ColumnListItemComponent implements OnInit {

  @Input() column: Column;

  @Output() columnDelete: EventEmitter<Column> = new EventEmitter();
  @Output() swapFavorite: EventEmitter<Column> = new EventEmitter();
  @Output() columnSelected: EventEmitter<Column> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  onDelete() {
    this.columnDelete.emit(this.column);
  }

  onFavorite() {
    this.swapFavorite.emit(this.column);
  }

  onSelect() {
    this.columnSelected.emit(this.column);
  }
}
