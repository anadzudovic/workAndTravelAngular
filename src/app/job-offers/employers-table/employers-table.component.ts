import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { EmployerDto } from 'src/app/model/employerDto';
import { MatTableDataSource, MatDialog, MatPaginator, MatTable } from '@angular/material';
import { ApiService } from 'src/app/shared/api.service';
import { JobOfferDialogService } from 'src/app/shared/job-offer-dialog.service';

@Component({
  selector: 'app-employers-table',
  templateUrl: './employers-table.component.html',
  styleUrls: ['./employers-table.component.css']
})
export class EmployersTableComponent implements OnInit {

  employers: EmployerDto[] = [];
  displayedColumns: string[] = ['employerId', 'name', 'email', 'city', 'state', 'actions'];
  dataSource: MatTableDataSource<any>;
  constructor(private api: ApiService, private dialog: MatDialog,
              private changeDetectorRefs: ChangeDetectorRef, private service: JobOfferDialogService) {
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
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
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  select(row) {
    this.service.selectEmployer.next(row);
  }
}
