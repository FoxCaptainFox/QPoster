import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  private url: string = "https://posterhack.joinposter.com/api/settings."

  constructor(private http: HttpClient) { }

  getCompanyName() {
    return this.http.get(this.url + "getCompanyName?token=0014391df7bd6edecce3ec8f44f1ef54");
  }

  getCompanyLogo() {
    return this.http.get(this.url + "getAllSettings?token=0014391df7bd6edecce3ec8f44f1ef54");
  }
}
