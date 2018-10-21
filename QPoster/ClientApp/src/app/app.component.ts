import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'QPosterSite';

  authorized = false;

  constructor(private cookie: CookieService) {}

  ngOnInit() {
    const account = this.cookie.get('account');
    const token = this.cookie.get('token');
    const transaction = this.cookie.get('transaction');

    if (account && token && transaction) {
      this.authorized = true;
    }
  }

}
