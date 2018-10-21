import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AboutService } from '../../services/about-service.service';
import { ICompanyNameOrLogo } from '../../models/ICompanyNameOrLogo';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoriesService } from 'src/app/services/local/categories.service';
import { NotificationService } from 'src/app/services/http/notificationService';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit {
  companyName: Observable<ICompanyNameOrLogo>;

  isButtonVisible = false;

  constructor(private aboutService: AboutService,
    private categotiesService: CategoriesService,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.companyName = this.aboutService.getCompanyName().pipe(
      map((x: any) => x.response as ICompanyNameOrLogo)
    );

    this.categotiesService.buttonIsVisible.subscribe(visibility => {
      this.isButtonVisible = visibility;
    });
  }

  backClick() {
    this.categotiesService.clickEvent.emit();
  }

  notify() {
    this.notificationService.notify().subscribe();
  }
}
