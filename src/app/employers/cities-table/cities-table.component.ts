import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CityDto } from 'src/app/model/cityDto';
import { MatTableDataSource, MatDialog, MatPaginator, MatTable } from '@angular/material';
import { ApiService } from 'src/app/shared/api.service';
import { EmployerDialogService } from 'src/app/shared/employer-dialog.service';

@Component({
  selector: 'app-cities-table',
  templateUrl: './cities-table.component.html',
  styleUrls: ['./cities-table.component.css']
})
export class CitiesTableComponent implements OnInit {

  cities: CityDto[] = [];
  displayedColumns: string[] = ['cityId', 'name', 'state', 'actions'];
  dataSource: MatTableDataSource<any>;
  constructor(private api: ApiService, private dialog: MatDialog,
              private changeDetectorRefs: ChangeDetectorRef, private service: EmployerDialogService) {
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.getAll();
    this.dataSource.filterPredicate = (dto: CityDto, filter: string) => {
      const transformedFilter = filter.trim().toLowerCase();
      const listAsFlatString = (obj): string => {
        let returnVal = '';
        Object.values(obj).forEach((val) => {
          if (typeof val !== 'object') {
            returnVal = returnVal + ' ' + val;
          } else if (val !== null) {
            returnVal = returnVal + ' ' + listAsFlatString(val);
          }
        });

        return returnVal.trim().toLowerCase();
      };

      return listAsFlatString(dto).includes(transformedFilter);
    };
  }
  getAll() {
    this.api.getAllCities().subscribe(
      res => {
        this.cities = res;
        console.log(this.cities);
        this.dataSource.data = this.cities;
        this.changeDetectorRefs.detectChanges();
      },
      err => {
        alert('ERROR HAS OCCURED');
      }

    );

  }
  logData(row) {
    console.log(row);
    console.log(this.cities);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  select(row) {
    this.service.subject.next(row);
  }
}
