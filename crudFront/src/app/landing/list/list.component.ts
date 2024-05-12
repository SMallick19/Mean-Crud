import { CrudService } from 'src/app/services/crud.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppUpdateComponent } from '../app-update/app-update.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit', 'action'];
  dataSource: MatTableDataSource<[]>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private dialog: MatDialog,
    private crudService: CrudService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUserData()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddEditPopup(data) {
    const dialogRef = this.dialog.open(AppUpdateComponent, {
      data: data,
      width: "40%"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getUserData();
      }
    });
  }

  getUserData() {
    if (window.navigator.onLine) {
      this.crudService.getUsers().subscribe({
        next: (res: any) => {
          if (res.status === 200 && res.success) {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this._snackBar.open("data deleted successfully", 'Splash', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,

            });
          }
        },
        error: (error) => {
          this._snackBar.open("Something went wrong", 'Splash', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,

          });
        },
        complete: () => {

        }
      })

    } else {
      this._snackBar.open("Please check your internet connection", 'Splash', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,

      })
    }
  }

  deleteUser(id) {
    if (window.navigator.onLine) {
      this.crudService.deleteUser(id).subscribe({
        next: (res: any) => {
          if (res.status === 200 && res.success) {
            this.getUserData()
          }
        },
        error: (error) => {
          this._snackBar.open("Something went wrong", 'Splash', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,

          });
        },
        complete: () => {

        }
      })

    } else {
      this._snackBar.open("Please check your internet connection", 'Splash', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,

      })
    }
  }
}

