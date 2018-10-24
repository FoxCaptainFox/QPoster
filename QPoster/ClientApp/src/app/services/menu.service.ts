import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private http: HttpClient,
    private cookie: CookieService
  ) { }

  getCategories() {

    const companyName: string = this.cookie.get('account');
    const token: string = this.cookie.get('token');

    const request = `https://${companyName}.joinposter.com/api/menu.getCategories?token=${token}`;

    let params = new HttpParams();
    params = params.append('siteAdress', request);

    return this.http.get(`api/Transaction/getRequest`, {params: params});
  }

  getProducts(categoryId) {

    const companyName: string = this.cookie.get('account');
    const token: string = this.cookie.get('token');

    const request = `https://${companyName}.joinposter.com/api/menu.getProducts?token=${token}&category_id=${categoryId}`;

    let params = new HttpParams();
    params = params.append('siteAdress', request);

    return this.http.get(`api/Transaction/getRequest`, {params: params});
  }
}
