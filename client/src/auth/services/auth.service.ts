import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
    public userLoggedIn = false;
    constructor(private http: HttpClient) {
    }

    setLogin(authToken: any) {
        localStorage.setItem('authToken', authToken);
        this.userLoggedIn = true;
    }

    getUserLoggedIN() {
        if (this.userLoggedIn) return this.userLoggedIn;
        let authToken = localStorage.getItem('authToken');
        if (authToken) { this.userLoggedIn = true; return true };
        return false;
    }
    getAuthToken() {
        let authToken = localStorage.getItem('authToken');
        return authToken ? authToken : '';
    }



}