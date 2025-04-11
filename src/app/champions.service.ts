import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChampionsService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getLatestPatch(): Observable<any> {
    return this.http.get(`${this.baseUrl}/patches/latest`);
  }

  getChampions(patch: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/champions/all/${patch}`);
  }

  getChampionDetails(id: string, patch: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/champions/${id}/${patch}`);
  }
}
