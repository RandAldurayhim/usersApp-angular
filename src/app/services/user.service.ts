import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { catchError } from 'rxjs/operators';
import { of, tap, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'http://localhost:8080/user/';  // URL to web api
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa('admin:admin')
  })


  httpOptions = {
    headers: this.headers,
    mode: 'no-cors'
  };

  constructor(
    private http: HttpClient,) { 
      console.log("userService : constructor ");
    }

    getUsers(): Observable<User[]> {
      console.log("userService : getUsers ");
      return this.http.get<User[]>(this.userUrl+'all',this.httpOptions).pipe(
        catchError(this.handleError<User[]>('getUsers', []))
      );
    }

    /** GET user by id. Will 404 if id not found */
    getUser(id: number): Observable<User> {
      console.log("userService : get a User ");
      const url = `${this.userUrl}find/${id}`;
      return this.http.get<User>(url).pipe(
        tap(_ => console.log(`fetched User id=${id}`)),
        catchError(this.handleError<User>(`getUser id=${id}`))
      );
    }

    /** PUT: update the user on the server */
    updateUser(user: User): Observable<any> {
      console.log("userService : update a User ");
      return this.http.put(`${this.userUrl}update`, user, this.httpOptions).pipe(
        tap(_ => console.log(`updated user id=${user.id}`)),
        catchError(this.handleError<any>('updateUser'))
      );
    } 

    /** POST: add a new user to the server */
    addUser(user: User): Observable<User> {
      console.log("userService : add a User ");
      return this.http.post<User>(`${this.userUrl}add`, user, this.httpOptions).pipe(
        tap((newUser: User) => console.log(`added user w/ id=${newUser.id}`)),
        catchError(this.handleError<User>('addUser'))
      );
    }

    /** DELETE: delete the user from the server */
    deleteUser(id: number): Observable<User> {
      console.log("userService : delete a User ");
      const url = `${this.userUrl}delete/${id}`;
      return this.http.delete<User>(url, this.httpOptions).pipe(
        tap(_ => console.log(`deleted user id=${id}`)),
        catchError(this.handleError<User>('deleteUser'))
      );
    }
    
    private handleError<T>(operation = 'operation', result?: T) {
      console.log("userService : handleError ");
      return (error: any): Observable<T> => {
    
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
    
        // TODO: better job of transforming error for user consumption
        // this.log(`${operation} failed: ${error.message}`);
    
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };

    }

  }
