import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { MatDialog, MatTableDataSource, MatTable, MatPaginator, MatDialogConfig, MatSort } from '@angular/material';
import { NotificationsService } from '../shared/notifications.service';
import { JobOfferDialogService } from '../shared/job-offer-dialog.service';
import { JobOfferDialogComponent } from './job-offer-dialog/job-offer-dialog.component';
import { JobOfferDto } from '../model/jobOfferDto';
import { JobOfferDeleteDialogComponent } from './job-offer-delete-dialog/job-offer-delete-dialog.component';
import { JobDto } from '../model/jobDto';

@Component({
  selector: 'app-job-offers',
  templateUrl: './job-offers.component.html',
  styleUrls: ['./job-offers.component.css']
})
export class JobOffersComponent implements OnInit {
  jobOffers: JobOfferDto[] = [];
  displayedColumns: string[] = ['jobOfferId', 'fromDate', 'toDate', 'tips', 'hourlyWage', 'job.title', 'employer.name',
  'employer.city.name', 'employer.city.state.name', 'actions'];
  dataSource: MatTableDataSource<any>;
  constructor(private api: ApiService, private dialog: MatDialog, private service: JobOfferDialogService,
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
    this.dataSource.filterPredicate = (dto: JobOfferDto, filter: string) => {
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
    this.api.getAllJobOffers().subscribe(
      res => {
        this.jobOffers = res;
        console.log(this.jobOffers );
        this.dataSource.data = this.jobOffers;
        this.changeDetectorRefs.detectChanges();
      },
      err => {
        alert('ERROR HAS OCCURED');
      }

    );

  }
  logData(row) {
    console.log(row);
    console.log(this.jobOffers );
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
    this.dialog.open(JobOfferDialogComponent, dialogConfig).afterClosed().subscribe(res => {
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
    this.dialog.open(JobOfferDialogComponent, dialogConfig).afterClosed().subscribe(res => {
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
    this.dialog.open(JobOfferDialogComponent, dialogConfig);
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

