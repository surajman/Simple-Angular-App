import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FakeApiService {

  constructor(private http: HttpClient) { }

  public getDetails(path: string, id: number) {
    return this.http
    .get(`${path}/${id}`);
  }

  public deleteRecords(path: string, id: number) {
    return this.http.delete(`${path}/${id}`);
  }

  public updateRecords(path: string, id: number, updatedData: any) {
    return this.http.put(`${path}/${id}`, updatedData);
  }

  public createRecord(path: string, data: any) {
    return this.http.post(path, data);
  }
}
