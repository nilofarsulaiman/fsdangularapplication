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
export class ProjectService {
    projects: string[] = [];
    private server: string = `http://localhost:8080`;
    constructor(private http: Http) {};
    
    getProjects(): Promise<any> {
        return this.http.get(`${this.server}/projects`)
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(err => err);
    }
    getProject(index: number): Promise<any> {
        return this.http.get(`${this.server}/projects/${index}`)
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(err => err);
    }

    filterProject(index: string): Promise<any> {
        return this.http.get(`${this.server}/project/${index}`)
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(err => err);
    }


    filterCompletedTask(): Promise<any> {
        return this.http.get(`${this.server}/project`)
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(err => err);
    }




    createProject(requestObj): Promise<any> {
        return this.http.post(`${this.server}/projects`, requestObj)
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(err => err);
    }
    removeProject(index: number): Promise<any> {
        return this.http.delete(`${this.server}/projects/${index}`)
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(err => err);
    }
    updateProject(requestObj): Promise<any> {
         return this.http.put(`${this.server}/projects`, requestObj)
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(err => err);
    }

}
