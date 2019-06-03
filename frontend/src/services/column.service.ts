import {Column} from '../models/column';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthenticationService} from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class ColumnService {
  public displayedColumns = ['id', 'firstName', 'lastName', 'emailAddress', 'minorFullName', 'year', 'statusFullName', 'locationFullName', 'daysAbroad'];
  private url = 'http://localhost:9428/api/columns/';

  private columnToEdit: Column;
  public columnToEdit$: BehaviorSubject<Column> = new BehaviorSubject(this.columnToEdit);

  private defaultColumn: string[] = ['id', 'firstName', 'lastName', 'emailAddress', 'minorFullName', 'year', 'statusFullName', 'locationFullName', 'daysAbroad'];
  public columnsToShow$: BehaviorSubject<string[]> = new BehaviorSubject(this.defaultColumn);

  private favoriteColumnList: Column[] = [];
  public favoriteColumns$: BehaviorSubject<Column[]> = new BehaviorSubject(this.favoriteColumnList);

  private personalColumnsList: Column[] = [];
  public personalColumns$: BehaviorSubject<Column[]> = new BehaviorSubject(this.personalColumnsList);

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    this.getColumns();
  }

  createNewCol(column: Column) {
    this.http.post(this.url, {
      userId: ((this.authenticationService.currentUserValue !== null) ? this.authenticationService.currentUserValue.id : '-1'),
      name: column.name,
      startDate: column.startDate,
      endDate: column.endDate,
      checkId: column.checkId,
      firstName: column.firstName,
      lastName: column.lastName,
      email: column.email,
      year: column.year,
      daysAbroad: column.daysAbroad,
      minor: column.minor,
      status: column.status,
      location: column.location,
      columnsToShow: column.columnsToShow,
      favorite: column.favorite
    }).subscribe(column => {
        const newColumn = this.buildColumn(column);

        this.personalColumnsList.push(newColumn);
        this.personalColumns$.next(this.personalColumnsList);

        if (newColumn.favorite) {
          this.favoriteColumnList.push(newColumn);
          this.favoriteColumns$.next(this.favoriteColumnList);
        }
      }
    );
  }

  deleteColumn(column: Column) {
    this.http.delete(this.url + column.id).subscribe(() => {
      this.personalColumnsList.splice(this.personalColumnsList.indexOf(column), 1);
      this.personalColumns$.next(this.personalColumnsList);

      if (column.favorite) {
        this.favoriteColumnList.splice(this.favoriteColumnList.indexOf(column), 1);
        this.favoriteColumns$.next(this.favoriteColumnList);
      }
      if (column.id == this.columnToEdit.id) {
        this.columnToEdit = null;
        this.columnToEdit$.next(this.columnToEdit);
      }
    });
  }

  swapFavorite(column: Column) {
    this.http.put(this.url + column.id, {
      favorite: !column.favorite
    }).subscribe(() => {
      this.personalColumnsList[this.personalColumnsList.indexOf(column)].favorite = !column.favorite;
      this.personalColumns$.next(this.personalColumnsList);
      this.updateColumnFavorites();
    });
  }

  selectToEdit(column: Column) {
    this.columnToEdit = column;
    this.columnToEdit$.next(this.columnToEdit);
  }

  editColumn(columnFromForm: Column) {
    this.http.put(this.url + this.columnToEdit.id, {
      name: columnFromForm.name,
      startDate: columnFromForm.startDate,
      endDate: columnFromForm.endDate,
      checkId: columnFromForm.checkId,
      firstName: columnFromForm.firstName,
      lastName: columnFromForm.lastName,
      email: columnFromForm.email,
      year: columnFromForm.year,
      daysAbroad: columnFromForm.daysAbroad,
      minor: columnFromForm.minor,
      status: columnFromForm.status,
      location: columnFromForm.location,
      columnsToShow: columnFromForm.columnsToShow
    }).subscribe(() => {
        const editedColumn = this.personalColumnsList[this.personalColumnsList.indexOf(this.columnToEdit)];
        editedColumn.name = columnFromForm.name;
        editedColumn.startDate = columnFromForm.startDate;
        editedColumn.endDate = columnFromForm.endDate;
        editedColumn.checkId = columnFromForm.checkId;
        editedColumn.firstName = columnFromForm.firstName;
        editedColumn.lastName = columnFromForm.lastName;
        editedColumn.email = columnFromForm.email;
        editedColumn.year = columnFromForm.email;
        editedColumn.daysAbroad = columnFromForm.daysAbroad;
        editedColumn.minor = columnFromForm.minor;
        editedColumn.status = columnFromForm.status;
        editedColumn.location = columnFromForm.location;
        editedColumn.columnsToShow = columnFromForm.columnsToShow;
        editedColumn.favorite = columnFromForm.favorite;

        this.personalColumns$.next(this.personalColumnsList);

        this.columnToEdit = null;
        this.columnToEdit$.next(this.columnToEdit);

        this.updateColumnFavorites()
      }
    );
  }

  showColumns(columnsToShow: string[]) {
    this.columnsToShow$.next(columnsToShow);
  }

  showDefaultColumns() {
    this.columnsToShow$.next(this.defaultColumn);
  }

  private updateColumnFavorites() {
    this.favoriteColumnList = [];
    for (const column of this.personalColumnsList) {
      if (column.favorite) {
        this.favoriteColumnList.push(column);
      }
    }
    this.favoriteColumns$.next(this.favoriteColumnList);
  }

  private buildColumn(jsonObject: Object): Column {
    const column: Column = {
      id: jsonObject['id'],
      name: jsonObject['name'],
      startDate: jsonObject['startDate'],
      endDate: jsonObject['endDate'],
      checkId: jsonObject['checkId'],
      firstName: jsonObject['firstName'],
      lastName: jsonObject['lastName'],
      email: jsonObject['email'],
      year: jsonObject['year'],
      daysAbroad: jsonObject['daysAbroad'],
      minor: jsonObject['minor'],
      status: jsonObject['status'],
      location: jsonObject['location'],
      columnsToShow: jsonObject['columnsToShow'],
      favorite: jsonObject['favorite']
    };

    if (column.startDate != "") {
      const now = new Date().toISOString();
      const lastConnexion = this.authenticationService.getLastConnexion().toISOString();
      column.favorite = (column.startDate <= now && now <= column.endDate) || (column.favorite && lastConnexion >= column.endDate && now >= column.endDate);
    }

    return column;
  }

  private getColumns() {
    this.http.get<Column[]>(this.url + ((this.authenticationService.currentUserValue !== null) ? this.authenticationService.currentUserValue.id : '-1'))
      .subscribe(columns => {
        for (const column of columns)/*let i = 0; i < columns.length; i++)*/ {
          const getColumn = this.buildColumn(column);
          if (getColumn.favorite) {
            this.favoriteColumnList.push(getColumn);
          }
          this.personalColumnsList.push(getColumn);
        }
        this.personalColumns$.next(this.personalColumnsList);
        this.favoriteColumns$.next(this.favoriteColumnList);
      });
  }
}
