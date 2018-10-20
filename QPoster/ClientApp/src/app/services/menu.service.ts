import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private url: string = "https://posterhack.joinposter.com/api/menu."

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get(this.url + "getCategories?token=0014391df7bd6edecce3ec8f44f1ef54");
  }

  getProducts(categotyId?){
    const params = new HttpParams();
    if(categotyId){
      params.append('category_id', categotyId);
    }
    return this.http.get(this.url + `getProducts?token=0014391df7bd6edecce3ec8f44f1ef54&category_id=${categotyId}`, {params: params});
  }
}
