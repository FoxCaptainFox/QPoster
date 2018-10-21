import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IGetTansactionModel } from 'src/app/models/getTransactionModel';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient) { }

  createTransaction(data: IGetTansactionModel) {
    return this.http.post(`http://taktashev-001-site1.dtempurl.com/api/Transaction/AddTransaction`, data);
  }
}
