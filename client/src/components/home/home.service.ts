import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';

@Injectable()
export class HomeService {
  constructor(private http: HttpClient) {
  }
  uploadCSVFile(formData:FormData) {
    let url = `${environment.apiUrl}/post-csv-file`;
    return this.http.post(url,formData);
  }
}