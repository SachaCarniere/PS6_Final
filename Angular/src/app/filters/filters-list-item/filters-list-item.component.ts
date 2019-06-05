import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Filter} from '../../../models/filter';

@Component({
  selector: 'app-filters-list-item',
  templateUrl: './filters-list-item.component.html',
  styleUrls: ['./filters-list-item.component.scss']
})
export class FiltersListItemComponent implements OnInit {

  @Input() filter: Filter;

  @Output() filterFavorite: EventEmitter<Filter> = new EventEmitter();
  @Output() filterSelected: EventEmitter<Filter> = new EventEmitter();
  @Output() filterDeleted: EventEmitter<Filter> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onFavorite() {
    this.filterFavorite.emit(this.filter);
  }

  onSelect() {
    this.filterSelected.emit(this.filter);
  }

  onDelete() {
    this.filterDeleted.emit(this.filter);
  }
}
