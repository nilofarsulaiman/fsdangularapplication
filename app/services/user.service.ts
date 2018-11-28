import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
//import { HttpClient, HttpParams } from '@angular/common/http';
const httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin':'*'
    })
  };
 
@Injectable()
export class UserService {
    users: string[] = [];
    private server: string = `http://localhost:8080`;
    constructor(private http: Http) {};
    
    getUsers(): Promise<any> {
        return this.http.get(`${this.server}/user`)
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(err => err);
    }
    getUser(index: number): Promise<any> {
        return this.http.get(`${this.server}/user/${index}`)
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(err => err);
    }
    filterManager(index: string): Promise<any> {
        return this.http.get(`${this.server}/userName/${index}`)
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(err => err);
    }
    createUser(requestObj): Promise<any> {
        return this.http.post(`${this.server}/user`, requestObj)
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(err => err);
    }
    removeUser(index: number): Promise<any> {
        return this.http.delete(`${this.server}/user/${index}`)
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(err => err);
    }
    updateUser(requestObj): Promise<any> {
         return this.http.put(`${this.server}/user`, requestObj)
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(err => err);
    }

    updateUserProject(requestObj): Promise<any> {
        return this.http.put(`${this.server}/user/project`, requestObj)
           .toPromise()
           .then(response => {
               return response.json();
           })
           .catch(err => err);
   }

}
