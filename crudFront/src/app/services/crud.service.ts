import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get('http://localhost:5000/users').pipe(
      map((res) => res),
      catchError(this.handelError)
    )
  }

  addUser(user) {
    return this.http.post('http://localhost:5000/user/create', user).pipe(
      map((res) => res),
      catchError(this.handelError)
    );
  }

  editUser(user, id) {
    return this.http.patch('http://localhost:5000/user/'+ id, user).pipe(
      map((res) => res))
    catchError(this.handelError)
  }

  deleteUser(id) {
    return this.http.delete('http://localhost:5000/user/'+ id).pipe(
      map((res) => res),
      catchError(this.handelError)
    );
  }

  handelError(error: HttpErrorResponse){
    let errorMessage =""
    if(error.error instanceof ErrorEvent){
      errorMessage = error.error.message;
    }else{
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(()=> errorMessage)
  }
}
