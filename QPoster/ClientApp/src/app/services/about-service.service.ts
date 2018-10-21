import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor(
    private http: HttpClient,
    private cookie: CookieService) { }

  getCompanyName() {

    const companyName: string = this.cookie.get('account');
    const token: string = this.cookie.get('token');

    return this.http.get(`https://${companyName}.joinposter.com/api/settings.getCompanyName?token=${token}`);
  }

  getCompanyLogo() {

    const companyName: string = this.cookie.get('account');
    const token: string = this.cookie.get('token');

    return this.http.get(`https://${companyName}.joinposter.com/api/settings.getAllSettings?token=${token}`);
  }
}
