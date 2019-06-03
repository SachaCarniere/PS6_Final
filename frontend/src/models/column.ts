export interface Column {
  id?: number;
  name?: string;
  startDate?: string;
  endDate?: string;
  checkId?: boolean;
  firstName?: boolean;
  lastName?: boolean;
  email?: boolean;
  year?: boolean;
  daysAbroad?: boolean;
  minor?: boolean;
  status?: boolean;
  location?: boolean;
  columnsToShow?: Array<string>;
  favorite?: boolean;
}
