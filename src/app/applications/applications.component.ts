import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatPaginator, MatTable, MatDialogConfig, MatSort } from '@angular/material';
import { ApiService } from '../shared/api.service';
import { NotificationsService } from '../shared/notifications.service';
import { ApplicationDto } from '../model/applicationDto';
import { ApplicationDialogComponent } from './application-dialog/application-dialog.component';
import { ApplicationDeleteDialogComponent } from './application-delete-dialog/application-delete-dialog.component';
import { ApplicationDialogService } from '../shared/application-dialog.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {
  applications: ApplicationDto[] = [];
  displayedColumns: string[] = ['applicationId', 'date', 'client.firstName', 'client.lastName',
  'jobOffer.employer.name', 'jobOffer.employer.city.name', 'jobOffer.employer.city.state.name',
  'jobOffer.job.title', 'actions'];
  dataSource: MatTableDataSource<any>;
  constructor(private api: ApiService, private dialog: MatDialog, private service: ApplicationDialogService,
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
    this.dataSource.filterPredicate = (dto: ApplicationDto, filter: string) => {
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
    this.api.getAllApplications().subscribe(
      res => {
        this.applications = res;
        console.log(this.applications );
        this.dataSource.data = this.applications;
        this.changeDetectorRefs.detectChanges();
      },
      err => {
        alert('ERROR HAS OCCURED');
      }

    );

  }
  logData(row) {
    console.log(row);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(row) {
    const index = this.applications.indexOf(row);
    this.openConfigDialog('Are you sure you want to delete this record?').afterClosed().
      subscribe(res => {
        if (res) {
          this.api.deleteApplication(row.applicationId).subscribe(() => {
            this.applications.splice(index, 1);
            this.dataSource.data = this.applications;
            this.changeDetectorRefs.detectChanges();
            this.notif.succes('Successfully deleted');
          }, err => {
            this.notif.warn('Unuccessfully deleted');
          });

        }
      })
      ;
  }
  view(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.height = '80%';
    this.service.view(row);
    this.dialog.open(ApplicationDialogComponent, dialogConfig);
  }
  openConfigDialog(msg) {
    return this.dialog.open(ApplicationDeleteDialogComponent, {
      width: '390px',
      panelClass: 'confirm-dialog-container',
      position: { top: '20px' },
      disableClose: true
    });
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

