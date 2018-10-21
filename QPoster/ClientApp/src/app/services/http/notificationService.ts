import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IGetTansactionModel } from 'src/app/models/getTransactionModel';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private http: HttpClient, private cookie: CookieService) { }

  notify() {
    const transaction = JSON.parse(this.cookie.get('transaction')).transaction_id;
    return this.http.get(`http://taktashev-001-site1.dtempurl.com/api/Transaction/CallWaiter?transactionId=${transaction}`);
  }
}
