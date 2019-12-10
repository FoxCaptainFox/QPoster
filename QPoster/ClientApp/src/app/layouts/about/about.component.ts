import { Component, OnInit } from '@angular/core';
import { AboutService } from '../../services/http/about-service.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  providers: [AboutService]
})
export class AboutComponent implements OnInit {
  companyLogo: string;
  hasLogo = true;

  constructor(private aboutService: AboutService) { }

  ngOnInit() {
    this.aboutService.getCompanyLogo().subscribe((x: any) => {
      if (!x.response.logo) {
        this.hasLogo = false;
      } else {
        this.companyLogo = 'https://posterhack.joinposter.com' + x.response.logo;
      }

    });
  }
}
