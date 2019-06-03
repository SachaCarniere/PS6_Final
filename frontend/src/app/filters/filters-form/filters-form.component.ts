import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {FilterService} from '../../../services/filter.service';
import {Filter} from '../../../models/filter';
import {Countries} from '../../../models/student';

@Component({
  selector: 'app-filters-form',
  templateUrl: './filters-form.component.html',
  styleUrls: ['./filters-form.component.scss']
})
export class FiltersFormComponent implements OnInit {

  name: string;
  startDate: Date;
  endDate: Date;
  year3: boolean;
  year4: boolean;
  year5: boolean;
  selectedMinors: string[] = [];
  statusClass: boolean;
  statusIntern: boolean;
  statusGapYear: boolean;
  location: string;
  moreThan: boolean;
  daysAbroad: number;

  editing: boolean;

  countryArray: Array<{ value: string, viewValue: string }>;

  private minorEnum: Array<{ key: string, value: string }> = [];
  private defaultMinors: string[];

  constructor(private formBuilder: FormBuilder, private filterService: FilterService) {
    this.buildCountryArray();
    this.buildArrayTypedEnum(this.filterService.getMinorsEnum());
    this.buildDefaultMinorsArray();

    this.filterService.filterToEdit$.subscribe(filter => {
      if (filter != null) {
        this.editing = true;
        this.name = filter.name;
        this.startDate = new Date(filter.startDate);
        this.endDate = new Date(filter.endDate);
        this.year3 = filter.year3;
        this.year4 = filter.year4;
        this.year5 = filter.year5;
        this.selectedMinors = filter.minors;
        this.statusClass = filter.statusClass;
        this.statusIntern = filter.statusIntern;
        this.statusGapYear = filter.statusGapYear;
        this.location = filter.location;
        this.moreThan = filter.moreThan;
        this.daysAbroad = filter.daysAbroad;
      } else {
        this.editing = false;
        this.name = '';
        this.startDate = null;
        this.endDate = null;
        this.year3 = true;
        this.year4 = true;
        this.year5 = true;
        this.selectedMinors = this.defaultMinors;
        this.statusClass = true;
        this.statusIntern = true;
        this.statusGapYear = true;
        this.location = '';
        this.moreThan = true;
        this.daysAbroad = 0;
      }
    });
  }

  ngOnInit() {
  }

  onCreate() {
    this.filterService.postFilter( this.getFilterFromForm());
    this.filterService.selectFilterToEdit(null);
  }

  onBack() {
    this.filterService.selectFilterToEdit(null);
  }

  onEdit() {
    this.filterService.editFilter(this.getFilterFromForm());
  }

  private getFilterFromForm() {
    const formFilter: Filter = {
      name: this.name,
      startDate: this.startDate.toISOString(),
      endDate: this.endDate.toISOString(),
      year3: this.year3,
      year4: this.year4,
      year5: this.year5,
      minors: this.selectedMinors,
      statusClass: this.statusClass,
      statusIntern: this.statusIntern,
      statusGapYear: this.statusGapYear,
      location: this.location,
      moreThan: this.moreThan,
      daysAbroad: this.daysAbroad
    };

    if (formFilter.startDate !== '') {
      const now: string = new Date().toISOString();
      formFilter.favorite = formFilter.startDate <= now && now <= formFilter.endDate;
    }

    return formFilter;
  }

  private buildCountryArray() {
    this.countryArray = [];
    for (const item in Countries) {
      this.countryArray.push({value: item.toString(), viewValue: Countries[item]});
    }
  }

  private buildArrayTypedEnum(minorEnum) {
    for (const minor in minorEnum) {
      if (minor !== 'NONE') {
        this.minorEnum.push({
          key: minor,
          value: minorEnum[minor]
        });
      }
    }
  }

  private buildDefaultMinorsArray() {
    this.defaultMinors = [];
    this.minorEnum.forEach(minor => this.defaultMinors.push(minor.key));
  }
}
