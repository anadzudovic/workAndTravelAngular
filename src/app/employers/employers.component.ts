import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable, MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';

import { ApiService } from '../shared/api.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { EmployerDialogComponent} from './employer-dialog/employer-dialog.component';
import { EmployerDeleteDialogComponent } from './employer-delete-dialog/employer-delete-dialog.component';
import { NotificationsService } from '../shared/notifications.service';
import { EmployerDto } from '../model/employerDto';
import { EmployerDialogService } from '../shared/employer-dialog.service';


@Component({
  selector: 'app-employers',
  templateUrl: './employers.component.html',
  styleUrls: ['./employers.component.css']
})
export class EmployersComponent implements OnInit {
  employers: EmployerDto[] = [];
  displayedColumns: string[] = ['employerId', 'name', 'owner', 'phoneNumber', 'email', 'city.name',
  'city.state.name', 'actions'];
  dataSource: MatTableDataSource<any>;
  constructor(private api: ApiService, private dialog: MatDialog, private service: EmployerDialogService,
              private changeDetectorRefs: ChangeDetectorRef, private notif: NotificationsService) {
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = this.sortingDataAccessor;
    this.dataSource.sort = this.sort;
    this.getAll();
    this.dataSource.filterPredicate = (dto: EmployerDto, filter: string) => {
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
    this.api.getAllEmployers().subscribe(
      res => {
        this.employers = res;
        console.log(this.employers);
        this.dataSource.data = this.employers;
        this.changeDetectorRefs.detectChanges();
      },
      err => {
        alert('ERROR HAS OCCURED');
      }

    );

  }
  logData(row) {
    console.log(row);
    console.log(this.employers);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  create() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.service.create();
    this.dialog.open(EmployerDialogComponent, dialogConfig).afterClosed().subscribe(res => {
      this.sleep(3000).then(() => {
        location.reload();
      });
    }
    );
  }
  edit(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.service.update(row);
    this.dialog.open(EmployerDialogComponent, dialogConfig).afterClosed().subscribe(res => {
      this.sleep(3000).then(() => {
        location.reload();
      });
    }
    );
  }
 
  view(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.service.view(row);
    this.dialog.open(EmployerDialogComponent, dialogConfig);
  }

  sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }
  sortingDataAccessor(item, property) {
    if (property.includes('.')) {
      return property.split('.')
      .reduce((object, key) => object[key] || '', item);
    }
    return item[property];
  }

}

