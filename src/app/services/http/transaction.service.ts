import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient) { }

  createTransaction() {
    // this.http.post('https://dev.joinposter.com/docs/api#transactions-createtransaction');
  }
}
