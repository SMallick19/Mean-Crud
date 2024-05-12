import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-app-update',
  templateUrl: './app-update.component.html',
  styleUrls: ['./app-update.component.scss']
})
export class AppUpdateComponent implements OnInit {
  userForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  constructor(private crudservice: CrudService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AppUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {

  }
  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl(''),
    });

    if(this.data !== ''){
      this.binddData(this.data);
    }
  }

  binddData(data){
    this.userForm.get('name').setValue(data.name);
    this.userForm.get('email').setValue(data.email);
    this.userForm.get('phone').setValue(data.phone);
  }

  OnSubmitForm() {
    const reqBody = {
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      phone: this.userForm.value.phone,
    }
    if (this.data !== ''){
      this.editApi(reqBody);
    }else{
      this.saveApi(reqBody);
    }

  }

  saveApi(req){
    if (window.navigator.onLine) {
      this.crudservice.addUser(req).subscribe({
        next: (res: any) => {
          if (res.status === 200 && res.success) {
            this.dialogRef.close(true)
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


  editApi(req){
    if (window.navigator.onLine) {
      this.crudservice.editUser(req, this.data._id).subscribe({
        next: (res: any) => {
          if (res.status === 200 && res.success) {
            this.dialogRef.close(true)
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
