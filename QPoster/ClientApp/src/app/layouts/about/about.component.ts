import { Component, OnInit } from '@angular/core';
import { AboutService } from '../../services/about-service.service';
import { ICompanyNameOrLogo } from '../../models/ICompanyNameOrLogo'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  providers: [AboutService]
})
export class AboutComponent implements OnInit {

  companyLogo : ICompanyNameOrLogo = {} as any;
  hasLogo = true;

  constructor(private aboutService: AboutService) { }

  ngOnInit() {
    this.aboutService.getCompanyLogo()
    .subscribe( (x:any) => {
      if(x.response.logo == ''){
        this.hasLogo = false
      }
      this.companyLogo.value = x.response.logo
      this.companyLogo.value = "https://posterhack.joinposter.com" + this.companyLogo.value
      console.log(this.companyLogo.value)
    })
  }
}
