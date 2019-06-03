import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Filter} from '../models/filter';
import {AuthenticationService} from './authentication.service';
import {MAMMinors, SIMinors} from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private url = 'http://localhost:9428/api/filters/';

  private filterToShowList: Filter[] = [];
  public filtersToShow$: BehaviorSubject<Filter[]> = new BehaviorSubject(this.filterToShowList);
  private filterList: Filter[] = [];
  public filters$: BehaviorSubject<Filter[]> = new BehaviorSubject(this.filterList);
  private filterToEdit: Filter;
  public filterToEdit$: BehaviorSubject<Filter> = new BehaviorSubject(this.filterToEdit);

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    this.getFilters();
  }

  deleteFilter(filterToDelete: Filter) {
    this.http.delete(this.url + filterToDelete.id).subscribe(() => {
      this.filterList.splice(this.filterList.indexOf(filterToDelete), 1);
      this.filters$.next(this.filterList);
      if (filterToDelete === this.filterToEdit) {
        this.selectFilterToEdit(null);
      }
      if (filterToDelete.favorite) {
        this.filterToShowList.splice(this.filterToShowList.indexOf(filterToDelete), 1);
        this.filtersToShow$.next(this.filterToShowList);
      }
    });
  }

  postFilter(newFilter: Filter) {
    this.http.post(this.url, {
      userId: ((this.authenticationService.currentUserValue !== null) ? this.authenticationService.currentUserValue.id : '-1'),
      name: newFilter.name,
      startDate: newFilter.startDate,
      endDate: newFilter.endDate,
      year3: newFilter.year3,
      year4: newFilter.year4,
      year5: newFilter.year5,
      minors: newFilter.minors,
      statusClass: newFilter.statusClass,
      statusIntern: newFilter.statusIntern,
      statusGapYear: newFilter.statusGapYear,
      location: newFilter.location,
      moreThan: newFilter.moreThan,
      daysAbroad: newFilter.daysAbroad
    }).subscribe(filter => {
      const newFilter: Filter = this.buildFilter(filter);
      this.filterList.push(newFilter);
      this.filters$.next(this.filterList);

      if (newFilter.favorite) {
        this.filterToShowList.push(newFilter);
        this.filtersToShow$.next(this.filterToShowList);
      }
    });
  }

  swapFilterFavorite(filterToSwap: Filter) {
    this.http.put(this.url + filterToSwap.id, {
      favorite: !filterToSwap.favorite
    }).toPromise().then(() => {
      this.filterList[this.filterList.indexOf(filterToSwap)].favorite = !filterToSwap.favorite;
      this.filters$.next(this.filterList);
      this.updateFiltersToShow();
    });
  }

  selectFilterToEdit(filterToEdit: Filter) {
    this.filterToEdit = filterToEdit;
    this.filterToEdit$.next(filterToEdit);
  }

  editFilter(filterFromForm: Filter) {
    this.http.put(this.url + this.filterToEdit.id, {
      name: filterFromForm.name,
      startDate: filterFromForm.startDate,
      endDate: filterFromForm.endDate,
      year3: filterFromForm.year3,
      year4: filterFromForm.year4,
      year5: filterFromForm.year5,
      minors: filterFromForm.minors,
      statusClass: filterFromForm.statusClass,
      statusIntern: filterFromForm.statusIntern,
      statusGapYear: filterFromForm.statusGapYear,
      location: filterFromForm.location,
      moreThan: filterFromForm.moreThan,
      daysAbroad: filterFromForm.daysAbroad
    }).subscribe(() => {
      const editedFilter = this.filterList[this.filterList.indexOf(this.filterToEdit)];
      editedFilter.name = filterFromForm.name;
      editedFilter.startDate = filterFromForm.startDate;
      editedFilter.endDate = filterFromForm.endDate;
      editedFilter.year3 = filterFromForm.year3;
      editedFilter.year4 = filterFromForm.year4;
      editedFilter.year5 = filterFromForm.year5;
      editedFilter.minors = filterFromForm.minors;
      editedFilter.location = filterFromForm.location;
      editedFilter.moreThan = filterFromForm.moreThan;
      editedFilter.daysAbroad = filterFromForm.daysAbroad;
      editedFilter.favorite = filterFromForm.favorite;

      this.filters$.next(this.filterList);

      this.filterToEdit = null;
      this.filterToEdit$.next(this.filterToEdit);

      this.updateFiltersToShow()
    });
  }

  getMinorsEnum() {
    switch (this.authenticationService.currentUserValue.major) {
      case 'MAM':
        return MAMMinors;
      case 'SI':
        return SIMinors;
    }
  }

  private buildFilter(jsonObject: Object): Filter {
    const filter: Filter = {
      id: jsonObject['id'],
      name: jsonObject['name'],
      startDate: jsonObject['startDate'],
      endDate: jsonObject['endDate'],
      year3: jsonObject['year3'],
      year4: jsonObject['year4'],
      year5: jsonObject['year5'],
      minors: jsonObject['minors'],
      statusClass: jsonObject['statusClass'],
      statusIntern: jsonObject['statusIntern'],
      statusGapYear: jsonObject['statusGapYear'],
      location: jsonObject['location'],
      moreThan: jsonObject['moreThan'],
      daysAbroad: jsonObject['daysAbroad'],
      favorite: jsonObject['favorite']
    };

    if (filter.startDate != "") {
      const now = new Date().toISOString();
      const lastConnexion = this.authenticationService.getLastConnexion().toISOString();
      filter.favorite = (filter.startDate <= now && now <= filter.endDate) || (filter.favorite && lastConnexion >= filter.endDate && now >= filter.endDate);
    }

    return filter;
  }

  private updateFiltersToShow() {
    this.filterToShowList = [];
    for (const filter of this.filterList) {
      if (filter.favorite) {
        this.filterToShowList.push(filter);
      }
    }
    this.filtersToShow$.next(this.filterToShowList);
  }

  private getFilters() {
    this.http.get<Filter[]>(this.url + ((this.authenticationService.currentUserValue !== null) ? this.authenticationService.currentUserValue.id : '-1'))
      .subscribe(filters => {
        for (const filter of filters) {
          const aFilter = this.buildFilter(filter);
          if (aFilter.favorite) {
            this.filterToShowList.push(aFilter);
          }
          this.filterList.push(aFilter);
        }
        this.filters$.next(this.filterList);
      });
  }
}
