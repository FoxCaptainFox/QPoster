import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IGetTansactionModel } from 'src/app/models/getTransactionModel';
import { CookieService } from 'ngx-cookie-service';
import { IProduct } from '../../models/IProduct';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {

  constructor(private http: HttpClient,
    private cookie: CookieService) { }

  createTransaction(data: IGetTansactionModel) {
    return this.http.post(`http://taktashev-001-site1.dtempurl.com/api/Transaction/AddTransaction`, data);
  }

  addTransaction(products){
    console.log(products);
    return this.http.post(`http://192.168.5.141:58349/api/Transaction/AddProducts`, products);
  }

  getTransaction(){
    return this.http.get(`http://192.168.5.141:58349/api/Transaction/GetProducts/` + JSON.parse(this.cookie.get('transaction')).transaction_id);
  }
}
