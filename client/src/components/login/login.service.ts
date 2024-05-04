import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) {
  }
  doLogin(postObj: any) {
    let url = `${environment.apiUrl}/login`;
    return this.http.post(url, postObj);
  }
}