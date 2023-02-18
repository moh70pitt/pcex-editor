import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SourcesService {

  constructor(
    private httpClient: HttpClient
  ) { }

  sources() {
    return this.httpClient.get(`${environment.apiUrl}/sources`);
  }

  create() {
    return this.httpClient.post(`${environment.apiUrl}/sources`, {});
  }

  read(id: string) {
    return this.httpClient.get(`${environment.apiUrl}/sources/${id}`);
  }

  update(id: string, source: any) {
    return this.httpClient.patch(`${environment.apiUrl}/sources/${id}`, source);
  }

  remove(id: string) {
    return this.httpClient.delete(`${environment.apiUrl}/sources/${id}`);
  }
}
