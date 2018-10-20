import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AboutService } from '../../services/about-service.service';
import { ICompanyNameOrLogo } from '../../models/ICompanyNameOrLogo'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit {

  companyName : Observable<ICompanyNameOrLogo>;

  constructor(private aboutService: AboutService) { }

  ngOnInit() {
    this.companyName = this.aboutService.getCompanyName().pipe(
      map((x: any) => x.response as ICompanyNameOrLogo)
    );
  }

}
