import { Component, OnInit } from '@angular/core';
import {Filter} from '../../../models/filter';
import {FilterService} from '../../../services/filter.service';

@Component({
  selector: 'app-filters-list',
  templateUrl: './filters-list.component.html',
  styleUrls: ['./filters-list.component.scss']
})
export class FiltersListComponent implements OnInit {
  filters: Filter[];

  constructor(private filterService: FilterService) {
    this.filterService.filters$.subscribe(filters => {
      this.filters = filters;
    });
  }

  ngOnInit() {
  }

  swapFilterFavorite(filterToSwap: Filter) {
    this.filterService.swapFilterFavorite(filterToSwap);
  }

  selectFilterToEdit(filterToEdit: Filter) {
    this.filterService.selectFilterToEdit(filterToEdit);
  }

  deleteFilter(filterToDelete: Filter) {
    this.filterService.deleteFilter(filterToDelete);
  }
}
