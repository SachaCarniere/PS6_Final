
export interface Filter {
  id?: number;
  name?: string;
  startDate?: string,
  endDate?: string,
  year3?: boolean;
  year4?: boolean;
  year5?: boolean;
  statusClass?: boolean;
  statusIntern?: boolean;
  statusGapYear?: boolean;
  minors?: Array<string>;
  location?: string;
  moreThan: boolean;
  daysAbroad?: number;
  favorite?: boolean;
}
