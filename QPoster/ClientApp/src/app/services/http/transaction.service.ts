import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IGetTansactionModel } from 'src/app/models/getTransactionModel';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient) { }

  createTransaction(data: IGetTansactionModel) {
    return this.http.post(`http://192.168.5.141:58349/api/Transaction/AddTransaction`, data);
  }
}
