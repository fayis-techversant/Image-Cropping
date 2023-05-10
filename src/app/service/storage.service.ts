import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cropperArray } from '../types/cropper';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  serviceURL: string;

  constructor(private http: HttpClient) {
    this.serviceURL = 'http://localhost:3000/crops';
  }

  getItem(): Observable<cropperArray[]> {
    return this.http.get<cropperArray[]>(this.serviceURL);
  }
  addItem(crop: cropperArray): Observable<cropperArray> {
    crop.id = new Date().getTime();
    return this.http.post<cropperArray>(this.serviceURL, crop);
  }
  deleteAllItem(): Observable<any> {
    return this.http.delete(this.serviceURL)
  }
}
