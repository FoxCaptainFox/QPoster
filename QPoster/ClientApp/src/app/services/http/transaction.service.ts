import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IGetTansactionModel } from 'src/app/models/getTransactionModel';
import { CookieService } from 'ngx-cookie-service';
import { IProductDataModel } from 'src/app/models/IProductDataModel';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {

  constructor(private http: HttpClient,
    private cookie: CookieService) { }

  createTransaction(data: IGetTansactionModel) {
    return this.http.post(`api/Transaction/AddTransaction`, data, { responseType: 'text' });
  }

  addTransaction(products: IProductDataModel[]) {
    return this.http.post(`api/Transaction/AddProducts`, products);
  }

  getTransaction() {
    return this.http.get(`api/Transaction/GetProducts/${JSON.parse(this.cookie.get('transaction')).transaction_id}`);
  }
}
