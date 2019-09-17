import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { JobDto } from 'src/app/model/jobDto';
import { MatTableDataSource, MatDialog, MatPaginator, MatTable } from '@angular/material';
import { ApiService } from 'src/app/shared/api.service';
import { JobOfferDialogService } from 'src/app/shared/job-offer-dialog.service';

@Component({
  selector: 'app-jobs-table',
  templateUrl: './jobs-table.component.html',
  styleUrls: ['./jobs-table.component.css']
})
export class JobsTableComponent implements OnInit {
  jobs: JobDto[] = [];
  displayedColumns: string[] = ['jobId', 'title', 'description', 'actions'];
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
  }
  getAll() {
    this.api.getAllJobs().subscribe(
      res => {
        this.jobs = res;
        console.log(this.jobs);
        this.dataSource.data = this.jobs;
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
    this.service.selectJob.next(row);
  }
}
