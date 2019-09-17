import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatDialog, MatPaginator, MatTable, MatSort, MatDialogConfig } from '@angular/material';
import { ApplicationDto } from '../model/applicationDto';
import { ApiService } from '../shared/api.service';
import { ApplicationDeleteDialogComponent } from '../applications/application-delete-dialog/application-delete-dialog.component';
import { NotificationsService } from '../shared/notifications.service';
import { ApplicationClientDialogComponent } from './application-client-dialog/application-client-dialog.component';
import { ApplicationDialogClientService } from '../shared/application-dialog-client-service.service';

@Component({
  selector: 'app-applications-client',
  templateUrl: './applications-client.component.html',
  styleUrls: ['./applications-client.component.css']
})
export class ApplicationsClientComponent implements OnInit {
  applications: ApplicationDto[] = [];
  displayedColumns: string[] = [ 'date',
  'jobOffer.employer.name', 'jobOffer.employer.city.name', 'jobOffer.employer.city.state.name',
  'jobOffer.job.title', 'jobOffer.fromDate', 'jobOffer.toDate', 'actions'];
  dataSource: MatTableDataSource<any>;
  constructor(private api: ApiService, private dialog: MatDialog,
              private notif: NotificationsService, private changeDetectorRefs: ChangeDetectorRef,
              private service: ApplicationDialogClientService  ) {
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
        const userProfile = JSON.parse(localStorage.getItem('userProfile'));
        const clientId = userProfile.person.personId;
        res.forEach(element => {
          if (element.client.personId === clientId) {
            this.applications.push(element);
          }
        });

        this.dataSource.data = this.applications;
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

  view(row) {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = '60%';
  dialogConfig.height = '80%';
  this.service.view(row);
  this.dialog.open(ApplicationClientDialogComponent, dialogConfig);
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
  openConfigDialog(msg) {
    return this.dialog.open(ApplicationDeleteDialogComponent, {
      width: '390px',
      panelClass: 'confirm-dialog-container',
      position: { top: '20px' },
      disableClose: true
    });
  }
  sortingDataAccessor(item, property) {
    if (property.includes('.')) {
      return property.split('.')
      .reduce((object, key) => object[key] || '', item);
    }
    return item[property];
  }

}

