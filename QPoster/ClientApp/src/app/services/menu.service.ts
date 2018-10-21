import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

    return this.http.get(`https://${companyName}.joinposter.com/api/menu.getCategories?token=${token}`);
  }

  getProducts(categoryId) {

    const companyName: string = this.cookie.get('account');
    const token: string = this.cookie.get('token');

    return this.http.get(`https://${companyName}.joinposter.com/api/menu.getProducts?token=${token}&category_id=${categoryId}`);
  }
}
