import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompilerService {

  constructor(
    private http: HttpClient
  ) { }

  download(id: string) {
    window.open(`${environment.apiUrl}/compiler/${id}`, '_blank');
  }

  compile(id: string) {
    return this.http.patch(`${environment.apiUrl}/compiler/${id}`, {});
  }
}
