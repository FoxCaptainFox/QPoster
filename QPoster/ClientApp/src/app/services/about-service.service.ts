import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

    const request = `https://${companyName}.joinposter.com/api/settings.getCompanyName?token=${token}`;

    let params = new HttpParams();
    params = params.append('siteAdress', request);

    return this.http.get(`api/Transaction/getRequest`, {params: params});
  }

  getCompanyLogo() {

    const companyName: string = this.cookie.get('account');
    const token: string = this.cookie.get('token');

    const request = `https://${companyName}.joinposter.com/api/settings.getAllSettings?token=${token}`;

    let params = new HttpParams();
    params = params.append('siteAdress', request);

    return this.http.get(`api/Transaction/getRequest`, {params: params});
  }
}
